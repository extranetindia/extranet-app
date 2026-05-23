import { StyleSheet, View, type ViewProps } from 'react-native';

import { AppText } from '@/components/ui/typography';
import { ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

type BadgeVariant = 'active' | 'suspended' | 'online' | 'offline' | 'recommended' | 'default';

type BadgeProps = ViewProps & {
  label: string;
  variant?: BadgeVariant;
};

const VARIANT_STYLES: Record<BadgeVariant, { bg: string; border: string; text: string }> = {
  active: {
    bg: ExtranetColors.successBg,
    border: ExtranetColors.successBorder,
    text: ExtranetColors.success,
  },
  suspended: {
    bg: ExtranetColors.errorBg,
    border: ExtranetColors.errorBorder,
    text: ExtranetColors.error,
  },
  online: {
    bg: ExtranetColors.successBg,
    border: ExtranetColors.successBorder,
    text: ExtranetColors.success,
  },
  offline: {
    bg: ExtranetColors.errorBg,
    border: ExtranetColors.errorBorder,
    text: ExtranetColors.error,
  },
  recommended: {
    bg: ExtranetColors.redMuted,
    border: 'rgba(215, 25, 32, 0.25)',
    text: ExtranetColors.telecomRed,
  },
  default: {
    bg: ExtranetColors.primaryMuted,
    border: 'rgba(11, 78, 162, 0.2)',
    text: ExtranetColors.primary,
  },
};

export function Badge({ label, variant = 'default', style, ...rest }: BadgeProps) {
  const colors = VARIANT_STYLES[variant];
  return (
    <View
      style={[styles.badge, { backgroundColor: colors.bg, borderColor: colors.border }, style]}
      {...rest}>
      <AppText variant="label" color={colors.text} style={styles.label}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  label: {
    fontSize: 10,
    lineHeight: 12,
  },
});
