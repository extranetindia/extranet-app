import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Badge } from '@/components/ui/badge';
import { AppCard } from '@/components/ui/card';
import { PressableScale } from '@/components/ui/pressable-scale';
import { AppText } from '@/components/ui/typography';
import { useCustomer } from '@/context/customer-context';
import { ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

export function ConnectionStatus() {
  const { connectionStatus, routerRestarting, speed } = useCustomer();
  const isOnline = connectionStatus === 'online' && !routerRestarting;
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (isOnline) {
      pulse.value = withRepeat(
        withSequence(withTiming(1.35, { duration: 700 }), withTiming(1, { duration: 700 })),
        -1,
        true,
      );
    } else {
      pulse.value = 1;
    }
  }, [isOnline, pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: isOnline ? 0.7 + pulse.value * 0.15 : 1,
  }));

  return (
    <PressableScale disabled haptic={false}>
      <AppCard variant="elevated" style={styles.card}>
        <View style={[styles.iconWrap, isOnline ? styles.iconOnline : styles.iconOffline]}>
          {isOnline && <Animated.View style={[styles.pulseRing, pulseStyle]} />}
          <Ionicons
            name={isOnline ? 'wifi' : 'wifi-outline'}
            size={22}
            color={isOnline ? ExtranetColors.success : ExtranetColors.error}
          />
        </View>
        <View style={styles.content}>
          <AppText variant="bodyMedium" tone="default">
            {routerRestarting
              ? 'Restarting your ONU…'
              : isOnline
                ? 'Fiber link active'
                : 'Service interrupted'}
          </AppText>
          <AppText variant="caption" tone="muted">
            {routerRestarting
              ? 'Usually back online in ~30 seconds'
              : isOnline
                ? `${speed.download} Mbps ↓ · ${speed.upload} Mbps ↑ · ${speed.ping} ms latency`
                : 'Check power adapter and fiber cable'}
          </AppText>
        </View>
        <Badge
          label={routerRestarting ? 'RESTARTING' : isOnline ? 'ONLINE' : 'OFFLINE'}
          variant={isOnline ? 'online' : 'offline'}
        />
      </AppCard>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: ExtranetColors.success,
  },
  iconOnline: { backgroundColor: ExtranetColors.successBg },
  iconOffline: { backgroundColor: ExtranetColors.errorBg },
  content: { flex: 1, gap: 2 },
});
