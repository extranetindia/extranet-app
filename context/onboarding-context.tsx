import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import type { OnboardingFormData } from '@/types/onboarding';

type OnboardingContextValue = {
  form: OnboardingFormData;
  updateForm: (patch: Partial<OnboardingFormData>) => void;
  resetForm: () => void;
  notifyRequested: boolean;
  setNotifyRequested: (value: boolean) => void;
};

const defaultForm: OnboardingFormData = {
  pincode: '',
  society: '',
  areaLabel: '',
  city: '',
  detectedLocation: false,
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState<OnboardingFormData>(defaultForm);
  const [notifyRequested, setNotifyRequested] = useState(false);

  const updateForm = useCallback((patch: Partial<OnboardingFormData>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetForm = useCallback(() => {
    setForm(defaultForm);
    setNotifyRequested(false);
  }, []);

  const value = useMemo(
    () => ({
      form,
      updateForm,
      resetForm,
      notifyRequested,
      setNotifyRequested,
    }),
    [form, updateForm, resetForm, notifyRequested],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return ctx;
}
