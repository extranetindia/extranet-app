import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BenefitsList } from '@/components/onboarding/benefits-list';
import { LocationSummaryCard } from '@/components/onboarding/location-summary-card';
import { AppButton } from '@/components/ui/button';
import { SafeScreen } from '@/components/ui/safe-screen';
import { AppHeading, AppText } from '@/components/ui/typography';
import { useOnboarding } from '@/context/onboarding-context';
import { ExtranetColors, Spacing } from '@/constants/extranet-theme';

export default function AreaAvailableScreen() {
  const { form } = useOnboarding();

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.successBadge}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={56} color={ExtranetColors.success} />
          </View>
        </View>

        <AppHeading level={2} tone="default" align="center">
          Great news! Extranet is available in your area
        </AppHeading>
        <AppText variant="body" tone="secondary" align="center" style={styles.message}>
          You&apos;re one step away from enterprise-grade fiber at home.
        </AppText>

        <LocationSummaryCard
          location={{
            pincode: form.pincode,
            society: form.society,
            areaLabel: form.areaLabel,
            city: form.city,
          }}
        />

        <AppText variant="label" tone="muted" style={styles.sectionLabel}>
          WHAT YOU GET
        </AppText>
        <BenefitsList />
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          label="Continue to plans"
          icon="arrow-forward"
          onPress={() => router.replace('/(tabs)')}
        />
        <AppButton label="Change location" variant="ghost" onPress={() => router.back()} />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.lg,
    gap: Spacing.xxl,
  },
  successBadge: { alignItems: 'center', marginBottom: Spacing.sm },
  successIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: ExtranetColors.successBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: ExtranetColors.successBorder,
  },
  message: { marginTop: -Spacing.md, paddingHorizontal: Spacing.md },
  sectionLabel: { marginTop: Spacing.sm },
  footer: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
    gap: Spacing.sm,
    backgroundColor: ExtranetColors.background,
  },
});
