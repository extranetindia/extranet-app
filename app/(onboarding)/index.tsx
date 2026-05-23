import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { ExtranetLogo } from '@/components/onboarding/extranet-logo';
import { SplashLoader } from '@/components/onboarding/splash-loader';
import { SafeScreen } from '@/components/ui/safe-screen';
import { AppText } from '@/components/ui/typography';
import { ExtranetColors, Spacing } from '@/constants/extranet-theme';

const SPLASH_DURATION_MS = 2800;

export default function SplashScreen() {
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.88);

  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) });
    logoScale.value = withDelay(
      100,
      withTiming(1, { duration: 900, easing: Easing.out(Easing.back(1.1)) }),
    );
    const timer = setTimeout(() => router.replace('/welcome'), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [logoOpacity, logoScale]);

  const logoAnimStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  return (
    <SafeScreen edges={['top', 'bottom']} tone="splash" glowAccents>
      <View style={styles.content}>
        <Animated.View style={logoAnimStyle}>
          <ExtranetLogo size="lg" inverse />
        </Animated.View>
        <SplashLoader />
        <AppText
          variant="caption"
          tone="inverse"
          screen="splash"
          align="center"
          style={styles.footer}>
          Enterprise fiber for modern homes
        </AppText>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  footer: {
    position: 'absolute',
    bottom: Spacing.massive,
    letterSpacing: 0.3,
    opacity: 0.85,
  },
});
