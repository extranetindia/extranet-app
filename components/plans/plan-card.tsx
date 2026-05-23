import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, StyleSheet, View } from 'react-native';

import { Badge } from '@/components/ui/badge';
import { AppButton } from '@/components/ui/button';
import { AppText } from '@/components/ui/typography';
import type { BroadbandPlan } from '@/data/mock-customer';
import { Brand, ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

type PlanCardProps = {
  plan: BroadbandPlan;
  isCurrent?: boolean;
  premium?: boolean;
};

export function PlanCard({ plan, isCurrent, premium }: PlanCardProps) {
  const isPremium = premium ?? plan.recommended;

  const handleSelect = () => {
    Alert.alert('Plan selected (demo)', `${plan.name} at ₹${plan.price}/mo`, [{ text: 'OK' }]);
  };

  const cardContent = (
    <>
      <View style={styles.speedHeader}>
        <AppText
          variant="hero"
          color={isPremium ? Brand.white : Brand.primary}
          style={styles.speed}>
          {plan.speedMbps}
        </AppText>
        <View>
          <AppText
            variant="caption"
            color={isPremium ? 'rgba(255,255,255,0.8)' : ExtranetColors.textMuted}>
            Mbps
          </AppText>
          <AppText
            variant="h3"
            color={isPremium ? Brand.white : ExtranetColors.text}>
            {plan.name}
          </AppText>
        </View>
        {plan.recommended && <Badge label="RECOMMENDED" variant="recommended" />}
        {isCurrent && <Badge label="CURRENT" variant="active" />}
      </View>

      <View style={styles.priceRow}>
        <AppText variant="h1" color={isPremium ? Brand.white : ExtranetColors.text}>
          ₹{plan.price}
        </AppText>
        <AppText variant="small" color={isPremium ? 'rgba(255,255,255,0.75)' : ExtranetColors.textMuted}>
          /month
        </AppText>
        {plan.originalPrice && (
          <AppText
            variant="small"
            color={isPremium ? 'rgba(255,255,255,0.55)' : ExtranetColors.textMuted}
            style={styles.strike}>
            ₹{plan.originalPrice}
          </AppText>
        )}
      </View>

      <View style={styles.ottRow}>
        {plan.ott.map((item) => (
          <View
            key={item.id}
            style={[styles.ottPill, isPremium && styles.ottPillPremium]}>
            <Ionicons
              name={item.icon as keyof typeof Ionicons.glyphMap}
              size={14}
              color={isPremium ? Brand.white : Brand.primary}
            />
            <AppText
              variant="caption"
              color={isPremium ? Brand.white : ExtranetColors.textSecondary}>
              {item.label}
            </AppText>
          </View>
        ))}
      </View>

      <View style={styles.features}>
        {plan.features.map((f) => (
          <View key={f} style={styles.featureRow}>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color={isPremium ? Brand.white : Brand.primary}
            />
            <AppText variant="small" color={isPremium ? 'rgba(255,255,255,0.9)' : ExtranetColors.textSecondary}>
              {f}
            </AppText>
          </View>
        ))}
      </View>

      <AppButton
        label={isCurrent ? 'Current plan' : 'Choose plan'}
        variant={isCurrent ? 'secondary' : isPremium ? 'surface' : 'primary'}
        disabled={isCurrent}
        onPress={handleSelect}
      />
    </>
  );

  if (isPremium) {
    return (
      <View style={styles.wrapper}>
        <LinearGradient
          colors={plan.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, styles.cardPremium, Shadows.cardElevated]}>
          <View style={styles.redStripe} />
          {cardContent}
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, styles.card, styles.cardStandard, Shadows.card, isCurrent && styles.current]}>
      {cardContent}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: Spacing.xxl },
  card: {
    borderRadius: Radius.xl,
    padding: Spacing.xxl,
    borderWidth: 1,
    borderColor: ExtranetColors.borderLight,
  },
  cardStandard: { backgroundColor: ExtranetColors.surface },
  cardPremium: { borderWidth: 0, overflow: 'hidden' },
  current: { borderColor: Brand.primary, borderWidth: 2 },
  redStripe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Brand.red,
  },
  speedHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
    flexWrap: 'wrap',
  },
  speed: { fontSize: 44, lineHeight: 48, marginRight: Spacing.xs },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  strike: { textDecorationLine: 'line-through', marginLeft: Spacing.sm },
  ottRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.lg },
  ottPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    backgroundColor: ExtranetColors.primaryMuted,
    borderWidth: 1,
    borderColor: 'rgba(11, 78, 162, 0.15)',
  },
  ottPillPremium: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderColor: 'rgba(255,255,255,0.25)',
  },
  features: { gap: Spacing.sm, marginBottom: Spacing.xl },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
});
