import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import {
  MOCK_ACTIVE_PLAN,
  MOCK_CUSTOMER,
  MOCK_SPEED,
  type ConnectionStatus,
  type SubscriptionStatus,
} from '@/data/mock-customer';

type CustomerContextValue = {
  customer: typeof MOCK_CUSTOMER;
  plan: typeof MOCK_ACTIVE_PLAN;
  speed: typeof MOCK_SPEED;
  connectionStatus: ConnectionStatus;
  subscriptionStatus: SubscriptionStatus;
  notificationsEnabled: boolean;
  routerRestarting: boolean;
  speedTesting: boolean;
  toggleNotifications: () => void;
  restartRouter: () => Promise<void>;
  runSpeedTest: () => Promise<void>;
  renewPlan: () => void;
};

const CustomerContext = createContext<CustomerContextValue | null>(null);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState(MOCK_CUSTOMER);
  const [speed, setSpeed] = useState(MOCK_SPEED);
  const [routerRestarting, setRouterRestarting] = useState(false);
  const [speedTesting, setSpeedTesting] = useState(false);

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
    // Mock renew — no-op for demo
  }, []);

  const value = useMemo(
    () => ({
      customer,
      plan: MOCK_ACTIVE_PLAN,
      speed,
      connectionStatus: customer.connectionStatus,
      subscriptionStatus: customer.subscriptionStatus,
      notificationsEnabled: customer.notificationsEnabled,
      routerRestarting,
      speedTesting,
      toggleNotifications,
      restartRouter,
      runSpeedTest,
      renewPlan,
    }),
    [
      customer,
      speed,
      routerRestarting,
      speedTesting,
      toggleNotifications,
      restartRouter,
      runSpeedTest,
      renewPlan,
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
