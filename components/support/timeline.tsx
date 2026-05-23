import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/typography';
import type { TimelineEvent } from '@/data/mock-support-tickets';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

type TimelineProps = { events: TimelineEvent[] };

export function SupportTimeline({ events }: TimelineProps) {
  return (
    <View style={styles.wrapper}>
      {events.map((event, index) => {
        const isLast = index === events.length - 1;
        return (
          <View key={event.id} style={styles.row}>
            <View style={styles.lineCol}>
              <View style={[styles.dot, event.completed && styles.dotDone]}>
                {event.completed && (
                  <Ionicons name="checkmark" size={12} color={ExtranetColors.surface} />
                )}
              </View>
              {!isLast && <View style={[styles.line, event.completed && styles.lineDone]} />}
            </View>
            <View style={styles.content}>
              <AppText variant="bodyMedium" tone="default">
                {event.title}
              </AppText>
              <AppText variant="small" tone="muted">
                {event.subtitle}
              </AppText>
              <AppText variant="caption" tone="muted" style={styles.time}>
                {event.time}
              </AppText>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingLeft: Spacing.xs },
  row: { flexDirection: 'row', gap: Spacing.lg, minHeight: 72 },
  lineCol: { alignItems: 'center', width: 24 },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: ExtranetColors.border,
    backgroundColor: ExtranetColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotDone: { backgroundColor: Brand.primary, borderColor: Brand.primary },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: ExtranetColors.border,
    marginVertical: 4,
  },
  lineDone: { backgroundColor: Brand.primary },
  content: { flex: 1, paddingBottom: Spacing.lg, gap: 2 },
  time: { marginTop: Spacing.xs },
});
