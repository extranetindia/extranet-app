import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Brand, ExtranetColors, Gradients, type ScreenTone } from '@/constants/extranet-theme';

type SafeScreenProps = ViewProps & {
  children: React.ReactNode;
  edges?: ('top' | 'bottom')[];
  tone?: ScreenTone;
  glowAccents?: boolean;
};

export function SafeScreen({
  children,
  edges = ['top', 'bottom'],
  tone = 'light',
  glowAccents = false,
  style,
  ...rest
}: SafeScreenProps) {
  const insets = useSafeAreaInsets();
  const paddingTop = edges.includes('top') ? insets.top : 0;
  const paddingBottom = edges.includes('bottom') ? insets.bottom : 0;

  const content = (
    <View style={[styles.container, { paddingTop, paddingBottom }, style]} {...rest}>
      {children}
    </View>
  );

  if (tone === 'light') {
    return <View style={[styles.root, styles.light]}>{content}</View>;
  }

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[...Gradients.splashBackground]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />
      {glowAccents && (
        <>
          <View style={styles.glowBlue} />
          <View style={styles.glowRed} />
        </>
      )}
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Brand.navy,
  },
  light: {
    backgroundColor: Brand.background,
  },
  container: {
    flex: 1,
  },
  glowBlue: {
    position: 'absolute',
    top: -80,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(45, 127, 249, 0.22)',
  },
  glowRed: {
    position: 'absolute',
    bottom: 120,
    left: -70,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(215, 25, 32, 0.14)',
  },
});
