import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import {
  MOCK_ACTIVE_PLAN,
  MOCK_CUSTOMER,
  MOCK_SPEED,
  type ConnectionStatus,
  type SubscriptionStatus,
} from '@/data/mock-customer';
import { getFromApi, getServerAvailability } from '@/utils/api-client';
import { mapSubscriptionToCustomerPlan } from '@/utils/plan-mapping';

const CUSTOMER_CACHE_KEY = 'extranet:last-live-customer-state:v1';

type CustomerDataSource = 'mock' | 'cache' | 'live';
type ServerStatus = 'unknown' | 'available' | 'unavailable';

type CachedCustomerState = {
  customer: typeof MOCK_CUSTOMER;
  plan: typeof MOCK_ACTIVE_PLAN;
  cachedAt: string;
};

type CustomerContextValue = {
  customer: typeof MOCK_CUSTOMER;
  plan: typeof MOCK_ACTIVE_PLAN;
  speed: typeof MOCK_SPEED;
  connectionStatus: ConnectionStatus;
  subscriptionStatus: SubscriptionStatus;
  notificationsEnabled: boolean;
  routerRestarting: boolean;
  speedTesting: boolean;
  isHydrating: boolean;
  isRefreshing: boolean;
  isSynced: boolean;
  serverAvailable: boolean;
  offlineMode: boolean;
  serverStatus: ServerStatus;
  syncError: string | null;
  dataSource: CustomerDataSource;
  lastSyncedAt: string | null;
  lastServerCheckAt: string | null;
  hasCachedLiveData: boolean;
  toggleNotifications: () => void;
  restartRouter: () => Promise<void>;
  runSpeedTest: () => Promise<void>;
  renewPlan: () => void;
  refreshData: () => Promise<void>;
};

const CustomerContext = createContext<CustomerContextValue | null>(null);

// Helper to parse flat server address into structured app address
function parseAddress(flatAddress: string) {
  const parts = flatAddress.split(',').map((p) => p.trim());
  
  // Extract pincode (last 6 digits of the entire string)
  const pincodeMatch = flatAddress.match(/\b\d{6}\b/);
  const pincode = pincodeMatch ? pincodeMatch[0] : '560034';

  return {
    line1: parts[0] || 'Service Location',
    line2: parts[1] || parts[2] || 'Building Line',
    area: parts[parts.length - 3] || parts[parts.length - 2] || 'Bellandur Area',
    city: parts[parts.length - 2] || 'Bengaluru',
    pincode,
  };
}

