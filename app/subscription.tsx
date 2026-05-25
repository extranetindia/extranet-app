import { router } from 'expo-router';
import { StyleSheet, Switch, View } from 'react-native';

import { Badge } from '@/components/ui/badge';
import { AppButton } from '@/components/ui/button';
import { AppCard } from '@/components/ui/card';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { SubscriptionSkeleton } from '@/components/ui/skeleton';
import { AppText } from '@/components/ui/typography';
import { useCustomer } from '@/context/customer-context';
import { useAppFeatures } from '@/context/app-features-context';
import { MOCK_RENEWAL_HISTORY } from '@/data/mock-subscription';
import { Routes } from '@/constants/routes';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';
import { useDelayedLoader } from '@/hooks/use-delayed-loader';

export default function SubscriptionScreen() {
  const { plan, isHydrating, hasCachedLiveData } = useCustomer();
  const { subscriptionMeta, autoRenew, toggleAutoRenew } = useAppFeatures();
  const showSkeleton = useDelayedLoader(isHydrating && !hasCachedLiveData);
  const billingCycle = plan.billingCycle.charAt(0).toUpperCase() + plan.billingCycle.slice(1);
  const renewalHistory = MOCK_RENEWAL_HISTORY.map((item) => ({
    ...item,
    amount: plan.price,
  }));

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScreenScroll bottomInset={40}>
        {showSkeleton ? (
          <SubscriptionSkeleton />
        ) : (
          <>
        <ScreenHeader title="Subscription" subtitle="Plan & billing" />
        <AppCard variant="elevated" style={styles.planCard}>
          <View style={styles.planTop}>
            <View>
              <AppText variant="label" tone="muted">
                CURRENT PLAN
              </AppText>
              <AppText variant="h2" tone="default">
                {plan.name}
              </AppText>
              <AppText variant="h1" color={Brand.primary} style={styles.speed}>
                {plan.speed}
              </AppText>
            </View>
            <Badge label="ACTIVE" variant="active" />
          </View>
          <View style={styles.discountBadge}>
            <AppText variant="caption" color={Brand.red} style={styles.discountText}>
              🏷 {subscriptionMeta.negotiatedLabel}
            </AppText>
          </View>
          <View style={styles.grid}>
            <Info label="Expiry" value={plan.expiryDate} />
            <Info label="Plan charge" value={`₹${plan.price}/mo`} />
            <Info label="Billing cycle" value={billingCycle} />
            <Info label="Next bill" value={plan.expiryDate} />
            <Info label="Member since" value={subscriptionMeta.memberSince} />
          </View>
        </AppCard>
        <AppCard style={styles.autoRenew}>
          <View style={styles.autoRow}>
            <View>
              <AppText variant="bodyMedium" tone="default">
                Auto-renew
              </AppText>
              <AppText variant="caption" tone="muted">
                Automatically renew on billing date
              </AppText>
            </View>
            <Switch
              value={autoRenew}
              onValueChange={toggleAutoRenew}
              trackColor={{ false: ExtranetColors.border, true: Brand.accent }}
              thumbColor={autoRenew ? Brand.primary : ExtranetColors.surface}
            />
          </View>
        </AppCard>
        <View style={styles.ctaRow}>
          <View style={styles.ctaHalf}>
            <AppButton label="Renew now" onPress={() => router.push(Routes.recharge)} />
          </View>
          <View style={styles.ctaHalf}>
            <AppButton
              label="Change plan"
              variant="outline"
              onPress={() => router.push(Routes.plans)}
            />
          </View>
        </View>
        <AppText variant="label" tone="muted" style={styles.historyTitle}>
          RENEWAL HISTORY
        </AppText>
        {renewalHistory.map((item) => (
          <AppCard key={item.id} style={styles.historyItem}>
            <View style={styles.historyRow}>
              <View>
                <AppText variant="bodyMedium" tone="default">
                  ₹{item.amount}
                </AppText>
                <AppText variant="caption" tone="muted">
                  {item.date} · {item.method}
                </AppText>
              </View>
              <Badge
                label={item.status.toUpperCase()}
                variant={item.status === 'paid' ? 'active' : 'suspended'}
              />
            </View>
          </AppCard>
        ))}
          </>
        )}
      </ScreenScroll>
    </SafeScreen>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.info}>
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
  planCard: { gap: Spacing.lg, marginBottom: Spacing.lg },
  planTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  speed: { marginTop: Spacing.xs },
  discountBadge: {
    backgroundColor: ExtranetColors.redMuted,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'rgba(215, 25, 32, 0.2)',
  },
  discountText: { fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.lg },
  info: { width: '45%', gap: 2 },
  autoRenew: { marginBottom: Spacing.lg },
  autoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ctaRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.xxl },
  ctaHalf: { flex: 1 },
  historyTitle: { marginBottom: Spacing.lg },
  historyItem: { marginBottom: Spacing.sm, paddingVertical: Spacing.md },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
