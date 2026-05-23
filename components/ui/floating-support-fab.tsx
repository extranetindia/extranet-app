import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Routes } from '@/constants/routes';
import { Brand, Gradients, Shadows, Spacing } from '@/constants/extranet-theme';
import { useEffect } from 'react';

export function FloatingSupportFab() {
  const insets = useSafeAreaInsets();
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withDelay(
      800,
      withRepeat(
        withSequence(
          withTiming(1.06, { duration: 900 }),
          withTiming(1, { duration: 900 }),
        ),
        -1,
        true,
      ),
    );
  }, [pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.wrap,
        { bottom: Math.max(insets.bottom, Spacing.lg) + 72 },
        pulseStyle,
      ]}>
      <PressableScale
        onPress={() => router.push(Routes.supportTickets)}
        scale={0.92}
        style={styles.btn}>
        <LinearGradient
          colors={[...Gradients.primaryButton]}
          style={styles.gradient}>
          <Ionicons name="headset" size={26} color={Brand.white} />
        </LinearGradient>
      </PressableScale>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: Spacing.xxl,
    zIndex: 100,
  },
  btn: {
    borderRadius: 28,
    ...Shadows.button,
  },
  gradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
