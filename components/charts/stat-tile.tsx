import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppCard } from '@/components/ui/card';
import { AppText } from '@/components/ui/typography';
import { Brand, ExtranetColors, Radius, Spacing } from '@/constants/extranet-theme';

type StatTileProps = {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent?: string;
};

export function StatTile({ label, value, icon, accent = Brand.primary }: StatTileProps) {
  return (
    <AppCard style={styles.tile}>
      <View style={[styles.iconWrap, { backgroundColor: `${accent}18` }]}>
        <Ionicons name={icon} size={20} color={accent} />
      </View>
      <AppText variant="h3" tone="default">
        {value}
      </AppText>
      <AppText variant="caption" tone="muted">
        {label}
      </AppText>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minWidth: '46%',
    gap: Spacing.xs,
    paddingVertical: Spacing.lg,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
});
