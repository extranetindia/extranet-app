import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { AppCard } from '@/components/ui/card';
import { AppText } from '@/components/ui/typography';
import { MOCK_USAGE_SUMMARY } from '@/data/mock-usage';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

const USAGE_PCT = 42;

export function UsageProgressCard() {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(USAGE_PCT, { duration: 1000 });
  }, [width]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <AppCard variant="default" style={styles.card}>
      <View style={styles.header}>
        <AppText variant="h3" tone="default">
          Monthly data usage
        </AppText>
        <AppText variant="caption" tone="muted">
          {MOCK_USAGE_SUMMARY.monthLabel}
        </AppText>
      </View>
      <View style={styles.row}>
        <AppText variant="h2" color={Brand.primary}>
          {MOCK_USAGE_SUMMARY.totalGb} GB
        </AppText>
        <AppText variant="small" tone="muted">
          {MOCK_USAGE_SUMMARY.limitGb} plan
        </AppText>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, fillStyle]} />
      </View>
      <AppText variant="caption" tone="muted">
        {USAGE_PCT}% of fair-usage advisory · Well within limits
      </AppText>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.lg, gap: Spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'baseline', gap: Spacing.sm },
  track: {
    height: 10,
    borderRadius: Radius.full,
    backgroundColor: ExtranetColors.backgroundMuted,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Radius.full,
    backgroundColor: Brand.primary,
  },
});
