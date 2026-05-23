import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { Brand, ExtranetColors, Gradients, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

export function WelcomeIllustration() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(45, 127, 249, 0.12)', 'rgba(11, 78, 162, 0.06)', 'transparent']}
        style={styles.glow}
      />
      <View style={styles.card}>
        <View style={styles.brandBar}>
          <LinearGradient colors={[...Gradients.primaryButton]} style={styles.brandStripe} />
        </View>
        <View style={styles.router}>
          <Ionicons name="wifi" size={28} color={Brand.primary} />
          <View style={styles.signalBars}>
            {[1, 2, 3, 4].map((i) => (
              <View key={i} style={[styles.bar, { height: 8 + i * 6, opacity: 0.35 + i * 0.18 }]} />
            ))}
          </View>
        </View>
        <View style={styles.homeRow}>
          <View style={styles.homeIcon}>
            <Ionicons name="home" size={28} color={Brand.white} />
          </View>
          <View style={styles.speedBadge}>
            <Ionicons name="flash" size={14} color={Brand.white} />
          </View>
        </View>
        <View style={styles.devices}>
          {(['laptop-outline', 'phone-portrait-outline', 'tv-outline'] as const).map((icon) => (
            <View key={icon} style={styles.device}>
              <Ionicons name={icon} size={18} color={Brand.primary} />
            </View>
          ))}
        </View>
        <View style={styles.speedLabel}>
          <View style={styles.speedLine} />
          <View style={[styles.speedLine, styles.speedLineShort]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  glow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
  },
  card: {
    width: '90%',
    maxWidth: 340,
    height: 200,
    backgroundColor: ExtranetColors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: ExtranetColors.borderLight,
    padding: Spacing.xl,
    justifyContent: 'space-between',
    overflow: 'hidden',
    ...Shadows.cardElevated,
  },
  brandBar: { position: 'absolute', top: 0, left: 0, right: 0, height: 4 },
  brandStripe: { flex: 1 },
  router: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  signalBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  bar: {
    width: 5,
    backgroundColor: Brand.accent,
    borderRadius: 2,
  },
  homeRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  homeIcon: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedBadge: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    backgroundColor: Brand.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  devices: { flexDirection: 'row', gap: Spacing.sm },
  device: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: ExtranetColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedLabel: { gap: 8 },
  speedLine: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Brand.accent,
    width: '65%',
    opacity: 0.7,
  },
  speedLineShort: { width: '40%', opacity: 0.4 },
});
