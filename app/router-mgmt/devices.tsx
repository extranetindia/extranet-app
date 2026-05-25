import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppCard } from '@/components/ui/card';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { ListSkeleton } from '@/components/ui/skeleton';
import { AppText } from '@/components/ui/typography';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';
import { useAppFeatures } from '@/context/app-features-context';
import { useScreenBootstrap } from '@/hooks/use-screen-bootstrap';

const SIGNAL_COLOR = {
  excellent: ExtranetColors.success,
  good: Brand.accent,
  fair: ExtranetColors.warning,
};

export default function RouterDevicesScreen() {
  const { routerDevices } = useAppFeatures();
  const { ready, showLoader } = useScreenBootstrap(360);
  const showSkeleton = showLoader && !ready && routerDevices.length === 0;

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScreenScroll>
        {showSkeleton ? (
          <ListSkeleton rows={5} />
        ) : (
          <>
            <ScreenHeader title="Connected devices" subtitle="Live on your network" />
            {routerDevices.map((device) => (
              <AppCard key={device.id} style={styles.card}>
                <View style={styles.row}>
                  <View style={styles.icon}>
                    <Ionicons name="wifi" size={20} color={Brand.primary} />
                  </View>
                  <View style={styles.info}>
                    <AppText variant="bodyMedium" tone="default">
                      {device.name}
                    </AppText>
                    <AppText variant="caption" tone="muted">
                      {device.mac} - {device.band}
                    </AppText>
                  </View>
                  <View style={styles.right}>
                    <AppText variant="caption" color={SIGNAL_COLOR[device.signal]}>
                      {device.signal}
                    </AppText>
                    <AppText variant="caption" tone="muted">
                      {device.dataToday}
                    </AppText>
                  </View>
                </View>
              </AppCard>
            ))}
          </>
        )}
      </ScreenScroll>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  icon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: ExtranetColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1, gap: 2 },
  right: { alignItems: 'flex-end', gap: 2 },
});
