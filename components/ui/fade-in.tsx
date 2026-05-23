import { useEffect } from 'react';
import { type ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type FadeInProps = ViewProps & {
  children: React.ReactNode;
  /** Stagger index — multiplies delay */
  index?: number;
  delay?: number;
  slide?: number;
};

export function FadeIn({
  children,
  index = 0,
  delay = 0,
  slide = 14,
  style,
  ...rest
}: FadeInProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(slide);

  useEffect(() => {
    const d = delay + index * 70;
    opacity.value = withDelay(d, withTiming(1, { duration: 380 }));
    translateY.value = withDelay(d, withSpring(0, { damping: 20, stiffness: 200 }));
  }, [delay, index, opacity, slide, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]} {...rest}>
      {children}
    </Animated.View>
  );
}
