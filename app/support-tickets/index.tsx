import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { TicketCard } from '@/components/support/ticket-card';
import { AppButton } from '@/components/ui/button';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { useAppFeatures } from '@/context/app-features-context';
import { Routes } from '@/constants/routes';
import { ExtranetColors, Spacing } from '@/constants/extranet-theme';

export default function SupportTicketsScreen() {
  const { tickets } = useAppFeatures();

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScreenScroll bottomInset={100}>
        <ScreenHeader title="My tickets" subtitle="Track complaints & requests" />
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </ScreenScroll>
      <View style={styles.footer}>
        <AppButton
          label="Raise a complaint"
          icon="add-circle-outline"
          iconPosition="left"
          onPress={() => router.push(Routes.supportTicketNew)}
        />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
    backgroundColor: ExtranetColors.background,
  },
});
