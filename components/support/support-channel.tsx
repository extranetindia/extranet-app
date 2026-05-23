import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/typography';
import { ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

type SupportChannelProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  onPress: () => void;
};

export function SupportChannel({
  title,
  subtitle,
  icon,
  iconColor,
  iconBg,
  onPress,
}: SupportChannelProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={26} color={iconColor} />
      </View>
      <View style={styles.text}>
        <AppText variant="bodyMedium" tone="default">
          {title}
        </AppText>
        <AppText variant="small" tone="muted">
          {subtitle}
        </AppText>
      </View>
      <Ionicons name="chevron-forward" size={20} color={ExtranetColors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: ExtranetColors.surface,
    borderWidth: 1,
    borderColor: ExtranetColors.borderLight,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  pressed: { opacity: 0.92 },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, gap: 2 },
});
