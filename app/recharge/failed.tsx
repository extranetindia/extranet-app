import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/button';
import { SafeScreen } from '@/components/ui/safe-screen';
import { AppHeading, AppText } from '@/components/ui/typography';
import { useAppFeatures } from '@/context/app-features-context';
import { Routes } from '@/constants/routes';
import { Brand, ExtranetColors, Spacing } from '@/constants/extranet-theme';

export default function PaymentFailedScreen() {
  const { lastTransaction, totalPayable } = useAppFeatures();

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="close-circle" size={80} color={Brand.red} />
        </View>
        <AppHeading level={1} tone="default" align="center">
          Payment failed
        </AppHeading>
        <AppText variant="body" tone="secondary" align="center" style={styles.sub}>
          We couldn&apos;t process ₹{totalPayable}. No amount was debited. Please try again or use
          another method.
        </AppText>
        {lastTransaction && (
          <AppText variant="caption" tone="muted" align="center">
            Ref: {lastTransaction.txnRef}
          </AppText>
        )}
        <AppButton label="Retry payment" onPress={() => router.replace(Routes.rechargePayment)} />
        <AppButton
          label="Change payment method"
          variant="secondary"
          onPress={() => router.replace(Routes.rechargePayment)}
        />
        <AppButton label="Back to home" variant="ghost" onPress={() => router.replace(Routes.tabs)} />
      </View>
    </SafeScreen>
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
  sub: { paddingHorizontal: Spacing.lg },
});
