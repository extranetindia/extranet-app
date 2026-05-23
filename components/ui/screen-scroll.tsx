import { RefreshControl, ScrollView, StyleSheet, type ScrollViewProps } from 'react-native';

import { Brand, Spacing } from '@/constants/extranet-theme';

type ScreenScrollProps = ScrollViewProps & {
  children: React.ReactNode;
  bottomInset?: number;
  onRefresh?: () => void | Promise<void>;
  refreshing?: boolean;
};

export function ScreenScroll({
  children,
  contentContainerStyle,
  bottomInset = 24,
  onRefresh,
  refreshing = false,
  ...rest
}: ScreenScrollProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: bottomInset },
        contentContainerStyle,
      ]}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Brand.primary]}
            tintColor={Brand.primary}
            progressBackgroundColor={Brand.white}
          />
        ) : undefined
      }
      {...rest}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.lg,
  },
});
