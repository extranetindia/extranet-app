import { router } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';

import { AccountMenuItem } from '@/components/account/account-menu-item';
import { AppCard } from '@/components/ui/card';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { SectionHeader } from '@/components/ui/section-header';
import { AppHeading, AppText } from '@/components/ui/typography';
import { useCustomer } from '@/context/customer-context';
import { APP_VERSION } from '@/data/mock-customer';
import { Routes } from '@/constants/routes';
import { Brand, ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

export default function AccountScreen() {
  const { customer, plan, notificationsEnabled, toggleNotifications } = useCustomer();

  const fullAddress = `${customer.address.line1}, ${customer.address.line2}, ${customer.address.area}, ${customer.address.city} – ${customer.address.pincode}`;

  const handleLogout = () => {
    Alert.alert('Log out?', 'You will return to onboarding (demo).', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: () => router.replace('/') },
    ]);
  };

  return (
    <SafeScreen edges={['top']} tone="light">
      <ScreenScroll bottomInset={100}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <AppText variant="h3" color={Brand.white}>
              {customer.avatarInitials}
            </AppText>
          </View>
          <View style={styles.profileText}>
            <AppHeading level={2} tone="default">
              {customer.firstName} {customer.lastName}
            </AppHeading>
            <AppText variant="small" tone="muted">
              {customer.phone}
            </AppText>
            <AppText variant="caption" color={Brand.primary}>
              {customer.email}
            </AppText>
          </View>
        </View>

        <AppCard variant="elevated" style={styles.detailCard}>
          <AppText variant="label" tone="muted">
            SERVICE ADDRESS
          </AppText>
          <AppText variant="small" tone="default" style={styles.address}>
            {fullAddress}
          </AppText>
        </AppCard>

        <SectionHeader title="Manage" />
        <AccountMenuItem
          icon="card-outline"
          label="Subscription & billing"
          value="Plan, renewals, auto-renew"
          onPress={() => router.push(Routes.subscription)}
        />
        <AccountMenuItem
          icon="analytics-outline"
          label="Usage analytics"
          value="Data, speed, devices"
          onPress={() => router.push(Routes.usage)}
        />
        <AccountMenuItem
          icon="notifications-outline"
          label="Notification centre"
          onPress={() => router.push(Routes.notifications)}
        />
        <AccountMenuItem
          icon="ticket-outline"
          label="My support tickets"
          onPress={() => router.push(Routes.supportTickets)}
        />
        <AccountMenuItem
          icon="wifi-outline"
          label="Router management"
          onPress={() => router.push(Routes.routerMgmt)}
        />

        <SectionHeader title="Subscription" />
        <AppCard variant="default" style={styles.subCard}>
          <View style={styles.subRow}>
            <View>
              <AppText variant="bodyMedium" tone="default">
                {plan.name}
              </AppText>
              <AppText variant="small" tone="muted">
                {plan.speed} · ₹{plan.price}/mo
              </AppText>
            </View>
            <View style={styles.activePill}>
              <AppText variant="label" color={ExtranetColors.success} style={styles.activeLabel}>
                ACTIVE
              </AppText>
            </View>
          </View>
          <AppText variant="caption" tone="muted" style={styles.renew}>
            Renews on {plan.expiryDate}
          </AppText>
        </AppCard>

        <SectionHeader title="Settings" />
        <AccountMenuItem
          icon="notifications-outline"
          label="Push notifications"
          value="Billing, outages & offers"
          toggle
          toggleValue={notificationsEnabled}
          onToggle={toggleNotifications}
          showChevron={false}
        />
        <AccountMenuItem
          icon="wallet-outline"
          label="Recharge & pay"
          onPress={() => router.push(Routes.recharge)}
        />
        <AccountMenuItem
          icon="help-circle-outline"
          label="Help centre"
          onPress={() => router.push('/support')}
        />

        <View style={styles.logoutSection}>
          <AccountMenuItem
            icon="log-out-outline"
            label="Log out"
            destructive
            showChevron={false}
            onPress={handleLogout}
          />
        </View>

        <AppText variant="caption" tone="muted" align="center" style={styles.version}>
          Extranet Customer · v{APP_VERSION}
        </AppText>
      </ScreenScroll>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  profileText: { flex: 1, gap: 2 },
  detailCard: { marginBottom: Spacing.xxl, gap: Spacing.sm },
  address: { lineHeight: 22 },
  subCard: { marginBottom: Spacing.xxl },
  subRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  activePill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    backgroundColor: ExtranetColors.successBg,
    borderWidth: 1,
    borderColor: ExtranetColors.successBorder,
  },
  activeLabel: { fontSize: 10 },
  renew: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: ExtranetColors.borderLight,
  },
  logoutSection: { marginTop: Spacing.xl, marginBottom: Spacing.lg },
  version: { marginBottom: Spacing.xxl },
});
