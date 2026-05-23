import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { AppHeading, AppText } from '@/components/ui/typography';
import { Brand, ExtranetColors, Gradients, Radius, Spacing } from '@/constants/extranet-theme';

type ExtranetLogoProps = {
  size?: 'sm' | 'lg';
  showTagline?: boolean;
  inverse?: boolean;
};

export function ExtranetLogo({ size = 'lg', showTagline = true, inverse = false }: ExtranetLogoProps) {
  const isLarge = size === 'lg';
  const iconSize = isLarge ? 32 : 22;
  const boxSize = isLarge ? 72 : 48;

  return (
    <View style={styles.wrapper}>
      <View style={styles.logoMark}>
        <LinearGradient
          colors={[...Gradients.primaryButton]}
          style={[styles.iconBox, { width: boxSize, height: boxSize, borderRadius: isLarge ? 18 : 14 }]}>
          <Ionicons name="wifi" size={iconSize} color={Brand.white} />
        </LinearGradient>
        <View style={styles.redAccent} />
      </View>
      <AppHeading
        level={isLarge ? 1 : 2}
        color={inverse ? ExtranetColors.textInverse : ExtranetColors.text}
        style={isLarge ? styles.brandLarge : styles.brandSmall}>
        Extranet
      </AppHeading>
      {showTagline && (
        <AppText
          variant="label"
          color={inverse ? ExtranetColors.textInverseSubtle : ExtranetColors.primary}
          style={styles.tagline}>
          Fiber Broadband
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', gap: Spacing.md },
  logoMark: { position: 'relative' },
  iconBox: { alignItems: 'center', justifyContent: 'center' },
  redAccent: {
    position: 'absolute',
    bottom: 2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Brand.red,
    borderWidth: 2,
    borderColor: Brand.white,
  },
  brandLarge: { letterSpacing: 0.5 },
  brandSmall: { letterSpacing: 0.3 },
  tagline: { marginTop: -Spacing.xs },
});
