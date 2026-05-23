import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Share, StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/button';
import { AppCard } from '@/components/ui/card';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { AppText } from '@/components/ui/typography';
import { useAppFeatures } from '@/context/app-features-context';
import { Routes } from '@/constants/routes';
import { Brand, ExtranetColors, Spacing } from '@/constants/extranet-theme';

export default function ReceiptScreen() {
  const { lastTransaction } = useAppFeatures();
  const txn = lastTransaction!;

  const handleShare = () => {
    Share.share({
      message: `Extranet Payment Receipt\nTxn: ${txn.txnRef}\nAmount: ₹${txn.amount}\n${txn.date}`,
    });
  };

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScreenScroll>
        <ScreenHeader title="Receipt" subtitle={txn.id} />
        <AppCard variant="elevated" style={styles.receipt}>
          <View style={styles.brandRow}>
            <Ionicons name="wifi" size={28} color={Brand.primary} />
            <AppText variant="h3" color={Brand.primary}>
              Extranet
            </AppText>
          </View>
          <AppText variant="label" tone="muted">
            PAYMENT RECEIPT
          </AppText>
          <View style={styles.divider} />
          <ReceiptRow label="Plan" value={txn.planName} />
          <ReceiptRow label="Amount paid" value={`₹${txn.amount}`} bold />
          <ReceiptRow label="Status" value="SUCCESS" />
          <ReceiptRow label="Transaction ref" value={txn.txnRef} />
          <ReceiptRow label="Payment method" value={txn.paymentMethod} />
          <ReceiptRow label="Date & time" value={`${txn.date}, ${txn.time}`} />
          <View style={styles.divider} />
          <AppText variant="caption" tone="muted" align="center">
            This is a computer-generated receipt. No signature required.
          </AppText>
        </AppCard>
        <AppButton label="Share receipt" icon="share-outline" iconPosition="left" onPress={handleShare} />
        <AppButton label="Done" variant="ghost" onPress={() => router.replace(Routes.tabs)} />
      </ScreenScroll>
    </SafeScreen>
  );
}

function ReceiptRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <View style={styles.row}>
      <AppText variant="small" tone="muted">
        {label}
      </AppText>
      <AppText variant={bold ? 'h3' : 'bodyMedium'} tone="default">
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  receipt: { gap: Spacing.md, marginBottom: Spacing.xxl },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  divider: { height: 1, backgroundColor: ExtranetColors.borderLight, marginVertical: Spacing.md },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
});
