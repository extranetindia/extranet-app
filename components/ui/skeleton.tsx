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
});
