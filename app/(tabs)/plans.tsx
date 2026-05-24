import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { PlanCard } from '@/components/plans/plan-card';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { AppHeading, AppText } from '@/components/ui/typography';
import { MOCK_PLANS, BroadbandPlan } from '@/data/mock-customer';
import { Spacing } from '@/constants/extranet-theme';
import { useCustomer } from '@/context/customer-context';
import { getFromApi } from '@/utils/api-client';

// Mapper to convert standard server plans to premium app broadband plans
function mapServerPlanToAppPlan(serverPlan: any): BroadbandPlan {
  const speed = serverPlan.speedMbps || 100;
  let gradient: [string, string] = ['#F5F7FA', '#EDF1F6'];
  let recommended = serverPlan.popular || false;
  let ott = [{ id: 'hotstar', label: 'Hotstar', icon: 'star' }];

  if (speed >= 1000) {
    gradient = ['#071426', '#0B4EA2'];
    ott = [
      { id: 'netflix', label: 'Netflix', icon: 'film' },
      { id: 'prime', label: 'Prime', icon: 'play-circle' },
      { id: 'hotstar', label: 'Hotstar', icon: 'star' },
      { id: 'sonyliv', label: 'SonyLIV', icon: 'tv' },
      { id: 'zee5', label: 'ZEE5', icon: 'play' },
    ];
  } else if (speed >= 300 || serverPlan.id === 'business-pro') {
    gradient = ['#071426', '#0B4EA2'];
    ott = [
      { id: 'netflix', label: 'Netflix', icon: 'film' },
      { id: 'prime', label: 'Prime', icon: 'play-circle' },
      { id: 'hotstar', label: 'Hotstar', icon: 'star' },
      { id: 'sonyliv', label: 'SonyLIV', icon: 'tv' },
    ];
  } else if (speed >= 100 || serverPlan.id === 'home-stream') {
    gradient = ['#0B4EA2', '#2D7FF9'];
    recommended = true;
    ott = [
      { id: 'netflix', label: 'Netflix', icon: 'film' },
      { id: 'prime', label: 'Prime', icon: 'play-circle' },
      { id: 'hotstar', label: 'Hotstar', icon: 'star' },
    ];
  }

  return {
    id: serverPlan.id,
    name: serverPlan.name,
    speed: serverPlan.speed,
    speedMbps: speed,
    price: serverPlan.startingPrice,
    ott,
    features: serverPlan.features || [],
    recommended,
    gradient,
  };
}

export default function PlansScreen() {
  const { plan: currentActivePlan, isSynced } = useCustomer();
  const [plans, setPlans] = useState<BroadbandPlan[]>(MOCK_PLANS);

  useEffect(() => {
    async function loadPlans() {
      if (!isSynced) return;
      try {
        const rawPlans = await getFromApi<any[]>('/catalog/plans');
        if (rawPlans && rawPlans.length > 0) {
          const mapped = rawPlans.map(mapServerPlanToAppPlan);
          setPlans(mapped);
        }
      } catch (e) {
        console.warn('[Plans Screen] Failed to load catalog from CRM. Keeping local catalog active.', e);
      }
    }
    loadPlans();
  }, [isSynced]);

  const currentPlanId = currentActivePlan?.id || 'plan-ultra-300';

  return (
    <SafeScreen edges={['top']} tone="light">
      <ScreenScroll bottomInset={100}>
        <View style={styles.header}>
          <AppHeading level={1} tone="default">
            Broadband plans
          </AppHeading>
          <AppText variant="body" tone="secondary">
            Speed-first fiber plans with OTT bundled. Upgrade anytime — no technician visit needed.
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
