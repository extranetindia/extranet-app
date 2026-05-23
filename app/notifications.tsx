import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { NotificationItem } from '@/components/notifications/notification-item';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { AppText } from '@/components/ui/typography';
import { useAppFeatures } from '@/context/app-features-context';
import { Routes } from '@/constants/routes';
import { Brand, Spacing } from '@/constants/extranet-theme';

export default function NotificationsScreen() {
  const { notifications, unreadCount, markRead, markAllRead } = useAppFeatures();

  const handlePress = (id: string, type: string, actionLabel?: string) => {
    markRead(id);
    if (type === 'renewal' || actionLabel === 'Renew now') {
      router.push(Routes.recharge);
    } else if (actionLabel === 'View receipt') {
      router.push(Routes.rechargeReceipt);
    } else if (type === 'offer' || actionLabel === 'View offer') {
      router.push(Routes.plans);
    }
  };

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScreenScroll bottomInset={40}>
        <ScreenHeader
          title="Notifications"
          subtitle={unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
          rightAction={
            unreadCount > 0 ? (
              <Pressable onPress={markAllRead} hitSlop={8}>
                <AppText variant="small" color={Brand.primary} style={styles.markAll}>
                  Mark all read
                </AppText>
              </Pressable>
            ) : undefined
          }
        />
        {notifications.map((n) => (
          <NotificationItem
            key={n.id}
            item={n}
            onPress={() => handlePress(n.id, n.type, n.actionLabel)}
          />
        ))}
      </ScreenScroll>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  markAll: { fontWeight: '600' },
});
