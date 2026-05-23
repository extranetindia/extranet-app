import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/button';
import { AppCard } from '@/components/ui/card';
import { SafeScreen } from '@/components/ui/safe-screen';
import { AppHeading, AppText } from '@/components/ui/typography';
import { useAppFeatures } from '@/context/app-features-context';
import { Routes } from '@/constants/routes';
import { ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

export default function PaymentSuccessScreen() {
  const { lastTransaction } = useAppFeatures();
  const txn = lastTransaction!;

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="checkmark-circle" size={80} color={ExtranetColors.success} />
        </View>
        <AppHeading level={1} tone="default" align="center">
          Payment successful
        </AppHeading>
        <AppText variant="body" tone="secondary" align="center" style={styles.sub}>
          Your plan has been renewed. A receipt has been sent to your registered email.
        </AppText>
        <AppCard variant="elevated" style={styles.card}>
          <Row label="Amount" value={`₹${txn.amount}`} highlight />
          <Row label="Transaction ID" value={txn.txnRef} />
          <Row label="Payment via" value={txn.paymentMethod} />
          <Row label="Date" value={`${txn.date} · ${txn.time}`} />
        </AppCard>
        <AppButton label="View receipt" onPress={() => router.replace(Routes.rechargeReceipt)} />
        <AppButton label="Back to home" variant="ghost" onPress={() => router.replace(Routes.tabs)} />
      </View>
    </SafeScreen>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={styles.row}>
      <AppText variant="small" tone="muted">
        {label}
      </AppText>
      <AppText variant={highlight ? 'h3' : 'bodyMedium'} tone="default">
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  iconWrap: { alignItems: 'center', marginBottom: Spacing.md },
  sub: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.lg },
  card: { gap: Spacing.md },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: ExtranetColors.borderLight,
  },
});
