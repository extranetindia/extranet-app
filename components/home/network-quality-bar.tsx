import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/typography';
import { useCustomer } from '@/context/customer-context';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

const BARS = [1, 2, 3, 4, 5];

export function NetworkQualityBar() {
  const { connectionStatus, speed } = useCustomer();
  const online = connectionStatus === 'online';
  const quality = online ? (speed.download > 250 ? 5 : speed.download > 150 ? 4 : 3) : 0;
  const label = online
    ? quality >= 4
      ? 'Excellent'
      : quality >= 3
        ? 'Good'
        : 'Fair'
    : 'No signal';

  return (
    <View style={styles.wrap}>
      <View style={styles.bars}>
        {BARS.map((level) => (
          <View
            key={level}
            style={[
              styles.bar,
              { height: 6 + level * 4 },
              level <= quality ? styles.barActive : styles.barInactive,
            ]}
          />
        ))}
      </View>
      <AppText variant="caption" tone="secondary" style={styles.labelText}>
        Network quality:{' '}
        <AppText variant="caption" color={Brand.primary}>
          {label}
        </AppText>
      </AppText>
      <Ionicons name="cellular" size={16} color={Brand.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: ExtranetColors.primaryMuted,
    borderRadius: Radius.md,
    marginBottom: Spacing.lg,
  },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 3 },
  bar: { width: 4, borderRadius: 2 },
  barActive: { backgroundColor: Brand.primary },
  barInactive: { backgroundColor: ExtranetColors.border },
  labelText: { flex: 1 },
});
