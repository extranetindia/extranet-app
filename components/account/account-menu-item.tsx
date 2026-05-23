import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { AppText } from '@/components/ui/typography';
import { Brand, ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

type AccountMenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  destructive?: boolean;
  showChevron?: boolean;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  onPress?: () => void;
};

export function AccountMenuItem({
  icon,
  label,
  value,
  destructive,
  showChevron = true,
  toggle,
  toggleValue,
  onToggle,
  onPress,
}: AccountMenuItemProps) {
  return (
    <Pressable
      onPress={toggle ? undefined : onPress}
      disabled={toggle}
      style={({ pressed }) => [styles.row, pressed && !toggle && styles.pressed]}>
      <View style={[styles.iconWrap, destructive && styles.iconDestructive]}>
        <Ionicons
          name={icon}
          size={20}
          color={destructive ? ExtranetColors.error : Brand.primary}
        />
      </View>
      <View style={styles.text}>
        <AppText variant="bodyMedium" tone={destructive ? 'danger' : 'default'}>
          {label}
        </AppText>
        {value && (
          <AppText variant="caption" tone="muted">
            {value}
          </AppText>
        )}
      </View>
      {toggle && onToggle !== undefined && (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: ExtranetColors.border, true: Brand.accent }}
          thumbColor={toggleValue ? Brand.primary : ExtranetColors.surface}
        />
      )}
      {showChevron && !toggle && (
        <Ionicons name="chevron-forward" size={18} color={ExtranetColors.textMuted} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: ExtranetColors.surface,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: ExtranetColors.borderLight,
    ...Shadows.sm,
  },
  pressed: { opacity: 0.92 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: ExtranetColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDestructive: { backgroundColor: ExtranetColors.errorBg },
  text: { flex: 1, gap: 2 },
});
