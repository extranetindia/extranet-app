import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/typography';
import type { PaymentMethod } from '@/data/mock-recharge';
import { Brand, ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

type PaymentMethodPickerProps = {
  methods: PaymentMethod[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function PaymentMethodPicker({ methods, selectedId, onSelect }: PaymentMethodPickerProps) {
  return (
    <View style={styles.list}>
      {methods.map((method) => {
        const selected = method.id === selectedId;
        return (
          <Pressable
            key={method.id}
            onPress={() => onSelect(method.id)}
            style={[styles.card, selected && styles.cardSelected]}>
            <View style={[styles.iconWrap, selected && styles.iconSelected]}>
              <Ionicons
                name={method.icon as keyof typeof Ionicons.glyphMap}
                size={22}
                color={selected ? Brand.white : Brand.primary}
              />
            </View>
            <View style={styles.text}>
              <AppText variant="bodyMedium" tone="default">
                {method.label}
              </AppText>
              <AppText variant="caption" tone="muted">
                {method.subtitle}
              </AppText>
            </View>
            <View style={[styles.radio, selected && styles.radioSelected]}>
              {selected && <View style={styles.radioDot} />}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: Spacing.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: ExtranetColors.surface,
    borderWidth: 1.5,
    borderColor: ExtranetColors.borderLight,
    ...Shadows.sm,
  },
  cardSelected: {
    borderColor: Brand.primary,
    backgroundColor: ExtranetColors.primaryMuted,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: ExtranetColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSelected: { backgroundColor: Brand.primary },
  text: { flex: 1, gap: 2 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: ExtranetColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: Brand.primary },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Brand.primary,
  },
});
