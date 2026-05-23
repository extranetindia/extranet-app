import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { BillingBreakdown } from '@/components/recharge/billing-breakdown';
import { AppButton } from '@/components/ui/button';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { AppText } from '@/components/ui/typography';
import { useAppFeatures } from '@/context/app-features-context';
import { Routes } from '@/constants/routes';
import { Brand, ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

export default function RechargeBillingScreen() {
  const {
    billingLines,
    totalPayable,
    couponCode,
    setCouponCode,
    applyCoupon,
    appliedCoupon,
    clearCoupon,
  } = useAppFeatures();

  const handleApply = () => {
    const result = applyCoupon();
    if (!result.success) Alert.alert('Invalid coupon', result.message);
    else Alert.alert('Coupon applied', result.message);
  };

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScreenScroll bottomInset={100}>
        <ScreenHeader title="Bill summary" subtitle="Taxes & discounts" />
        <BillingBreakdown lines={billingLines} />
        <View style={styles.coupon}>
          <AppText variant="label" tone="muted" style={styles.couponLabel}>
            PROMO CODE
          </AppText>
          <View style={styles.couponRow}>
            <TextInput
              style={styles.input}
              placeholder="e.g. EXTRANET50"
              placeholderTextColor={ExtranetColors.textMuted}
              value={couponCode}
              onChangeText={setCouponCode}
              autoCapitalize="characters"
            />
            <Pressable onPress={handleApply} style={styles.applyBtn}>
              <AppText variant="small" color={Brand.white} style={styles.applyText}>
                Apply
              </AppText>
            </Pressable>
          </View>
          {appliedCoupon && (
            <Pressable onPress={clearCoupon}>
              <AppText variant="caption" color={Brand.red}>
                Remove {appliedCoupon.code}
              </AppText>
            </Pressable>
          )}
          <AppText variant="caption" tone="muted">
            Try EXTRANET50 or FIBER10
          </AppText>
        </View>
      </ScreenScroll>
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <AppText variant="bodyMedium" tone="default">
            Payable amount
          </AppText>
          <AppText variant="h2" color={Brand.primary}>
            ₹{totalPayable}
          </AppText>
        </View>
        <AppButton label="Proceed to pay" onPress={() => router.push(Routes.rechargePayment)} />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  coupon: { marginTop: Spacing.xxl, gap: Spacing.sm },
  couponLabel: { marginLeft: Spacing.xs },
  couponRow: { flexDirection: 'row', gap: Spacing.md },
  input: {
    flex: 1,
    height: 48,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: ExtranetColors.border,
    backgroundColor: ExtranetColors.surface,
    paddingHorizontal: Spacing.lg,
    fontSize: 16,
    color: ExtranetColors.text,
    ...Shadows.sm,
  },
  applyBtn: {
    backgroundColor: Brand.primary,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.md,
    justifyContent: 'center',
    ...Shadows.sm,
  },
  applyText: { fontWeight: '600' },
  footer: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
    gap: Spacing.lg,
    backgroundColor: ExtranetColors.surface,
    borderTopWidth: 1,
    borderTopColor: ExtranetColors.borderLight,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.lg,
  },
});
