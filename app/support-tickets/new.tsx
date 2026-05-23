import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppButton } from '@/components/ui/button';
import { AppInput } from '@/components/ui/input';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { AppText } from '@/components/ui/typography';
import { ISSUE_CATEGORIES, useAppFeatures } from '@/context/app-features-context';
import { ticketDetail } from '@/constants/routes';
import { Brand, ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

export default function NewTicketScreen() {
  const { addTicket } = useAppFeatures();
  const [category, setCategory] = useState(ISSUE_CATEGORIES[0].label);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const submit = () => {
    if (!subject.trim() || !description.trim()) {
      Alert.alert('Missing details', 'Please enter subject and description.');
      return;
    }
    const id = addTicket(category, subject.trim(), description.trim());
    Alert.alert('Ticket created', `Reference: ${id}`, [
      { text: 'OK', onPress: () => router.replace(ticketDetail(id)) },
    ]);
  };

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScreenScroll bottomInset={100}>
        <ScreenHeader title="Raise complaint" subtitle="We respond within 12 min avg." />
        <AppText variant="label" tone="muted" style={styles.label}>
          ISSUE CATEGORY
        </AppText>
        <View style={styles.categories}>
          {ISSUE_CATEGORIES.map((cat) => {
            const selected = category === cat.label;
            return (
              <Pressable
                key={cat.id}
                onPress={() => setCategory(cat.label)}
                style={[styles.catChip, selected && styles.catChipSelected]}>
                <Ionicons
                  name={cat.icon as keyof typeof Ionicons.glyphMap}
                  size={18}
                  color={selected ? Brand.white : Brand.primary}
                />
                <AppText variant="caption" color={selected ? Brand.white : ExtranetColors.text}>
                  {cat.label}
                </AppText>
              </Pressable>
            );
          })}
        </View>
        <AppInput label="Subject" value={subject} onChangeText={setSubject} placeholder="Brief summary" />
        <View style={styles.descWrap}>
          <AppText variant="label" tone="muted" style={styles.descLabel}>
            DESCRIPTION
          </AppText>
          <TextInput
            style={styles.descInput}
            multiline
            numberOfLines={4}
            placeholder="Describe the issue in detail..."
            placeholderTextColor={ExtranetColors.textMuted}
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />
        </View>
      </ScreenScroll>
      <View style={styles.footer}>
        <AppButton label="Submit ticket" onPress={submit} />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: Spacing.md },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.xxl },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: ExtranetColors.border,
    backgroundColor: ExtranetColors.surface,
  },
  catChipSelected: { backgroundColor: Brand.primary, borderColor: Brand.primary },
  descWrap: { marginTop: Spacing.lg, gap: Spacing.sm },
  descLabel: { marginLeft: Spacing.xs },
  descInput: {
    minHeight: 120,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: ExtranetColors.border,
    backgroundColor: ExtranetColors.surface,
    padding: Spacing.lg,
    fontSize: 16,
    color: ExtranetColors.text,
    ...Shadows.sm,
  },
  footer: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
    backgroundColor: ExtranetColors.surface,
    borderTopWidth: 1,
    borderTopColor: ExtranetColors.borderLight,
  },
});