// Helper to calculate days remaining until expiry
function calculateDaysRemaining(expiryDateStr: string): number {
  try {
    const months_map: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    const parts = expiryDateStr.split(' ');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = months_map[parts[1]];
      const year = parseInt(parts[2], 10);
      
      const target = new Date(year, month, day);
      const now = new Date();
      // Reset hours to compare dates only
      target.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      
      const diffTime = target.getTime() - now.getTime();
      return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
  } catch (e) {
    console.error('Failed to parse expiry date for remaining days', e);
  }
  return 15; // default fallback
}

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState(MOCK_CUSTOMER);
  const [plan, setPlan] = useState(MOCK_ACTIVE_PLAN);
  const [speed, setSpeed] = useState(MOCK_SPEED);
  const [routerRestarting, setRouterRestarting] = useState(false);
  const [speedTesting, setSpeedTesting] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus>('unknown');
  const [syncError, setSyncError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<CustomerDataSource>('mock');
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [lastServerCheckAt, setLastServerCheckAt] = useState<string | null>(null);
  const [hasCachedLiveData, setHasCachedLiveData] = useState(false);
  const cachedStateRef = useRef<CachedCustomerState | null>(null);

  const applyCachedState = useCallback((cachedState: CachedCustomerState) => {
    cachedStateRef.current = cachedState;
    setCustomer(cachedState.customer);
    setPlan({
      ...cachedState.plan,
      daysRemaining: calculateDaysRemaining(cachedState.plan.expiryDate),
    });
    setHasCachedLiveData(true);
    setDataSource('cache');
    setLastSyncedAt(cachedState.cachedAt);
    setIsSynced(false);
  }, []);

  const loadCachedState = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(CUSTOMER_CACHE_KEY);
      if (!raw) return null;

      const cachedState = JSON.parse(raw) as CachedCustomerState;
      if (!cachedState.customer || !cachedState.plan || !cachedState.cachedAt) {
        return null;
      }

      applyCachedState(cachedState);
      return cachedState;
    } catch (e) {
      console.warn('[Customer Context] Failed to load cached live state.', e);
      return null;
    }
  }, [applyCachedState]);

  const persistLiveState = useCallback(async (
    nextCustomer: typeof MOCK_CUSTOMER,
    nextPlan: typeof MOCK_ACTIVE_PLAN,
    syncedAt: string,
  ) => {
    const cachedState: CachedCustomerState = {
      customer: nextCustomer,
      plan: nextPlan,
      cachedAt: syncedAt,
    };

    cachedStateRef.current = cachedState;
    setHasCachedLiveData(true);

    try {
      await AsyncStorage.setItem(CUSTOMER_CACHE_KEY, JSON.stringify(cachedState));
    } catch (e) {
      console.warn('[Customer Context] Failed to persist live customer state.', e);
    }
  }, []);

  const enterOfflineMode = useCallback((message: string) => {
    setServerStatus('unavailable');
    setSyncError(message);
    setIsSynced(false);

    if (cachedStateRef.current) {
      applyCachedState(cachedStateRef.current);
      console.warn(`[Customer Context] ${message}. Using cached live customer state.`);
      return;
    }

    console.warn(`[Customer Context] ${message}. No cached live state yet; keeping bootstrap mock state.`);
  }, [applyCachedState]);

  const refreshData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const availability = await getServerAvailability();
      setLastServerCheckAt(availability.checkedAt);
      setServerStatus(availability.available ? 'available' : 'unavailable');

      if (!availability.available) {
        enterOfflineMode(availability.error ?? 'Server unavailable');
        return;
      }

      // 1. Fetch customer details matching the default demo phone number: 9876543210
      const customerData = await getFromApi<any>('/customers?phone=9876543210');
      if (!customerData || !customerData.customerId) {
        enterOfflineMode('Customer lookup failed');
        return;
      }

      const cId = customerData.customerId;

      // 2. Fetch full profile and active subscription details
      const [profile, subscription] = await Promise.all([
        getFromApi<any>(`/customers/${cId}/profile`),
        getFromApi<any>(`/customers/${cId}/subscription`),
      ]);

      // 3. Perform premium mappings
      const nameParts = (profile.name || '').split(' ');
      const firstName = nameParts[0] || 'Rahul';
      const lastName = nameParts.slice(1).join(' ') || 'Sharma';
      const initials = `${firstName[0] || 'R'}${lastName[0] || 'S'}`.toUpperCase();

      const mappedCustomer = {
        firstName,
        lastName,
        phone: profile.phone,
        email: profile.email,
        accountId: profile.accountId,
        avatarInitials: initials,
        connectionStatus: (subscription.status === 'active' ? 'online' : 'offline') as ConnectionStatus,
        subscriptionStatus: subscription.status as SubscriptionStatus,
        address: parseAddress(profile.address),
        notificationsEnabled: true, // Default true
      };

      const mappedPlan = mapSubscriptionToCustomerPlan(subscription);
      mappedPlan.daysRemaining = calculateDaysRemaining(mappedPlan.expiryDate);
      const syncedAt = new Date().toISOString();

      setCustomer(mappedCustomer);
      setPlan(mappedPlan);
      setIsSynced(true);
      setServerStatus('available');
      setSyncError(null);
      setDataSource('live');
      setLastSyncedAt(syncedAt);
      await persistLiveState(mappedCustomer, mappedPlan, syncedAt);
      console.log('[Customer Context] Successfully synchronized data from CRM server.');
    } catch (e) {
      enterOfflineMode('Sync failed');
      console.warn('[Customer Context] Sync failure details:', e);
    } finally {
      setIsRefreshing(false);
    }
  }, [enterOfflineMode, persistLiveState]);

  useEffect(() => {
    let mounted = true;

    async function bootstrapCustomerState() {
      const cachedState = await loadCachedState();
      if (!mounted) return;

      if (!cachedState) {
        setDataSource('mock');
      }

      await refreshData();
      if (mounted) {
        setIsHydrating(false);
      }
    }

    bootstrapCustomerState();

    return () => {
      mounted = false;
    };
  }, [loadCachedState, refreshData]);

  const toggleNotifications = useCallback(() => {
    setCustomer((prev) => ({
      ...prev,
      notificationsEnabled: !prev.notificationsEnabled,
    }));
  }, []);

  const restartRouter = useCallback(async () => {
    setRouterRestarting(true);
    setCustomer((prev) => ({ ...prev, connectionStatus: 'offline' }));
    await new Promise((r) => setTimeout(r, 2500));
    setCustomer((prev) => ({ ...prev, connectionStatus: 'online' }));
    setRouterRestarting(false);
  }, []);

  const runSpeedTest = useCallback(async () => {
    setSpeedTesting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSpeed({
      download: Math.floor(280 + Math.random() * 40),
      upload: Math.floor(270 + Math.random() * 35),
      ping: Math.floor(6 + Math.random() * 6),
      lastTested: 'Just now',
    });
    setSpeedTesting(false);
  }, []);

  const renewPlan = useCallback(() => {
    refreshData();
  }, [refreshData]);

  const value = useMemo(
    () => ({
      customer,
      plan,
      speed,
      connectionStatus: customer.connectionStatus,
      subscriptionStatus: customer.subscriptionStatus,
      notificationsEnabled: customer.notificationsEnabled,
      routerRestarting,
      speedTesting,
      isHydrating,
      isRefreshing,
      isSynced,
      serverAvailable: serverStatus === 'available',
      offlineMode: serverStatus === 'unavailable',
      serverStatus,
      syncError,
      dataSource,
      lastSyncedAt,
      lastServerCheckAt,
      hasCachedLiveData,
      toggleNotifications,
      restartRouter,
      runSpeedTest,
      renewPlan,
      refreshData,
    }),
    [
      customer,
      plan,
      speed,
      routerRestarting,
      speedTesting,
      isHydrating,
      isRefreshing,
      isSynced,
      serverStatus,
      syncError,
      dataSource,
      lastSyncedAt,
      lastServerCheckAt,
      hasCachedLiveData,
      toggleNotifications,
      restartRouter,
      runSpeedTest,
      renewPlan,
      refreshData,
    ],
  );

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}

export function useCustomer() {
  const ctx = useContext(CustomerContext);
  if (!ctx) {
    throw new Error('useCustomer must be used within CustomerProvider');
  }
  return ctx;
}
