import { StyleSheet, View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExtranetColors, Spacing } from '@/constants/extranet-theme';

type StickyFooterProps = ViewProps & {
  children: React.ReactNode;
};

export function StickyFooter({ children, style, ...rest }: StickyFooterProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.footer,
        { paddingBottom: Math.max(insets.bottom, Spacing.lg) },
        style,
      ]}
      {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.lg,
    backgroundColor: ExtranetColors.surface,
    borderTopWidth: 1,
    borderTopColor: ExtranetColors.borderLight,
    ...{
      shadowColor: '#071426',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
      elevation: 8,
    },
  },
});
