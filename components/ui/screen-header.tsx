import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppHeading, AppText } from '@/components/ui/typography';
import { ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
};

export function ScreenHeader({ title, subtitle, onBack, rightAction }: ScreenHeaderProps) {
  const handleBack = onBack ?? (() => router.back());

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={handleBack} style={styles.back} hitSlop={12}>
        <Ionicons name="arrow-back" size={22} color={ExtranetColors.text} />
      </Pressable>
      <View style={styles.text}>
        <AppHeading level={2} tone="default">
          {title}
        </AppHeading>
        {subtitle ? (
          <AppText variant="caption" tone="muted">
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {rightAction ? <View style={styles.right}>{rightAction}</View> : <View style={styles.spacer} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: ExtranetColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: ExtranetColors.borderLight,
    ...Shadows.sm,
  },
  text: { flex: 1, gap: 2 },
  right: { minWidth: 40 },
  spacer: { width: 40 },
});
