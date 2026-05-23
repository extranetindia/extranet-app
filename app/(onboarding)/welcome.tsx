import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { WelcomeIllustration } from '@/components/onboarding/welcome-illustration';
import { AppButton } from '@/components/ui/button';
import { SafeScreen } from '@/components/ui/safe-screen';
import { AppHeading, AppText } from '@/components/ui/typography';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

export default function WelcomeScreen() {
  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <WelcomeIllustration />
        <View style={styles.copy}>
          <AppHeading level="hero" tone="default" align="center">
            Fast Internet for Modern Homes
          </AppHeading>
          <AppText variant="body" tone="secondary" align="center" style={styles.subheadline}>
            Enterprise-grade fiber with transparent pricing. Check if Extranet is live in your
            society in under a minute.
          </AppText>
        </View>
        <View style={styles.features}>
          {['No installation charges', 'Same-day activation', 'Unlimited data'].map((item) => (
            <View key={item} style={styles.chip}>
              <AppText variant="small" color={Brand.primary} style={styles.chipText}>
                ✓ {item}
              </AppText>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.cta}>
        <AppButton
          label="Check availability"
          icon="arrow-forward"
          onPress={() => router.push('/availability')}
        />
        <AppText variant="caption" tone="muted" align="center" style={styles.legal}>
          By continuing, you agree to our Terms & Privacy Policy
        </AppText>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.lg,
  },
  copy: { gap: Spacing.lg, marginBottom: Spacing.xxl },
  subheadline: { paddingHorizontal: Spacing.sm },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    backgroundColor: ExtranetColors.primaryMuted,
    borderWidth: 1,
    borderColor: 'rgba(11, 78, 162, 0.15)',
  },
  chipText: { fontWeight: '500' },
  cta: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
    backgroundColor: ExtranetColors.background,
  },
  legal: { marginTop: Spacing.xs },
});
