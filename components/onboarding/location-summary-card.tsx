import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppCard } from '@/components/ui/card';
import { AppText } from '@/components/ui/typography';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';
import type { LocationSummary } from '@/types/onboarding';

type LocationSummaryCardProps = {
  location: Pick<LocationSummary, 'pincode' | 'society' | 'areaLabel' | 'city'>;
};

export function LocationSummaryCard({ location }: LocationSummaryCardProps) {
  return (
    <AppCard variant="elevated" style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons name="location" size={22} color={Brand.primary} />
        </View>
        <View style={styles.headerText}>
          <AppText variant="label" tone="muted">
            YOUR LOCATION
          </AppText>
          <AppText variant="bodyMedium" tone="default">
            {location.areaLabel || location.city}
          </AppText>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <AppText variant="small" tone="muted">
          Pincode
        </AppText>
        <AppText variant="bodyMedium" tone="default">
          {location.pincode}
        </AppText>
      </View>
      {location.society ? (
        <View style={styles.row}>
          <AppText variant="small" tone="muted">
            Society / Building
          </AppText>
          <AppText variant="small" tone="default" style={styles.societyValue}>
            {location.society}
          </AppText>
        </View>
      ) : null}
      <View style={styles.row}>
        <AppText variant="small" tone="muted">
          City
        </AppText>
        <AppText variant="bodyMedium" tone="default">
          {location.city}
        </AppText>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: { gap: Spacing.md },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: ExtranetColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1, gap: 2 },
  divider: { height: 1, backgroundColor: ExtranetColors.borderLight },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.lg,
  },
  societyValue: { flex: 1, textAlign: 'right' },
});
