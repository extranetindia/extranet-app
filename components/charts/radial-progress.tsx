import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { AppText } from '@/components/ui/typography';
import { Brand, ExtranetColors, Spacing } from '@/constants/extranet-theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RadialProgressProps = {
  value: number;
  max?: number;
  size?: number;
  stroke?: number;
  label: string;
  sublabel?: string;
  color?: string;
};

export function RadialProgress({
  value,
  max = 100,
  size = 128,
  stroke = 10,
  label,
  sublabel,
  color = Brand.primary,
}: RadialProgressProps) {
  const progress = useSharedValue(0);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);

  useEffect(() => {
    progress.value = withTiming(pct, { duration: 900 });
  }, [pct, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ExtranetColors.borderLight}
          strokeWidth={stroke}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.center}>
        <AppText variant="h2" color={color}>
          {Math.round(value)}
        </AppText>
        <AppText variant="caption" tone="muted">
          {label}
        </AppText>
        {sublabel ? (
          <AppText variant="caption" tone="muted" style={styles.sub}>
            {sublabel}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  svg: { position: 'absolute' },
  center: { alignItems: 'center', gap: 0 },
  sub: { fontSize: 10 },
});
