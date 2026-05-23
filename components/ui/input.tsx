import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from '@/components/ui/typography';
import { ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

type AppInputProps = TextInputProps & {
  label: string;
  hint?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  dark?: boolean;
};

export function AppInput({
  label,
  hint,
  error,
  leftIcon,
  dark = false,
  style,
  ...rest
}: AppInputProps) {
  const isDark = dark;
  return (
    <View style={styles.wrapper}>
      <AppText
        variant="label"
        tone={isDark ? 'secondary' : 'secondary'}
        screen={isDark ? 'dark' : 'light'}
        style={styles.label}>
        {label}
      </AppText>
      <View
        style={[
          styles.inputRow,
          isDark && styles.inputRowDark,
          error && styles.inputError,
        ]}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={isDark ? ExtranetColors.textInverseSubtle : ExtranetColors.textMuted}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          placeholderTextColor={
            isDark ? ExtranetColors.textInverseSubtle : ExtranetColors.textMuted
          }
          style={[styles.input, isDark && styles.inputDark, style]}
          {...rest}
        />
      </View>
      {hint && !error && (
        <AppText variant="caption" tone="muted" screen={isDark ? 'dark' : 'light'} style={styles.hint}>
          {hint}
        </AppText>
      )}
      {error && (
        <AppText variant="caption" tone="danger" style={styles.hint}>
          {error}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: Spacing.sm },
  label: { marginLeft: Spacing.xs },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ExtranetColors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: ExtranetColors.border,
    minHeight: 52,
    paddingHorizontal: Spacing.lg,
    ...Shadows.sm,
  },
  inputRowDark: {
    backgroundColor: ExtranetColors.inputBgDark,
    borderColor: ExtranetColors.inputBorderDark,
    shadowOpacity: 0,
    elevation: 0,
  },
  inputError: { borderColor: ExtranetColors.error },
  leftIcon: { marginRight: Spacing.md },
  input: {
    flex: 1,
    color: ExtranetColors.text,
    fontSize: 16,
    paddingVertical: Spacing.md,
  },
  inputDark: { color: ExtranetColors.textInverse },
  hint: { marginLeft: Spacing.xs },
});
