import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ticketDetail } from '@/constants/routes';
import { StyleSheet, View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';

import { AppText } from '@/components/ui/typography';
import type { SupportTicket } from '@/data/mock-support-tickets';
import { Brand, ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

const STATUS_COLORS: Record<SupportTicket['status'], { bg: string; text: string; label: string }> = {
  open: { bg: ExtranetColors.accentMuted, text: Brand.primary, label: 'OPEN' },
  in_progress: { bg: ExtranetColors.warningBg, text: ExtranetColors.warning, label: 'IN PROGRESS' },
  resolved: { bg: ExtranetColors.successBg, text: ExtranetColors.success, label: 'RESOLVED' },
  scheduled: { bg: ExtranetColors.primaryMuted, text: Brand.primary, label: 'SCHEDULED' },
};

type TicketCardProps = { ticket: SupportTicket };

export function TicketCard({ ticket }: TicketCardProps) {
  const status = STATUS_COLORS[ticket.status];

  return (
    <PressableScale
      onPress={() => router.push(ticketDetail(ticket.id))}
      style={styles.card}>
      <View style={styles.top}>
        <AppText variant="caption" tone="muted">
          {ticket.id}
        </AppText>
        <View style={[styles.badge, { backgroundColor: status.bg }]}>
          <AppText variant="label" color={status.text} style={styles.badgeText}>
            {status.label}
          </AppText>
        </View>
      </View>
      <AppText variant="bodyMedium" tone="default" numberOfLines={1}>
        {ticket.subject}
      </AppText>
      <AppText variant="small" tone="muted">
        {ticket.category} · Updated {ticket.updatedAt}
      </AppText>
      {ticket.technicianVisit && (
        <View style={styles.visit}>
          <Ionicons name="construct-outline" size={16} color={Brand.primary} />
          <AppText variant="caption" color={Brand.primary}>
            Visit: {ticket.technicianVisit.date}
          </AppText>
        </View>
      )}
      <Ionicons name="chevron-forward" size={18} color={ExtranetColors.textMuted} style={styles.chevron} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: ExtranetColors.surface,
    borderWidth: 1,
    borderColor: ExtranetColors.borderLight,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  badge: { paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: Radius.full },
  badgeText: { fontSize: 9 },
  visit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: ExtranetColors.borderLight,
  },
  chevron: { position: 'absolute', right: Spacing.lg, top: '50%' },
});
