import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Shimmer } from '@/components/ui/shimmer';
import { ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

export function SkeletonLine({
  width = '100%',
  height = 14,
}: {
  width?: number | `${number}%`;
  height?: number;
}) {
  return <Shimmer width={width} height={height} borderRadius={6} />;
}

export function SkeletonCard({ style }: { style?: ViewStyle }) {
  return (
    <View style={[styles.card, style]}>
      <SkeletonLine width="40%" height={12} />
      <SkeletonLine width="70%" height={22} />
      <SkeletonLine width="55%" height={14} />
      <View style={styles.row}>
        <Shimmer width={80} height={32} borderRadius={Radius.full} />
        <Shimmer width={80} height={32} borderRadius={Radius.full} />
      </View>
    </View>
  );
}

export function DashboardSkeleton() {
  return (
    <View style={styles.dashboard}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1, gap: Spacing.sm }}>
          <SkeletonLine width="50%" />
          <SkeletonLine width="65%" height={24} />
        </View>
        <Shimmer width={44} height={44} borderRadius={22} />
        <Shimmer width={44} height={44} borderRadius={22} />
      </View>
      <SkeletonCard style={{ minHeight: 72 }} />
      <SkeletonCard style={{ minHeight: 200 }} />
      <View style={styles.grid}>
        <Shimmer style={styles.gridItem} height={118} borderRadius={Radius.lg} />
        <Shimmer style={styles.gridItem} height={118} borderRadius={Radius.lg} />
        <Shimmer style={styles.gridItem} height={118} borderRadius={Radius.lg} />
        <Shimmer style={styles.gridItem} height={118} borderRadius={Radius.lg} />
      </View>
      <Shimmer height={132} borderRadius={Radius.lg} />
    </View>
  );
}

export function ScreenSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <View style={styles.screen}>
      <SkeletonLine width="46%" height={26} />
      <SkeletonLine width="62%" />
      {Array.from({ length: rows }).map((_, index) => (
        <SkeletonCard key={index} style={{ minHeight: index === 0 ? 132 : 96 }} />
      ))}
    </View>
  );
}

export function PlanCatalogSkeleton() {
  return (
    <View style={styles.screen}>
      <SkeletonLine width="54%" height={28} />
      <SkeletonLine width="78%" />
      {Array.from({ length: 4 }).map((_, index) => (
        <View key={index} style={styles.planCard}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1, gap: Spacing.sm }}>
              <SkeletonLine width="52%" height={22} />
              <SkeletonLine width="36%" height={32} />
            </View>
            <Shimmer width={74} height={28} borderRadius={Radius.full} />
          </View>
          <SkeletonLine width="82%" />
          <SkeletonLine width="64%" />
          <View style={styles.row}>
            <Shimmer width={78} height={30} borderRadius={Radius.full} />
            <Shimmer width={78} height={30} borderRadius={Radius.full} />
            <Shimmer width={78} height={30} borderRadius={Radius.full} />
          </View>
        </View>
      ))}
    </View>
  );
}

export function UsageAnalyticsSkeleton() {
  return (
    <View style={styles.screen}>
      <SkeletonLine width="52%" height={26} />
      <SkeletonLine width="34%" />
      <View style={styles.usageTop}>
        <Shimmer style={styles.usageRadial} height={190} borderRadius={Radius.lg} />
        <View style={styles.usageStats}>
          <Shimmer height={86} borderRadius={Radius.lg} />
          <Shimmer height={86} borderRadius={Radius.lg} />
        </View>
      </View>
      <Shimmer height={230} borderRadius={Radius.lg} />
      <Shimmer height={230} borderRadius={Radius.lg} />
      <SkeletonCard style={{ minHeight: 84 }} />
    </View>
  );
}

export function SubscriptionSkeleton() {
  return (
    <View style={styles.screen}>
      <SkeletonLine width="42%" height={26} />
      <SkeletonLine width="34%" />
      <SkeletonCard style={{ minHeight: 260 }} />
      <SkeletonCard style={{ minHeight: 86 }} />
      <View style={styles.row}>
        <Shimmer style={styles.flexItem} height={48} borderRadius={Radius.md} />
        <Shimmer style={styles.flexItem} height={48} borderRadius={Radius.md} />
      </View>
      <SkeletonLine width="38%" />
      <SkeletonCard style={{ minHeight: 76 }} />
      <SkeletonCard style={{ minHeight: 76 }} />
    </View>
  );
}

export function RouterSkeleton() {
  return (
    <View style={styles.screen}>
      <SkeletonLine width="32%" height={26} />
      <SkeletonLine width="48%" />
      <SkeletonCard style={{ minHeight: 92 }} />
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonCard key={index} style={{ minHeight: 78 }} />
      ))}
    </View>
  );
}

export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <View style={styles.screen}>
      <SkeletonLine width="48%" height={26} />
      <SkeletonLine width="38%" />
      {Array.from({ length: rows }).map((_, index) => (
        <SkeletonCard key={index} style={{ minHeight: 82 }} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: ExtranetColors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: ExtranetColors.borderLight,
    ...Shadows.sm,
  },
  row: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.sm },
  dashboard: { gap: Spacing.sm },
  screen: { gap: Spacing.md },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  gridItem: { width: '47%', flexGrow: 1 },
  planCard: {
    backgroundColor: ExtranetColors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    gap: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: ExtranetColors.borderLight,
    ...Shadows.sm,
  },
  usageTop: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.md },
  usageRadial: { flex: 1.1 },
  usageStats: { flex: 1, gap: Spacing.md },
  flexItem: { flex: 1 },
});
