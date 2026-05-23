import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/typography';
import { Brand, ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

type LoadingOverlayProps = {
  visible: boolean;
  message?: string;
};

export function LoadingOverlay({ visible, message = 'Please wait…' }: LoadingOverlayProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <ActivityIndicator size="large" color={Brand.primary} />
          <AppText variant="bodyMedium" tone="default" align="center">
            {message}
          </AppText>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(7, 20, 38, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
  card: {
    backgroundColor: ExtranetColors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.xxxl,
    alignItems: 'center',
    gap: Spacing.lg,
    minWidth: 200,
    ...Shadows.cardElevated,
  },
});
