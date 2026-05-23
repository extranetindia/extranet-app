import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Brand, Radius, Spacing } from '@/constants/extranet-theme';

export function SplashLoader() {
  const progress = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 2200, easing: Easing.out(Easing.cubic) });
    pulse.value = withRepeat(
      withSequence(withTiming(1.08, { duration: 500 }), withTiming(1, { duration: 500 })),
      -1,
      true,
    );
  }, [progress, pulse]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (
    <View style={styles.wrapper}>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, barStyle]} />
      </View>
      <View style={styles.dots}>
        {[Brand.accent, Brand.red, Brand.primary].map((color, i) => (
          <Animated.View key={i} style={[styles.dot, { backgroundColor: color }, dotStyle]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '72%',
    maxWidth: 260,
    alignItems: 'center',
    gap: Spacing.xl,
    marginTop: Spacing.massive,
  },
  track: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Brand.accent,
    borderRadius: Radius.full,
  },
  dots: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
