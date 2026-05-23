import { router } from 'expo-router';
import { Alert, Linking, StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/button';
import { FaqList } from '@/components/support/faq-list';
import { OutageCard } from '@/components/support/outage-card';
import { SupportChannel } from '@/components/support/support-channel';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { SectionHeader } from '@/components/ui/section-header';
import { AppHeading, AppText } from '@/components/ui/typography';
import { SUPPORT } from '@/data/mock-customer';
import { Routes } from '@/constants/routes';
import { Brand, ExtranetColors, Spacing } from '@/constants/extranet-theme';

export default function SupportScreen() {
  const openWhatsApp = () => {
    const url = `https://wa.me/${SUPPORT.whatsapp.replace(/\D/g, '')}?text=Hi%20Extranet%2C%20I%20need%20help`;
    Linking.openURL(url).catch(() => Alert.alert('WhatsApp', `Chat us at ${SUPPORT.whatsapp} (mock)`));
  };

  const openCall = () => {
    Linking.openURL(`tel:${SUPPORT.phone}`).catch(() => Alert.alert('Call support', SUPPORT.phone));
  };

  return (
    <SafeScreen edges={['top']} tone="light">
      <ScreenScroll bottomInset={100}>
        <View style={styles.header}>
          <AppHeading level={1} tone="default">
            Support
          </AppHeading>
          <AppText variant="body" tone="secondary">
            24×7 care team — average response under 12 minutes.
          </AppText>
        </View>

        <OutageCard />

        <AppButton
          label="My support tickets"
          variant="secondary"
          icon="ticket-outline"
          iconPosition="left"
          onPress={() => router.push(Routes.supportTickets)}
          style={styles.ticketsBtn}
        />

        <SupportChannel
          title="WhatsApp support"
          subtitle="Chat with our team · Usually replies in 5 min"
          icon="logo-whatsapp"
          iconColor="#25D366"
          iconBg="rgba(37, 211, 102, 0.12)"
          onPress={openWhatsApp}
        />
        <SupportChannel
          title="Call support"
          subtitle={SUPPORT.phone}
          icon="call-outline"
          iconColor={Brand.primary}
          iconBg={ExtranetColors.primaryMuted}
          onPress={openCall}
        />

        <SectionHeader title="FAQs" />
        <FaqList />
      </ScreenScroll>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.sm,
    marginBottom: Spacing.xxl,
  },
  ticketsBtn: { marginBottom: Spacing.xxl },
});
