import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { Coupon, Transaction } from '@/data/mock-recharge';
import {
  MOCK_COUPONS,
  MOCK_PAYMENT_METHODS,
  buildBillingLines,
  createTransaction,
  getTotalFromLines,
} from '@/data/mock-recharge';
import { MOCK_NOTIFICATIONS, type AppNotification } from '@/data/mock-notifications';
import { MOCK_ROUTER, MOCK_ROUTER_DEVICES } from '@/data/mock-router';
import { MOCK_SUBSCRIPTION } from '@/data/mock-subscription';
import {
  ISSUE_CATEGORIES,
  MOCK_TICKETS,
  type SupportTicket,
} from '@/data/mock-support-tickets';
import { useCustomer } from '@/context/customer-context';
import { postToApi } from '@/utils/api-client';

type AppFeaturesContextValue = {
  // Recharge
  basePrice: number;
  couponCode: string;
  appliedCoupon: Coupon | null;
  selectedPaymentId: string;
  billingLines: ReturnType<typeof buildBillingLines>;
  totalPayable: number;
  lastTransaction: Transaction | null;
  serverAvailable: boolean;
  offlineMode: boolean;
  syncError: string | null;
  setCouponCode: (code: string) => void;
  applyCoupon: () => { success: boolean; message: string };
  clearCoupon: () => void;
  setPaymentMethod: (id: string) => void;
  processPayment: () => Promise<{ success: boolean; transaction: Transaction }>;
  resetRecharge: () => void;

  // Subscription
  subscriptionMeta: typeof MOCK_SUBSCRIPTION;
  autoRenew: boolean;
  toggleAutoRenew: () => void;

  // Notifications
  notifications: AppNotification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;

  // Tickets
  tickets: SupportTicket[];
  addTicket: (category: string, subject: string, description: string) => string;

  // Router
  routerSettings: typeof MOCK_ROUTER;
  routerDevices: typeof MOCK_ROUTER_DEVICES;
  wifiPassword: string;
  setWifiPassword: (p: string) => void;
  toggleParentalControl: () => void;
};

const AppFeaturesContext = createContext<AppFeaturesContextValue | null>(null);

export function AppFeaturesProvider({ children }: { children: React.ReactNode }) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState(MOCK_PAYMENT_METHODS[0].id);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);
  const [autoRenew, setAutoRenew] = useState(MOCK_SUBSCRIPTION.autoRenew);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [routerSettings, setRouterSettings] = useState(MOCK_ROUTER);
  const [wifiPassword, setWifiPassword] = useState('extranet@2026');

  const { isSynced, plan, refreshData, serverAvailable, offlineMode, syncError } = useCustomer();

  const billingLines = useMemo(
    () => buildBillingLines(plan.price, appliedCoupon, plan.name),
    [appliedCoupon, plan.name, plan.price],
  );
  const totalPayable = useMemo(() => getTotalFromLines(billingLines), [billingLines]);

  const applyCoupon = useCallback(() => {
    const code = couponCode.trim().toUpperCase();
    const found = MOCK_COUPONS.find((c) => c.code === code);
    if (!found) return { success: false, message: 'Invalid coupon code' };
    setAppliedCoupon(found);
    return { success: true, message: found.label };
  }, [couponCode]);

  const clearCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponCode('');
  }, []);

  const processPayment = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 2200));
    const method = MOCK_PAYMENT_METHODS.find((m) => m.id === selectedPaymentId);
    const fail = selectedPaymentId === 'fail-demo';
    if (offlineMode) {
      const txn = createTransaction(totalPayable, method?.label ?? 'UPI', 'failed', plan.name);
      setLastTransaction(txn);
      console.warn('[Recharge Sync] Payment skipped because the CRM server is unavailable.');
      return { success: false, transaction: txn };
    }

    const txn = createTransaction(totalPayable, method?.label ?? 'UPI', fail ? 'failed' : 'success', plan.name);
    setLastTransaction(txn);

    if (!fail && isSynced && serverAvailable) {
      try {
        const serverCustomerId = 'cust-rahul'; // Active demo customer in extranet-app
        await postToApi(`/customers/${serverCustomerId}/recharge`, {
          amount: totalPayable,
          method: method?.label ?? 'UPI',
          billingCycle: plan.billingCycle,
        });
        
        // Refresh customer context to pull updated dates/status from next.js server immediately
        await refreshData();
        console.log('[Recharge Sync] Successfully logged transaction on CRM server.');
      } catch (e) {
        console.error('[Recharge Sync] Failed to register payment on CRM server', e);
        await refreshData();
      }
    }

    return { success: !fail, transaction: txn };
  }, [selectedPaymentId, totalPayable, offlineMode, plan.name, isSynced, serverAvailable, plan.billingCycle, refreshData]);

  const resetRecharge = useCallback(() => {
    setCouponCode('');
    setAppliedCoupon(null);
    setSelectedPaymentId(MOCK_PAYMENT_METHODS[0].id);
  }, []);

  const toggleAutoRenew = useCallback(() => setAutoRenew((v) => !v), []);

  const markRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const addTicket = useCallback((category: string, subject: string, description: string) => {
    const id = `TKT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTicket: SupportTicket = {
      id,
      category,
      subject,
      status: 'open',
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      updatedAt: 'Just now',
      description,
      timeline: [
        {
          id: '1',
          title: 'Ticket raised',
          subtitle: 'Via app',
          time: 'Just now',
          completed: true,
        },
        {
          id: '2',
          title: 'Awaiting assignment',
          subtitle: 'Support team will respond shortly',
          time: '—',
          completed: false,
        },
      ],
    };
    setTickets((prev) => [newTicket, ...prev]);
    return id;
  }, []);

  const toggleParentalControl = useCallback(() => {
    setRouterSettings((prev) => ({
      ...prev,
      parentalControlEnabled: !prev.parentalControlEnabled,
    }));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value = useMemo(
    () => ({
      basePrice: plan.price,
      couponCode,
      appliedCoupon,
      selectedPaymentId,
      billingLines,
      totalPayable,
      lastTransaction,
      serverAvailable,
      offlineMode,
      syncError,
      setCouponCode,
      applyCoupon,
      clearCoupon,
      setPaymentMethod: setSelectedPaymentId,
      processPayment,
      resetRecharge,
      subscriptionMeta: MOCK_SUBSCRIPTION,
      autoRenew,
      toggleAutoRenew,
      notifications,
      unreadCount,
      markRead,
      markAllRead,
      tickets,
      addTicket,
      routerSettings,
      routerDevices: MOCK_ROUTER_DEVICES,
      wifiPassword,
      setWifiPassword,
      toggleParentalControl,
    }),
    [
      couponCode,
      appliedCoupon,
      selectedPaymentId,
      billingLines,
      totalPayable,
      lastTransaction,
      serverAvailable,
      offlineMode,
      syncError,
      applyCoupon,
      clearCoupon,
      processPayment,
      resetRecharge,
      autoRenew,
      toggleAutoRenew,
      notifications,
      unreadCount,
      markRead,
      markAllRead,
      tickets,
      addTicket,
      routerSettings,
      wifiPassword,
      toggleParentalControl,
      plan.price,
    ],
  );

  return <AppFeaturesContext.Provider value={value}>{children}</AppFeaturesContext.Provider>;
}

export function useAppFeatures() {
  const ctx = useContext(AppFeaturesContext);
  if (!ctx) throw new Error('useAppFeatures must be used within AppFeaturesProvider');
  return ctx;
}

export { ISSUE_CATEGORIES };
