import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { LiveSpeedMeter } from '@/components/home/live-speed-meter';
import { Badge } from '@/components/ui/badge';
import { AppButton } from '@/components/ui/button';
import { AppText } from '@/components/ui/typography';
import { useCustomer } from '@/context/customer-context';
import { Routes } from '@/constants/routes';
import { Brand, ExtranetColors, Gradients, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

export function CurrentPlanCard() {
  const { plan, subscriptionStatus } = useCustomer();
  const isActive = subscriptionStatus === 'active';

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[...Gradients.heroCardAccent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, Shadows.cardElevated]}>
        <View style={styles.redStripe} />
        <View style={styles.topRow}>
          <View>
            <AppText variant="label" color="rgba(255,255,255,0.75)" style={styles.labelOverride}>
              CURRENT PLAN
            </AppText>
            <AppText variant="h2" color={Brand.white}>
              {plan.name}
            </AppText>
          </View>
          <Badge label={isActive ? 'ACTIVE' : 'SUSPENDED'} variant={isActive ? 'active' : 'suspended'} />
        </View>

        <View style={styles.speedHero}>
          <AppText variant="hero" color={Brand.white} style={styles.speedNumber}>
            {plan.speedMbps}
          </AppText>
          <AppText variant="bodyMedium" color="rgba(255,255,255,0.85)">
            Mbps
          </AppText>
        </View>

        <View style={styles.liveSpeed}>
          <LiveSpeedMeter onDark />
        </View>

        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={15} color="rgba(255,255,255,0.7)" />
            <AppText variant="small" color="rgba(255,255,255,0.85)">
              Renews {plan.expiryDate}
            </AppText>
          </View>
          <AppText variant="caption" color="rgba(255,255,255,0.65)">
            {plan.daysRemaining} days left
          </AppText>
        </View>

        <View style={styles.ottRow}>
          {plan.ott.map((item) => (
            <View key={item.id} style={styles.ottChip}>
              <AppText variant="caption" color={Brand.white}>
                {item.label}
              </AppText>
            </View>
          ))}
        </View>

        <AppButton
          label="Renew now"
          variant="surface"
          icon="refresh"
          iconPosition="left"
          onPress={() => router.push(Routes.recharge)}
          style={styles.cta}
        />
        <AppText variant="caption" color="rgba(255,255,255,0.7)" align="center">
          ₹{plan.price}/month · Auto-renew on
        </AppText>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: Spacing.xxl },
  card: {
    borderRadius: Radius.xl,
    padding: Spacing.xxl,
    overflow: 'hidden',
  },
  redStripe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: Brand.red,
  },
  labelOverride: { marginBottom: Spacing.xs },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
    marginTop: Spacing.sm,
  },
  speedHero: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  speedNumber: { fontSize: 48, lineHeight: 52 },
  liveSpeed: {
    marginBottom: Spacing.lg,
    padding: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    marginBottom: Spacing.lg,
  },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  ottRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.xl },
  ottChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  cta: { marginBottom: Spacing.sm },
});
