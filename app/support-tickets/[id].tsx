import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { SupportTimeline } from '@/components/support/timeline';
import { AppCard } from '@/components/ui/card';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { AppText } from '@/components/ui/typography';
import { useAppFeatures } from '@/context/app-features-context';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

export default function TicketDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tickets } = useAppFeatures();
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return (
      <SafeScreen tone="light">
        <ScreenHeader title="Ticket not found" />
      </SafeScreen>
    );
  }

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScreenScroll>
        <ScreenHeader title={ticket.id} subtitle={ticket.category} />
        <AppCard variant="elevated" style={styles.summary}>
          <AppText variant="h3" tone="default">
            {ticket.subject}
          </AppText>
          <AppText variant="small" tone="secondary" style={styles.desc}>
            {ticket.description}
          </AppText>
          <AppText variant="caption" tone="muted">
            Created {ticket.createdAt}
          </AppText>
        </AppCard>
        {ticket.technicianVisit && (
          <AppCard style={styles.visitCard}>
            <View style={styles.visitHeader}>
              <Ionicons name="construct" size={24} color={Brand.primary} />
              <AppText variant="h3" tone="default">
                Technician visit
              </AppText>
            </View>
            <VisitRow label="Date" value={ticket.technicianVisit.date} />
            <VisitRow label="Slot" value={ticket.technicianVisit.slot} />
            <VisitRow label="Engineer" value={ticket.technicianVisit.engineer} />
            <VisitRow label="Contact" value={ticket.technicianVisit.phone} />
          </AppCard>
        )}
        <AppText variant="label" tone="muted" style={styles.timelineTitle}>
          SUPPORT TIMELINE
        </AppText>
        <AppCard variant="elevated">
          <SupportTimeline events={ticket.timeline} />
        </AppCard>
      </ScreenScroll>
    </SafeScreen>
  );
}

function VisitRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.visitRow}>
      <AppText variant="small" tone="muted">
        {label}
      </AppText>
      <AppText variant="bodyMedium" tone="default">
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: { gap: Spacing.md, marginBottom: Spacing.lg },
  desc: { lineHeight: 22 },
  visitCard: { marginBottom: Spacing.xxl, gap: Spacing.md },
  visitHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  visitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: ExtranetColors.borderLight,
  },
  timelineTitle: { marginBottom: Spacing.lg },
});
