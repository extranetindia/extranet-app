import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { AppButton } from '@/components/ui/button';
import { AppInput } from '@/components/ui/input';
import { SafeScreen } from '@/components/ui/safe-screen';
import { StickyFooter } from '@/components/ui/sticky-footer';
import { AppHeading, AppText } from '@/components/ui/typography';
import { useOnboarding } from '@/context/onboarding-context';
import {
  checkAvailability,
  getCityForPincode,
  MOCK_DETECTED_LOCATION,
} from '@/data/mock-availability';
import { Brand, ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

export default function AvailabilityScreen() {
  const { form, updateForm } = useOnboarding();
  const [pincode, setPincode] = useState(form.pincode);
  const [society, setSociety] = useState(form.society);
  const [detecting, setDetecting] = useState(false);
  const [checking, setChecking] = useState(false);
  const [pincodeError, setPincodeError] = useState('');

  const handleDetectLocation = async () => {
    setDetecting(true);
    await new Promise((r) => setTimeout(r, 1200));
    const loc = MOCK_DETECTED_LOCATION;
    setPincode(loc.pincode);
    setSociety(loc.society);
    updateForm({
      pincode: loc.pincode,
      society: loc.society,
      areaLabel: loc.areaLabel,
      city: loc.city,
      detectedLocation: true,
    });
    setDetecting(false);
    setPincodeError('');
  };

  const handleCheckAvailability = async () => {
    const trimmed = pincode.replace(/\s/g, '');
    if (trimmed.length !== 6 || !/^\d{6}$/.test(trimmed)) {
      setPincodeError('Enter a valid 6-digit pincode');
      return;
    }
    setPincodeError('');
    setChecking(true);

    const city = form.city || getCityForPincode(trimmed);
    const areaLabel = form.areaLabel || `${trimmed} area`;

    updateForm({
      pincode: trimmed,
      society: society.trim(),
      city,
      areaLabel: form.detectedLocation ? form.areaLabel : areaLabel,
    });

    await new Promise((r) => setTimeout(r, 800));

    const result = checkAvailability(trimmed);
    setChecking(false);

    if (result === 'available') {
      router.push('/area-available');
    } else {
      router.push('/area-unavailable');
    }
  };

  return (
    <SafeScreen edges={['top']} tone="light">
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.back()} style={styles.back} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color={ExtranetColors.text} />
          </Pressable>

          <AppHeading level={1} tone="default" style={styles.title}>
            Check availability
          </AppHeading>
          <AppText variant="body" tone="secondary" style={styles.subtitle}>
            Tell us where you live so we can confirm fiber coverage at your doorstep.
          </AppText>

          <Pressable
            onPress={handleDetectLocation}
            disabled={detecting}
            style={({ pressed }) => [
              styles.detectBtn,
              pressed && styles.detectPressed,
              detecting && styles.detectDisabled,
            ]}>
            {detecting ? (
              <ActivityIndicator color={Brand.primary} />
            ) : (
              <>
                <View style={styles.detectIcon}>
                  <Ionicons name="locate" size={22} color={Brand.primary} />
                </View>
                <View style={styles.detectText}>
                  <AppText variant="bodyMedium" tone="default">
                    Use current location
                  </AppText>
                  <AppText variant="caption" tone="muted">
                    Auto-fill pincode & society (mock)
                  </AppText>
                </View>
                <Ionicons name="chevron-forward" size={20} color={ExtranetColors.textMuted} />
              </>
            )}
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <AppText variant="label" tone="muted">
              OR ENTER MANUALLY
            </AppText>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.form}>
            <AppInput
              label="Pincode"
              placeholder="e.g. 560034"
              value={pincode}
              onChangeText={(t) => {
                setPincode(t.replace(/\D/g, '').slice(0, 6));
                setPincodeError('');
              }}
              keyboardType="number-pad"
              maxLength={6}
              leftIcon="mail-outline"
              hint="Try 560034 (available) or 201301 (unavailable)"
              error={pincodeError}
            />
            <AppInput
              label="Apartment / Society name"
              placeholder="e.g. Prestige Lakeside Habitat"
              value={society}
              onChangeText={setSociety}
              leftIcon="business-outline"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.hintCard}>
            <Ionicons name="information-circle-outline" size={18} color={Brand.primary} />
            <AppText variant="small" tone="secondary" style={styles.hintText}>
              We use this only to check coverage. No spam, no calls until you choose a plan.
            </AppText>
          </View>
        </ScrollView>

        <StickyFooter>
          <AppButton
            label="Check availability"
            icon="search"
            iconPosition="left"
            loading={checking}
            onPress={handleCheckAvailability}
          />
        </StickyFooter>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: {
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.lg,
    paddingBottom: 140,
  },
  back: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: ExtranetColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
    borderWidth: 1,
    borderColor: ExtranetColors.borderLight,
    ...Shadows.sm,
  },
  title: { marginBottom: Spacing.sm },
  subtitle: { marginBottom: Spacing.xxl },
  detectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: ExtranetColors.surface,
    borderWidth: 1.5,
    borderColor: Brand.primary,
    marginBottom: Spacing.xxl,
    ...Shadows.card,
  },
  detectPressed: { opacity: 0.92 },
  detectDisabled: { opacity: 0.7 },
  detectIcon: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: ExtranetColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detectText: { flex: 1, gap: 2 },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: ExtranetColors.border,
  },
  form: { gap: Spacing.xxl },
  hintCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    marginTop: Spacing.xxl,
    padding: Spacing.lg,
    borderRadius: Radius.md,
    backgroundColor: ExtranetColors.primaryMuted,
    borderWidth: 1,
    borderColor: 'rgba(11, 78, 162, 0.12)',
  },
  hintText: { flex: 1 },
});
