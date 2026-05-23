import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/typography';
import { MOCK_OUTAGE } from '@/data/mock-customer';
import { ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

export function OutageCard() {
  const { hasOutage, message, lastUpdated } = MOCK_OUTAGE;

  return (
    <View style={[styles.card, hasOutage ? styles.cardAlert : styles.cardOk]}>
      <View style={[styles.iconWrap, hasOutage ? styles.iconAlert : styles.iconOk]}>
        <Ionicons
          name={hasOutage ? 'warning' : 'checkmark-circle'}
          size={28}
          color={hasOutage ? ExtranetColors.warning : ExtranetColors.success}
        />
      </View>
      <View style={styles.content}>
        <AppText variant="label" tone="muted">
          NETWORK STATUS
        </AppText>
        <AppText variant="bodyMedium" tone="default">
          {message}
        </AppText>
        <AppText variant="caption" tone="muted">
          {lastUpdated}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.xxl,
  },
  cardOk: {
    backgroundColor: ExtranetColors.successBg,
    borderColor: ExtranetColors.successBorder,
  },
  cardAlert: {
    backgroundColor: ExtranetColors.warningBg,
    borderColor: 'rgba(180, 83, 9, 0.3)',
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconOk: { backgroundColor: 'rgba(13, 122, 78, 0.15)' },
  iconAlert: { backgroundColor: 'rgba(180, 83, 9, 0.15)' },
  content: { flex: 1, gap: 4 },
});
