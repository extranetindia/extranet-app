import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AnimatedBarChart } from '@/components/charts/animated-bar-chart';
import { RadialProgress } from '@/components/charts/radial-progress';
import { StatTile } from '@/components/charts/stat-tile';
import { FadeIn } from '@/components/ui/fade-in';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { AppCard } from '@/components/ui/card';
import { UsageAnalyticsSkeleton } from '@/components/ui/skeleton';
import { AppText } from '@/components/ui/typography';
import {
  MOCK_CONNECTED_DEVICES,
  MOCK_DAILY_HOURS,
  MOCK_MONTHLY_USAGE,
  MOCK_USAGE_SUMMARY,
} from '@/data/mock-usage';
import { useScreenBootstrap } from '@/hooks/use-screen-bootstrap';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

export default function UsageScreen() {
  const { ready, showLoader, refresh } = useScreenBootstrap(600);
  const [refreshing, setRefreshing] = useState(false);
  const summary = MOCK_USAGE_SUMMARY;

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScreenScroll bottomInset={40} onRefresh={handleRefresh} refreshing={refreshing}>
        {showLoader && !ready ? (
          <UsageAnalyticsSkeleton />
        ) : (
          <>
            <ScreenHeader title="Usage analytics" subtitle={summary.monthLabel} />
            <FadeIn index={0}>
              <View style={styles.radialRow}>
                <AppCard variant="elevated" style={styles.radialCard}>
                  <RadialProgress
                    value={summary.totalGb}
                    max={600}
                    label="GB used"
                    sublabel={summary.monthLabel}
                  />
                </AppCard>
                <View style={styles.radialStats}>
                  <StatTile label="Avg speed" value={`${summary.avgSpeedMbps} Mbps`} icon="speedometer-outline" accent={Brand.accent} />
                  <StatTile label="Uptime" value={`${summary.uptimePercent}%`} icon="pulse-outline" accent={ExtranetColors.success} />
                </View>
              </View>
            </FadeIn>
            <FadeIn index={1}>
              <AppCard variant="elevated" style={styles.chartCard}>
                <AppText variant="h3" tone="default">
                  Monthly consumption
                </AppText>
                <AppText variant="caption" tone="muted" style={styles.chartSub}>
                  Peak usage: {summary.peakDay}
                </AppText>
                <AnimatedBarChart
                  data={MOCK_MONTHLY_USAGE.map((d) => ({ label: d.day, value: d.gb }))}
                  unit="GB per checkpoint"
                  barColor={Brand.primary}
                />
              </AppCard>
            </FadeIn>
            <FadeIn index={2}>
              <AppCard variant="elevated" style={styles.chartCard}>
                <AppText variant="h3" tone="default">
                  Today&apos;s usage by hour
                </AppText>
                <AnimatedBarChart
                  data={MOCK_DAILY_HOURS.map((d) => ({ label: d.hour, value: d.gb }))}
                  unit="GB"
                  barColor={Brand.accent}
                />
              </AppCard>
            </FadeIn>
            <FadeIn index={3}>
              <AppText variant="label" tone="muted" style={styles.devicesTitle}>
                CONNECTED DEVICES
              </AppText>
              {MOCK_CONNECTED_DEVICES.filter((d) => d.connected).map((device) => (
                <AppCard key={device.id} style={styles.deviceCard}>
                  <View style={styles.deviceRow}>
                    <View style={styles.deviceInfo}>
                      <AppText variant="bodyMedium" tone="default">
                        {device.name}
                      </AppText>
                      <AppText variant="caption" tone="muted">
                        {device.ip} · {device.usageGb} GB this month
                      </AppText>
                    </View>
                    <View style={styles.onlineDot} />
                  </View>
                </AppCard>
              ))}
            </FadeIn>
          </>
        )}
      </ScreenScroll>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  radialRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.xxl },
  radialCard: { alignItems: 'center', paddingVertical: Spacing.xl },
  radialStats: { flex: 1, gap: Spacing.md },
  chartCard: { marginBottom: Spacing.xxl, gap: Spacing.md },
  chartSub: { marginBottom: Spacing.md },
  devicesTitle: { marginBottom: Spacing.lg },
  deviceCard: { marginBottom: Spacing.sm },
  deviceRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  deviceInfo: { flex: 1, gap: 2 },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ExtranetColors.success,
  },
});
