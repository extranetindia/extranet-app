import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/typography';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

type BarChartProps = {
  data: { label: string; value: number }[];
  maxValue?: number;
  unit?: string;
  barColor?: string;
};

export function BarChart({
  data,
  maxValue,
  unit = '',
  barColor = Brand.primary,
}: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 1);

  return (
    <View style={styles.wrapper}>
      <View style={styles.chart}>
        {data.map((item) => {
          const heightPct = (item.value / max) * 100;
          return (
            <View key={item.label} style={styles.barCol}>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    { height: `${Math.max(heightPct, 8)}%`, backgroundColor: barColor },
                  ]}
                />
              </View>
              <AppText variant="caption" tone="muted" align="center" style={styles.label}>
                {item.label}
              </AppText>
            </View>
          );
        })}
      </View>
      {unit ? (
        <AppText variant="caption" tone="muted" style={styles.unit}>
          {unit}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: Spacing.sm },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 140,
    gap: Spacing.xs,
    paddingTop: Spacing.md,
  },
  barCol: { flex: 1, alignItems: 'center', gap: Spacing.sm },
  barTrack: {
    width: '100%',
    maxWidth: 36,
    height: 120,
    justifyContent: 'flex-end',
    backgroundColor: ExtranetColors.backgroundMuted,
    borderRadius: Radius.sm,
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderTopLeftRadius: Radius.sm,
    borderTopRightRadius: Radius.sm,
    minHeight: 4,
  },
  label: { fontSize: 10 },
  unit: { textAlign: 'right' },
});
