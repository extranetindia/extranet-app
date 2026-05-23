import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type ViewStyle,
} from 'react-native';

import { AppText } from '@/components/ui/typography';
import {
  ExtranetColors,
  Gradients,
  Radius,
  Shadows,
  Spacing,
} from '@/constants/extranet-theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'surface';

type AppButtonProps = Omit<PressableProps, 'style'> & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
};

export function AppButton({
  label,
  variant = 'primary',
  loading = false,
  icon,
  iconPosition = 'right',
  fullWidth = true,
  disabled,
  onPress,
  style,
  ...rest
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  const handlePress: PressableProps['onPress'] = (e) => {
    if (!isDisabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(e);
  };

  const iconColor =
    variant === 'primary' || variant === 'danger'
      ? ExtranetColors.white
      : variant === 'surface'
        ? ExtranetColors.primary
        : ExtranetColors.primary;

  const labelColor =
    variant === 'primary' || variant === 'danger'
      ? ExtranetColors.white
      : variant === 'surface' || variant === 'outline'
        ? ExtranetColors.primary
        : ExtranetColors.text;

  const content = (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'danger' ? ExtranetColors.white : ExtranetColors.primary}
        />
      ) : (
        <View style={styles.inner}>
          {icon && iconPosition === 'left' && (
            <Ionicons name={icon} size={20} color={iconColor} style={styles.iconLeft} />
          )}
          <AppText variant="button" color={labelColor}>
            {label}
          </AppText>
          {icon && iconPosition === 'right' && (
            <Ionicons name={icon} size={20} color={iconColor} style={styles.iconRight} />
          )}
        </View>
      )}
    </>
  );

  const resolveStyle = (pressed: boolean): ViewStyle[] =>
    [
      fullWidth ? styles.fullWidth : undefined,
      pressed && !isDisabled ? styles.pressed : undefined,
      isDisabled ? styles.disabled : undefined,
      style,
    ].filter(Boolean) as ViewStyle[];

  if (variant === 'primary') {
    return (
      <Pressable
        onPress={handlePress}
        disabled={isDisabled}
        style={({ pressed }) => resolveStyle(pressed)}
        {...rest}>
        <LinearGradient
          colors={[...Gradients.primaryButton]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.primary, Shadows.button, isDisabled && styles.disabledGradient]}>
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  if (variant === 'danger') {
    return (
      <Pressable
        onPress={handlePress}
        disabled={isDisabled}
        style={({ pressed }) => resolveStyle(pressed)}
        {...rest}>
        <View style={[styles.primary, styles.danger, Shadows.button, isDisabled && styles.disabledGradient]}>
          {content}
        </View>
      </Pressable>
    );
  }

  const variantStyles = {
    secondary: styles.secondary,
    ghost: styles.ghost,
    outline: styles.outline,
    surface: styles.surface,
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={({ pressed }) => [styles.base, variantStyles[variant], ...resolveStyle(pressed)]}
      {...rest}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fullWidth: { width: '100%' },
  base: {
    minHeight: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  primary: {
    minHeight: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  danger: {
    backgroundColor: ExtranetColors.telecomRed,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: ExtranetColors.surface,
    borderWidth: 1,
    borderColor: ExtranetColors.border,
    ...Shadows.sm,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  outline: {
    backgroundColor: ExtranetColors.surface,
    borderWidth: 1.5,
    borderColor: ExtranetColors.primary,
  },
  surface: {
    backgroundColor: ExtranetColors.white,
    ...Shadows.sm,
  },
  iconLeft: { marginRight: Spacing.sm },
  iconRight: { marginLeft: Spacing.sm },
  pressed: { opacity: 0.92, transform: [{ scale: 0.985 }] },
  disabled: { opacity: 0.45 },
  disabledGradient: { opacity: 0.45 },
});
