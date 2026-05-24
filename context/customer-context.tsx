import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  MOCK_ACTIVE_PLAN,
  MOCK_CUSTOMER,
  MOCK_SPEED,
  type ConnectionStatus,
  type SubscriptionStatus,
} from '@/data/mock-customer';
import { checkServerHealth, getFromApi } from '@/utils/api-client';

type CustomerContextValue = {
  customer: typeof MOCK_CUSTOMER;
  plan: typeof MOCK_ACTIVE_PLAN;
  speed: typeof MOCK_SPEED;
  connectionStatus: ConnectionStatus;
  subscriptionStatus: SubscriptionStatus;
  notificationsEnabled: boolean;
  routerRestarting: boolean;
  speedTesting: boolean;
  isSynced: boolean;
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

// Helper to map OTT based on plan speed
function resolveOtt(speedMbps: number) {
  if (speedMbps >= 300) {
    return [
      { id: 'netflix', label: 'Netflix', icon: 'film' },
      { id: 'prime', label: 'Prime', icon: 'play-circle' },
      { id: 'hotstar', label: 'Hotstar', icon: 'star' },
      { id: 'sonyliv', label: 'SonyLIV', icon: 'tv' },
    ];
  } else if (speedMbps >= 100) {
    return [
      { id: 'netflix', label: 'Netflix', icon: 'film' },
      { id: 'prime', label: 'Prime', icon: 'play-circle' },
      { id: 'hotstar', label: 'Hotstar', icon: 'star' },
    ];
  }
  return [{ id: 'hotstar', label: 'Hotstar', icon: 'star' }];
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
  const [isSynced, setIsSynced] = useState(false);

  const refreshData = useCallback(async () => {
    try {
      const serverActive = await checkServerHealth();
      if (!serverActive) {
        setIsSynced(false);
        return;
      }

      // 1. Fetch customer details matching the default demo phone number: 9876543210
      const customerData = await getFromApi<any>('/customers?phone=9876543210');
      if (!customerData || !customerData.customerId) {
        setIsSynced(false);
        return;
      }

      const cId = customerData.customerId;

      // 2. Fetch full profile and active subscription details
      const [profile, subscription] = await Promise.all([
        getFromApi<any>(`/customers/${cId}/profile`),
        getFromApi<any>(`/customers/${cId}/subscription`),
      ]);

      // 3. Perform premium mappings
      const nameParts = profile.name.split(' ');
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

      const speedMbps = subscription.speed.toLowerCase().includes('gbps') ? 1000 : parseInt(subscription.speed, 10) || 100;

      console.log("LIVE SUBSCRIPTION", subscription);
      const mappedPlan = {
        id: subscription.planCatalogId,
        name: subscription.planName,
        speed: subscription.speed,
        speedMbps,
        price: subscription.billingAmount,
        billingCycle: subscription.billingCycle as 'monthly' | 'quarterly' | 'annual',
        expiryDate: subscription.expiryDate,
        daysRemaining: calculateDaysRemaining(subscription.expiryDate),
        ott: resolveOtt(speedMbps),
      };

      setCustomer(mappedCustomer);
      setPlan(mappedPlan);
      setIsSynced(true);
      console.log('[Customer Context] Successfully synchronized data from CRM server.');
    } catch (e) {
      console.warn('[Customer Context] Sync failure. Keeping premium mock mode active.', e);
      setIsSynced(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    refreshData();
  }, [refreshData]);

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
      isSynced,
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
      isSynced,
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
