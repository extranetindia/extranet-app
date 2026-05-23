import { useEffect } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { ExtranetColors } from '@/constants/extranet-theme';

type ShimmerProps = {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
};

export function Shimmer({ width = '100%', height = 16, borderRadius = 8, style }: ShimmerProps) {
  const translateX = useSharedValue(-1);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      -1,
      false,
    );
  }, [translateX]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value * 120 }],
    opacity: 0.35 + Math.abs(translateX.value) * 0.25,
  }));

  return (
    <View
      style={[
        styles.base,
        { width, height, borderRadius },
        style,
      ]}>
      <Animated.View style={[styles.highlight, shimmerStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: ExtranetColors.backgroundMuted,
    overflow: 'hidden',
  },
  highlight: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: ExtranetColors.surface,
  },
});
