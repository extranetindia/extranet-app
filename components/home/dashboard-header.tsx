import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppHeading, AppText } from '@/components/ui/typography';
import { useAppFeatures } from '@/context/app-features-context';
import { useCustomer } from '@/context/customer-context';
import { Routes } from '@/constants/routes';
import { Brand, ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function DashboardHeader() {
  const { customer } = useCustomer();
  const { unreadCount } = useAppFeatures();

  return (
    <View style={styles.row}>
      <View style={styles.text}>
        <AppText variant="small" tone="secondary">
          {getGreeting()},
        </AppText>
        <AppHeading level={2} tone="default">
          {customer.firstName}
        </AppHeading>
        <AppText variant="caption" tone="muted">
          Account {customer.accountId}
        </AppText>
      </View>
      <View style={styles.actions}>
        <Pressable style={styles.bell} onPress={() => router.push(Routes.notifications)}>
          <Ionicons name="notifications-outline" size={22} color={Brand.primary} />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <AppText variant="caption" color={Brand.white} style={styles.badgeText}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </AppText>
            </View>
          )}
        </Pressable>
        <Pressable style={styles.avatar} onPress={() => router.push(Routes.account)}>
          <AppText variant="bodyMedium" color={Brand.white}>
            {customer.avatarInitials}
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xxl,
  },
  text: { flex: 1, gap: 2 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  bell: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ExtranetColors.surface,
    borderWidth: 1,
    borderColor: ExtranetColors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Brand.red,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: { fontSize: 10, fontWeight: '700', lineHeight: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
});
