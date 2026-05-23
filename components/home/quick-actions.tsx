import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { AppText } from '@/components/ui/typography';
import { useCustomer } from '@/context/customer-context';
import { Routes } from '@/constants/routes';
import { Brand, ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

type Action = {
  id: string;
  label: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
  onPress: () => void;
};

export function QuickActions() {
  const { restartRouter, runSpeedTest, routerRestarting, speedTesting } = useCustomer();

  const actions: Action[] = [
    {
      id: 'renew',
      label: 'Renew plan',
      subtitle: 'Pay bill in 2 taps',
      icon: 'card-outline',
      color: Brand.primary,
      bg: ExtranetColors.primaryMuted,
      onPress: () => router.push(Routes.recharge),
    },
    {
      id: 'restart',
      label: 'Restart router',
      subtitle: routerRestarting ? 'In progress…' : 'Refresh connection',
      icon: 'refresh-circle-outline',
      color: Brand.red,
      bg: ExtranetColors.redMuted,
      onPress: () => {
        Alert.alert(
          'Restart router?',
          'Your fibre ONU will reboot. Connection pauses for ~30 seconds.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Restart', onPress: restartRouter },
          ],
        );
      },
    },
    {
      id: 'speed',
      label: 'Speed test',
      subtitle: speedTesting ? 'Testing…' : 'Check live Mbps',
      icon: 'speedometer-outline',
      color: ExtranetColors.success,
      bg: ExtranetColors.successBg,
      onPress: runSpeedTest,
    },
    {
      id: 'support',
      label: 'Get support',
      subtitle: 'Chat or raise ticket',
      icon: 'headset-outline',
      color: Brand.accent,
      bg: ExtranetColors.accentMuted,
      onPress: () => router.push(Routes.supportTickets),
    },
  ];

  return (
    <View style={styles.grid}>
      {actions.map((action) => (
        <PressableScale
          key={action.id}
          onPress={action.onPress}
          disabled={
            (action.id === 'restart' && routerRestarting) ||
            (action.id === 'speed' && speedTesting)
          }
          style={styles.card}>
          <View style={[styles.iconWrap, { backgroundColor: action.bg }]}>
            <Ionicons name={action.icon} size={24} color={action.color} />
          </View>
          <AppText variant="bodyMedium" tone="default">
            {action.label}
          </AppText>
          <AppText variant="caption" tone="muted" numberOfLines={1}>
            {action.subtitle}
          </AppText>
        </PressableScale>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  card: {
    width: '47%',
    flexGrow: 1,
    minHeight: 118,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: ExtranetColors.surface,
    borderWidth: 1,
    borderColor: ExtranetColors.borderLight,
    gap: Spacing.sm,
    ...Shadows.card,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
});
