import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/button';
import { AppCard } from '@/components/ui/card';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { AppText } from '@/components/ui/typography';
import { useCustomer } from '@/context/customer-context';
import { useAppFeatures } from '@/context/app-features-context';
import { Routes } from '@/constants/routes';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

export default function RechargePlanSummaryScreen() {
  const { plan } = useCustomer();
  const { totalPayable } = useAppFeatures();

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScreenScroll bottomInset={100}>
        <ScreenHeader title="Renew plan" subtitle="Review before payment" />
        <AppCard variant="elevated" style={styles.planCard}>
          <View style={styles.planHeader}>
            <AppText variant="label" tone="muted">
              SELECTED PLAN
            </AppText>
            <View style={styles.speedBadge}>
              <AppText variant="caption" color={Brand.white} style={styles.speedText}>
                {plan.speedMbps} Mbps
              </AppText>
            </View>
          </View>
          <AppText variant="h2" tone="default">
            {plan.name}
          </AppText>
          <AppText variant="body" tone="secondary" style={styles.desc}>
            Unlimited fiber · Wi‑Fi 6 router · 3 OTT apps included
          </AppText>
          <View style={styles.meta}>
            <MetaItem label="Billing" value="Monthly" />
            <MetaItem label="Renews on" value={plan.expiryDate} />
            <MetaItem label="Days left" value={`${plan.daysRemaining} days`} />
          </View>
        </AppCard>
        <AppCard style={styles.estimate}>
          <AppText variant="small" tone="secondary">
            Estimated payable (incl. GST)
          </AppText>
          <AppText variant="h1" color={Brand.primary}>
            ₹{totalPayable}
          </AppText>
        </AppCard>
      </ScreenScroll>
      <View style={styles.footer}>
        <AppButton label="Continue" icon="arrow-forward" onPress={() => router.push(Routes.rechargeBilling)} />
      </View>
    </SafeScreen>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaItem}>
      <AppText variant="caption" tone="muted">
        {label}
      </AppText>
      <AppText variant="small" tone="default">
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  planCard: { gap: Spacing.md, marginBottom: Spacing.lg },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  speedBadge: {
    backgroundColor: Brand.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  speedText: { fontWeight: '700' },
  desc: { marginTop: Spacing.xs },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: ExtranetColors.borderLight,
  },
  metaItem: { gap: 2 },
  estimate: {
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xl,
  },
  footer: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
    backgroundColor: ExtranetColors.background,
  },
});
