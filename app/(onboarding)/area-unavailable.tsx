import { router } from 'expo-router';
import { Alert, Linking, ScrollView, StyleSheet, View } from 'react-native';

import { LocationSummaryCard } from '@/components/onboarding/location-summary-card';
import { UnavailableIllustration } from '@/components/onboarding/unavailable-illustration';
import { AppButton } from '@/components/ui/button';
import { SafeScreen } from '@/components/ui/safe-screen';
import { AppHeading, AppText } from '@/components/ui/typography';
import { useOnboarding } from '@/context/onboarding-context';
import { SUPPORT_EMAIL, SUPPORT_PHONE } from '@/data/mock-availability';
import { ExtranetColors, Spacing } from '@/constants/extranet-theme';

export default function AreaUnavailableScreen() {
  const { form, notifyRequested, setNotifyRequested } = useOnboarding();

  const handleNotify = () => {
    setNotifyRequested(true);
    Alert.alert(
      "You're on the list!",
      `We'll notify you when Extranet launches in ${form.pincode}. (Mock — no real signup.)`,
      [{ text: 'OK' }],
    );
  };

  const handleSupport = () => {
    Alert.alert('Contact support', 'Choose how to reach us (mock)', [
      { text: 'Call', onPress: () => Linking.openURL(`tel:${SUPPORT_PHONE}`) },
      { text: 'Email', onPress: () => Linking.openURL(`mailto:${SUPPORT_EMAIL}`) },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <UnavailableIllustration />
        <AppHeading level={1} tone="default" align="center">
          We&apos;re not available in your area yet
        </AppHeading>
        <AppText variant="body" tone="secondary" align="center" style={styles.message}>
          We&apos;re expanding fast. Join the waitlist and be first to know when fiber goes live near
          you.
        </AppText>
        <LocationSummaryCard
          location={{
            pincode: form.pincode,
            society: form.society,
            areaLabel: form.areaLabel || `Pincode ${form.pincode}`,
            city: form.city,
          }}
        />
        <View style={styles.expansion}>
          <AppText variant="small" tone="secondary" align="center">
            12 new societies added this month in {form.city || 'your city'}
          </AppText>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <AppButton
          label={notifyRequested ? "You'll be notified" : 'Notify me when available'}
          icon="notifications-outline"
          iconPosition="left"
          onPress={handleNotify}
          disabled={notifyRequested}
        />
        <AppButton
          label="Contact support"
          variant="secondary"
          icon="headset-outline"
          iconPosition="left"
          onPress={handleSupport}
        />
        <AppButton label="Try another pincode" variant="ghost" onPress={() => router.back()} />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.lg,
    gap: Spacing.xxl,
  },
  message: { paddingHorizontal: Spacing.md, marginTop: -Spacing.md },
  expansion: { paddingVertical: Spacing.md },
  footer: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
    backgroundColor: ExtranetColors.background,
  },
});
