import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppCard } from '@/components/ui/card';
import { AppText } from '@/components/ui/typography';
import { BENEFITS } from '@/data/mock-availability';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

const ICON_MAP: Record<(typeof BENEFITS)[0]['icon'], keyof typeof Ionicons.glyphMap> = {
  flash: 'flash',
  wifi: 'wifi',
  headset: 'headset-outline',
  'shield-checkmark': 'shield-checkmark',
};

export function BenefitsList() {
  return (
    <View style={styles.list}>
      {BENEFITS.map((benefit) => (
        <AppCard key={benefit.id} variant="default" style={styles.item}>
          <View style={styles.iconBox}>
            <Ionicons
              name={ICON_MAP[benefit.icon]}
              size={22}
              color={Brand.primary}
            />
          </View>
          <View style={styles.text}>
            <AppText variant="bodyMedium" tone="default">
              {benefit.title}
            </AppText>
            <AppText variant="small" tone="muted">
              {benefit.subtitle}
            </AppText>
          </View>
          <Ionicons name="chevron-forward" size={18} color={ExtranetColors.textMuted} />
        </AppCard>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: Spacing.md },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: ExtranetColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, gap: 2 },
});
