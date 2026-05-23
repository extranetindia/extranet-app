import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { LayoutAnimation, Platform, Pressable, StyleSheet, UIManager, View } from 'react-native';

import { AppText } from '@/components/ui/typography';
import { MOCK_FAQS } from '@/data/mock-customer';
import { Brand, ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function FaqList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <View style={styles.list}>
      {MOCK_FAQS.map((faq) => {
        const isOpen = expandedId === faq.id;
        return (
          <Pressable
            key={faq.id}
            onPress={() => toggle(faq.id)}
            style={[styles.item, isOpen && styles.itemOpen]}>
            <View style={styles.questionRow}>
              <AppText variant="bodyMedium" tone="default" style={styles.question}>
                {faq.question}
              </AppText>
              <Ionicons
                name={isOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={Brand.primary}
              />
            </View>
            {isOpen && (
              <AppText variant="small" tone="secondary" style={styles.answer}>
                {faq.answer}
              </AppText>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: Spacing.md },
  item: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: ExtranetColors.surface,
    borderWidth: 1,
    borderColor: ExtranetColors.borderLight,
    ...Shadows.sm,
  },
  itemOpen: {
    borderColor: 'rgba(11, 78, 162, 0.35)',
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  question: { flex: 1 },
  answer: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: ExtranetColors.borderLight,
  },
});
