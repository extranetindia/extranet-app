import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { AppText } from '@/components/ui/typography';
import { useCustomer } from '@/context/customer-context';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

type LiveSpeedMeterProps = { onDark?: boolean };

export function LiveSpeedMeter({ onDark = false }: LiveSpeedMeterProps) {
  const { speed, connectionStatus } = useCustomer();
  const [displaySpeed, setDisplaySpeed] = useState(speed.download);
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(withTiming(1.15, { duration: 800 }), withTiming(1, { duration: 800 })),
      -1,
      true,
    );
  }, [pulse]);

  useEffect(() => {
    if (connectionStatus !== 'online') return;
    const interval = setInterval(() => {
      const jitter = Math.floor(speed.download + (Math.random() * 12 - 6));
      setDisplaySpeed(Math.max(0, jitter));
    }, 2200);
    return () => clearInterval(interval);
  }, [connectionStatus, speed.download]);

  useEffect(() => {
    setDisplaySpeed(speed.download);
  }, [speed.download]);

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: 0.5 + pulse.value * 0.25,
  }));

  const isLive = connectionStatus === 'online';

  return (
    <View style={styles.wrap}>
      <View style={styles.labelRow}>
        <Animated.View style={[styles.liveDot, dotStyle, !isLive && styles.dotOff]} />
        <AppText variant="label" color={onDark ? 'rgba(255,255,255,0.7)' : undefined} tone={onDark ? undefined : 'muted'}>
          LIVE SPEED
        </AppText>
      </View>
      <View style={styles.speedRow}>
        <AppText
          variant="hero"
          color={
            isLive
              ? onDark
                ? Brand.white
                : Brand.primary
              : ExtranetColors.textMuted
          }>
          {isLive ? displaySpeed : '—'}
        </AppText>
        <AppText variant="bodyMedium" color={onDark ? 'rgba(255,255,255,0.85)' : undefined} tone={onDark ? undefined : 'secondary'}>
          Mbps
        </AppText>
      </View>
      <View style={styles.meterTrack}>
        <View
          style={[
            styles.meterFill,
            {
              width: `${Math.min((displaySpeed / 350) * 100, 100)}%`,
              backgroundColor: isLive ? Brand.accent : ExtranetColors.border,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: Spacing.xs },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ExtranetColors.success,
  },
  dotOff: { backgroundColor: ExtranetColors.textMuted },
  speedRow: { flexDirection: 'row', alignItems: 'baseline', gap: Spacing.sm },
  meterTrack: {
    height: 4,
    borderRadius: Radius.full,
    backgroundColor: ExtranetColors.backgroundMuted,
    overflow: 'hidden',
    marginTop: Spacing.xs,
  },
  meterFill: { height: '100%', borderRadius: Radius.full },
});
