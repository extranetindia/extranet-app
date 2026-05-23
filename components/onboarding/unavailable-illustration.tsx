import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

export function UnavailableIllustration() {
  return (
    <View style={styles.container}>
      <View style={styles.outerRing}>
        <View style={styles.innerRing}>
          <View style={styles.iconCircle}>
            <Ionicons name="map-outline" size={48} color={ExtranetColors.textMuted} />
            <View style={styles.pin}>
              <Ionicons name="location" size={18} color={Brand.red} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.lg,
  },
  outerRing: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: ExtranetColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ExtranetColors.backgroundMuted,
  },
  innerRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: ExtranetColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: ExtranetColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pin: {
    position: 'absolute',
    bottom: -2,
    right: -4,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: ExtranetColors.surface,
    borderWidth: 2,
    borderColor: Brand.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
