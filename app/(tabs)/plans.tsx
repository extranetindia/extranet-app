import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { PlanCard } from '@/components/plans/plan-card';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { PlanCatalogSkeleton } from '@/components/ui/skeleton';
import { AppHeading, AppText } from '@/components/ui/typography';
import { Spacing } from '@/constants/extranet-theme';
import { useCustomer } from '@/context/customer-context';
import { type BroadbandPlan, MOCK_PLANS } from '@/data/mock-customer';
import { useDelayedLoader } from '@/hooks/use-delayed-loader';
import { getFromApi } from '@/utils/api-client';
import { mapServerPlanToAppPlan } from '@/utils/plan-mapping';

const PLAN_CATALOG_CACHE_KEY = 'extranet:last-live-plan-catalog:v1';

type CachedPlanCatalog = {
  plans: BroadbandPlan[];
  cachedAt: string;
};

function normalizeCatalogResponse(rawPlans: unknown): unknown[] {
  if (Array.isArray(rawPlans)) return rawPlans;

  if (rawPlans && typeof rawPlans === 'object') {
    const record = rawPlans as Record<string, unknown>;
    if (Array.isArray(record.plans)) return record.plans;
    if (Array.isArray(record.data)) return record.data;
    if (Array.isArray(record.items)) return record.items;
  }

  return [];
}

async function loadCachedPlanCatalog(): Promise<BroadbandPlan[] | null> {
  try {
    const raw = await AsyncStorage.getItem(PLAN_CATALOG_CACHE_KEY);
    if (!raw) return null;

    const cached = JSON.parse(raw) as CachedPlanCatalog;
    if (!Array.isArray(cached.plans) || cached.plans.length === 0) {
      return null;
    }

    return cached.plans;
  } catch (e) {
    console.warn('[Plans Screen] Failed to load cached plan catalog.', e);
    return null;
  }
}

async function persistPlanCatalog(plans: BroadbandPlan[]) {
  try {
    if (plans.length === 0) {
      await AsyncStorage.removeItem(PLAN_CATALOG_CACHE_KEY);
      return;
    }

    const cached: CachedPlanCatalog = {
      plans,
      cachedAt: new Date().toISOString(),
    };

    await AsyncStorage.setItem(PLAN_CATALOG_CACHE_KEY, JSON.stringify(cached));
  } catch (e) {
    console.warn('[Plans Screen] Failed to persist plan catalog.', e);
  }
}

export default function PlansScreen() {
  const { plan: currentActivePlan } = useCustomer();
  const [plans, setPlans] = useState<BroadbandPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const showSkeleton = useDelayedLoader(loading && plans.length === 0);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      async function loadPlans() {
        setLoading(true);
        const cachedPlans = await loadCachedPlanCatalog();
        if (active && cachedPlans) {
          setPlans(cachedPlans);
        }

        try {
          const rawPlans = await getFromApi<unknown>('/catalog/plans');
          const catalogPlans = normalizeCatalogResponse(rawPlans);
          const mapped = catalogPlans.map(mapServerPlanToAppPlan);
          if (!active) return;

          setPlans(mapped);
          await persistPlanCatalog(mapped);
          return;
        } catch (e) {
          console.warn('[Plans Screen] Failed to load fresh catalog from CRM.', e);
        }

        if (!active) return;

        setPlans(cachedPlans ?? MOCK_PLANS);
      }

      loadPlans().finally(() => {
        if (active) {
          setLoading(false);
        }
      });

      return () => {
        active = false;
      };
    }, []),
  );

  const currentPlanId = currentActivePlan?.id || 'plan-ultra-300';

  return (
    <SafeScreen edges={['top']} tone="light">
      <ScreenScroll bottomInset={100}>
        {showSkeleton ? (
          <PlanCatalogSkeleton />
        ) : (
          <>
            <View style={styles.header}>
              <AppHeading level={1} tone="default">
                Broadband plans
              </AppHeading>
              <AppText variant="body" tone="secondary">
                Speed-first fiber plans with OTT bundled. Upgrade anytime - no technician visit needed.
              </AppText>
            </View>
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isCurrent={plan.id === currentPlanId}
                premium={plan.recommended}
              />
            ))}
          </>
        )}
      </ScreenScroll>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.sm,
    marginBottom: Spacing.xxl,
  },
});
