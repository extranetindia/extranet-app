import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, Switch, View } from 'react-native';

import { AppCard } from '@/components/ui/card';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { AppText } from '@/components/ui/typography';
import { useCustomer } from '@/context/customer-context';
import { useAppFeatures } from '@/context/app-features-context';
import { Routes } from '@/constants/routes';
import { Brand, ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

export default function RouterManagementScreen() {
  const { restartRouter, routerRestarting } = useCustomer();
  const { routerSettings, toggleParentalControl } = useAppFeatures();

  const handleRestart = () => {
    Alert.alert('Restart router?', 'Connection will pause for ~30 seconds.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Restart', onPress: restartRouter },
    ]);
  };

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScreenScroll>
        <ScreenHeader title="Router" subtitle={routerSettings.model} />
        <AppCard variant="elevated" style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Ionicons name="hardware-chip-outline" size={32} color={Brand.primary} />
            <View>
              <AppText variant="bodyMedium" tone="default">
                {routerSettings.model}
              </AppText>
              <AppText variant="caption" tone="muted">
                Firmware {routerSettings.firmware} · Uptime {routerSettings.uptime}
              </AppText>
            </View>
          </View>
        </AppCard>
        <MenuRow
          icon="refresh-circle-outline"
          title="Restart router"
          subtitle={routerRestarting ? 'Restarting…' : `Last: ${routerSettings.lastRestart}`}
          onPress={handleRestart}
        />
        <MenuRow
          icon="phone-portrait-outline"
          title="Connected devices"
          subtitle="4 devices online"
          onPress={() => router.push(Routes.routerDevices)}
        />
        <MenuRow
          icon="wifi-outline"
          title="Wi‑Fi settings"
          subtitle={`${routerSettings.ssid5g}`}
          onPress={() => router.push(Routes.routerWifi)}
        />
        <AppCard style={styles.parental}>
          <View style={styles.parentalRow}>
            <View style={styles.parentalText}>
              <Ionicons name="shield-checkmark-outline" size={22} color={Brand.primary} />
              <View>
                <AppText variant="bodyMedium" tone="default">
                  Parental controls
                </AppText>
                <AppText variant="caption" tone="muted">
                  Block adult content & set schedules
                </AppText>
              </View>
            </View>
            <Switch
              value={routerSettings.parentalControlEnabled}
              onValueChange={toggleParentalControl}
              trackColor={{ false: ExtranetColors.border, true: Brand.accent }}
              thumbColor={
                routerSettings.parentalControlEnabled ? Brand.primary : ExtranetColors.surface
              }
            />
          </View>
        </AppCard>
      </ScreenScroll>
    </SafeScreen>
  );
}

function MenuRow({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.menuRow, pressed && styles.pressed]}>
      <View style={styles.menuIcon}>
        <Ionicons name={icon} size={22} color={Brand.primary} />
      </View>
      <View style={styles.menuText}>
        <AppText variant="bodyMedium" tone="default">
          {title}
        </AppText>
        <AppText variant="caption" tone="muted">
          {subtitle}
        </AppText>
      </View>
      <Ionicons name="chevron-forward" size={20} color={ExtranetColors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  statusCard: { marginBottom: Spacing.xxl },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: ExtranetColors.surface,
    borderWidth: 1,
    borderColor: ExtranetColors.borderLight,
    ...Shadows.sm,
  },
  pressed: { opacity: 0.92 },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: ExtranetColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: { flex: 1, gap: 2 },
  parental: { marginTop: Spacing.lg },
  parentalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  parentalText: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, flex: 1 },
});
