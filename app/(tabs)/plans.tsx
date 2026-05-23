import { StyleSheet, View } from 'react-native';

import { PlanCard } from '@/components/plans/plan-card';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { AppHeading, AppText } from '@/components/ui/typography';
import { MOCK_PLANS } from '@/data/mock-customer';
import { Spacing } from '@/constants/extranet-theme';

export default function PlansScreen() {
  const currentPlanId = 'plan-ultra-300';

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
        {MOCK_PLANS.map((plan) => (
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
