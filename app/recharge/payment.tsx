import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { PaymentMethodPicker } from '@/components/recharge/payment-method-picker';
import { AppButton } from '@/components/ui/button';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { AppText } from '@/components/ui/typography';
import { useAppFeatures } from '@/context/app-features-context';
import { MOCK_PAYMENT_METHODS } from '@/data/mock-recharge';
import { Routes } from '@/constants/routes';
import { Brand, ExtranetColors, Spacing } from '@/constants/extranet-theme';

export default function RechargePaymentScreen() {
  const { totalPayable, selectedPaymentId, setPaymentMethod, processPayment } = useAppFeatures();
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    const { success } = await processPayment();
    setLoading(false);
    router.replace(success ? Routes.rechargeSuccess : Routes.rechargeFailed);
  };

  return (
    <>
    <LoadingOverlay visible={loading} message="Processing secure payment…" />
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScreenScroll bottomInset={120}>
        <ScreenHeader title="Payment" subtitle="Select payment method" />
        <AppText variant="label" tone="muted" style={styles.section}>
          PAYMENT METHOD
        </AppText>
        <PaymentMethodPicker
          methods={MOCK_PAYMENT_METHODS}
          selectedId={selectedPaymentId}
          onSelect={setPaymentMethod}
        />
        <AppText variant="caption" tone="muted" style={styles.secure}>
          🔒 Secured with 256-bit encryption (mock UI)
        </AppText>
      </ScreenScroll>
      <View style={styles.footer}>
        <AppButton
          label={`Pay ₹${totalPayable}`}
          loading={loading}
          onPress={handlePay}
        />
      </View>
    </SafeScreen>
    </>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: Spacing.lg },
  secure: { textAlign: 'center', marginTop: Spacing.xxl },
  footer: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
    backgroundColor: ExtranetColors.surface,
    borderTopWidth: 1,
    borderTopColor: ExtranetColors.borderLight,
  },
});
