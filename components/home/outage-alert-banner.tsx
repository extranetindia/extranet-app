import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

import { AppText } from '@/components/ui/typography';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

type OutageAlertBannerProps = {
  /** Set false to hide — mock maintenance notice */
  show?: boolean;
};

export function OutageAlertBanner({ show = true }: OutageAlertBannerProps) {
  const [visible, setVisible] = useState(show);

  if (!visible) return null;

  return (
    <Animated.View entering={FadeInDown.duration(400)} exiting={FadeOutUp.duration(300)}>
      <View style={styles.banner}>
        <Ionicons name="information-circle" size={22} color={Brand.primary} />
        <View style={styles.text}>
          <AppText variant="small" tone="default" style={styles.title}>
            Scheduled maintenance · 28 May, 2–4 AM
          </AppText>
          <AppText variant="caption" tone="muted">
            Bellandur zone · Brief service pause expected
          </AppText>
        </View>
        <Pressable onPress={() => setVisible(false)} hitSlop={12}>
          <Ionicons name="close" size={20} color={ExtranetColors.textMuted} />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    padding: Spacing.lg,
    backgroundColor: ExtranetColors.accentMuted,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(45, 127, 249, 0.25)',
    marginBottom: Spacing.lg,
  },
  text: { flex: 1, gap: 2 },
  title: { fontWeight: '600' },
});
