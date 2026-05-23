import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/button';
import { AppText } from '@/components/ui/typography';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

type EmptyStateProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ icon, title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconRing}>
        <View style={styles.iconInner}>
          <Ionicons name={icon} size={40} color={Brand.primary} />
        </View>
      </View>
      <AppText variant="h3" tone="default" align="center">
        {title}
      </AppText>
      <AppText variant="body" tone="secondary" align="center" style={styles.message}>
        {message}
      </AppText>
      {actionLabel && onAction ? (
        <AppButton label={actionLabel} onPress={onAction} fullWidth={false} style={styles.btn} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingVertical: Spacing.massive,
    paddingHorizontal: Spacing.xxl,
    gap: Spacing.md,
  },
  iconRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: ExtranetColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    backgroundColor: ExtranetColors.primaryMuted,
  },
  iconInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: ExtranetColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: { lineHeight: 22, maxWidth: 300 },
  btn: { marginTop: Spacing.lg, minWidth: 200 },
});
