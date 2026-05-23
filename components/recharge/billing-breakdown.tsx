import { StyleSheet, View } from 'react-native';

import { AppCard } from '@/components/ui/card';
import { AppText } from '@/components/ui/typography';
import type { BillingLine } from '@/data/mock-recharge';
import { Brand, ExtranetColors, Spacing } from '@/constants/extranet-theme';

type BillingBreakdownProps = {
  lines: BillingLine[];
};

export function BillingBreakdown({ lines }: BillingBreakdownProps) {
  return (
    <AppCard variant="elevated" style={styles.card}>
      <AppText variant="label" tone="muted" style={styles.title}>
        BILLING BREAKDOWN
      </AppText>
      {lines.map((line) => {
        const isTotal = line.id === 'total';
        const isDiscount = line.type === 'discount';
        return (
          <View
            key={line.id}
            style={[styles.row, isTotal && styles.totalRow]}>
            <AppText
              variant={isTotal ? 'bodyMedium' : 'small'}
              tone={isTotal ? 'default' : 'secondary'}>
              {line.label}
            </AppText>
            <AppText
              variant={isTotal ? 'h3' : 'bodyMedium'}
              color={
                isDiscount
                  ? ExtranetColors.success
                  : isTotal
                    ? Brand.primary
                    : ExtranetColors.text
              }>
              {isDiscount ? '−' : ''}₹{Math.abs(line.amount)}
            </AppText>
          </View>
        );
      })}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: { gap: Spacing.md },
  title: { marginBottom: Spacing.xs },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: ExtranetColors.borderLight,
  },
  totalRow: {
    borderBottomWidth: 0,
    paddingTop: Spacing.md,
    marginTop: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: ExtranetColors.border,
  },
});
