import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

import { AppText } from '@/components/ui/typography';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

type AnimatedBarChartProps = {
  data: { label: string; value: number }[];
  maxValue?: number;
  unit?: string;
  barColor?: string;
  animate?: boolean;
};

export function AnimatedBarChart({
  data,
  maxValue,
  unit = '',
  barColor = Brand.primary,
  animate = true,
}: AnimatedBarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 1);

  return (
    <View style={styles.wrapper}>
      <View style={styles.chart}>
        {data.map((item, index) => (
          <BarColumn
            key={item.label}
            label={item.label}
            value={item.value}
            max={max}
            color={barColor}
            index={index}
            animate={animate}
          />
        ))}
      </View>
      {unit ? (
        <AppText variant="caption" tone="muted" style={styles.unit}>
          {unit}
        </AppText>
      ) : null}
    </View>
  );
}

function BarColumn({
  label,
  value,
  max,
  color,
  index,
  animate,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  index: number;
  animate: boolean;
}) {
  const heightPct = Math.max((value / max) * 100, 8);
  const progress = useSharedValue(animate ? 0 : heightPct);

  useEffect(() => {
    if (animate) {
      progress.value = withDelay(index * 60, withSpring(heightPct, { damping: 14, stiffness: 120 }));
    }
  }, [animate, heightPct, index, progress]);

  const barStyle = useAnimatedStyle(() => ({
    height: `${progress.value}%`,
  }));

  return (
    <View style={styles.barCol}>
      <View style={styles.barTrack}>
        <Animated.View style={[styles.barFill, { backgroundColor: color }, barStyle]} />
      </View>
      <AppText variant="caption" tone="muted" align="center" style={styles.label}>
        {label}
      </AppText>
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
