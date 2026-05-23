import { StyleSheet, View, type ViewProps } from 'react-native';

import { ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

type AppCardProps = ViewProps & {
  variant?: 'default' | 'elevated' | 'success' | 'muted' | 'outline';
};

const variantStyles = StyleSheet.create({
  default: {
    backgroundColor: ExtranetColors.surface,
    borderColor: ExtranetColors.borderLight,
    borderWidth: 1,
    ...Shadows.card,
  },
  elevated: {
    backgroundColor: ExtranetColors.surface,
    borderColor: ExtranetColors.borderLight,
    borderWidth: 1,
    ...Shadows.cardElevated,
  },
  success: {
    backgroundColor: ExtranetColors.successBg,
    borderColor: ExtranetColors.successBorder,
    borderWidth: 1,
  },
  muted: {
    backgroundColor: ExtranetColors.backgroundMuted,
    borderColor: ExtranetColors.borderLight,
    borderWidth: 1,
  },
  outline: {
    backgroundColor: ExtranetColors.surface,
    borderColor: ExtranetColors.border,
    borderWidth: 1,
  },
});

export function AppCard({ children, variant = 'default', style, ...rest }: AppCardProps) {
  return (
    <View style={[styles.base, variantStyles[variant], style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
  },
});
