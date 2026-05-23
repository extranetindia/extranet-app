import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/typography';
import type { AppNotification, NotificationType } from '@/data/mock-notifications';
import { Brand, ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

const TYPE_CONFIG: Record<
  NotificationType,
  { icon: keyof typeof Ionicons.glyphMap; color: string; bg: string }
> = {
  renewal: { icon: 'card-outline', color: Brand.primary, bg: ExtranetColors.primaryMuted },
  maintenance: { icon: 'construct-outline', color: ExtranetColors.warning, bg: ExtranetColors.warningBg },
  outage: { icon: 'alert-circle-outline', color: Brand.red, bg: ExtranetColors.errorBg },
  offer: { icon: 'gift-outline', color: Brand.accent, bg: ExtranetColors.accentMuted },
};

type NotificationItemProps = {
  item: AppNotification;
  onPress: () => void;
};

export function NotificationItem({ item, onPress }: NotificationItemProps) {
  const config = TYPE_CONFIG[item.type];

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, !item.read && styles.unread]}>
      <View style={[styles.iconWrap, { backgroundColor: config.bg }]}>
        <Ionicons name={config.icon} size={22} color={config.color} />
      </View>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <AppText variant="bodyMedium" tone="default" style={!item.read && styles.bold}>
            {item.title}
          </AppText>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <AppText variant="small" tone="secondary" numberOfLines={2}>
          {item.body}
        </AppText>
        <AppText variant="caption" tone="muted" style={styles.time}>
          {item.time}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: ExtranetColors.surface,
    borderWidth: 1,
    borderColor: ExtranetColors.borderLight,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  unread: {
    borderColor: 'rgba(11, 78, 162, 0.25)',
    backgroundColor: ExtranetColors.primaryMuted,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, gap: 4 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  bold: { fontWeight: '600' },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Brand.red,
  },
  time: { marginTop: Spacing.xs },
});
