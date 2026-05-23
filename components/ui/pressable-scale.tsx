import * as Haptics from 'expo-haptics';
import { Pressable, type PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type PressableScaleProps = PressableProps & {
  children: React.ReactNode;
  scale?: number;
  haptic?: boolean;
};

export function PressableScale({
  children,
  scale = 0.97,
  haptic = true,
  disabled,
  onPressIn,
  onPressOut,
  style,
  ...rest
}: PressableScaleProps) {
  const pressed = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressed.value }],
  }));

  return (
    <AnimatedPressable
      disabled={disabled}
      onPressIn={(e) => {
        if (!disabled) {
          pressed.value = withSpring(scale, { damping: 15, stiffness: 300 });
          if (haptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        pressed.value = withSpring(1, { damping: 15, stiffness: 300 });
        onPressOut?.(e);
      }}
      style={[animatedStyle, style]}
      {...rest}>
      {children}
    </AnimatedPressable>
  );
}
