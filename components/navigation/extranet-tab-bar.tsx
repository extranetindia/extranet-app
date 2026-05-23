import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/typography';
import { Brand, ExtranetColors, Radius, Shadows, Spacing } from '@/constants/extranet-theme';

type TabConfig = {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFocused: keyof typeof Ionicons.glyphMap;
};

const TABS: TabConfig[] = [
  { name: 'index', label: 'Home', icon: 'home-outline', iconFocused: 'home' },
  { name: 'plans', label: 'Plans', icon: 'layers-outline', iconFocused: 'layers' },
  { name: 'support', label: 'Support', icon: 'headset-outline', iconFocused: 'headset' },
  { name: 'account', label: 'Account', icon: 'person-outline', iconFocused: 'person' },
];

function TabIcon({
  focused,
  icon,
  iconFocused,
}: {
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  iconFocused: keyof typeof Ionicons.glyphMap;
}) {
  const scale = useSharedValue(focused ? 1.08 : 1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.08 : 1, { damping: 12, stiffness: 200 });
  }, [focused, scale]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={style}>
      <Ionicons
        name={focused ? iconFocused : icon}
        size={22}
        color={focused ? Brand.primary : ExtranetColors.textMuted}
      />
    </Animated.View>
  );
}

export function ExtranetTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, Spacing.sm) }]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const tab = TABS.find((t) => t.name === route.name);
          if (!tab) return null;

          const isFocused = state.index === index;
          const { options } = descriptors[route.key];

          const onPress = () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? tab.label}
              onPress={onPress}
              style={styles.tab}>
              <View style={[styles.indicator, isFocused && styles.indicatorActive]}>
                {isFocused && <View style={styles.activeBar} />}
                <TabIcon focused={isFocused} icon={tab.icon} iconFocused={tab.iconFocused} />
                <AppText
                  variant="caption"
                  color={isFocused ? Brand.primary : ExtranetColors.textMuted}
                  style={[styles.label, isFocused && styles.labelActive]}>
                  {tab.label}
                </AppText>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: ExtranetColors.surface,
    borderTopWidth: 1,
    borderTopColor: ExtranetColors.borderLight,
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.sm,
    ...Shadows.cardElevated,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: { flex: 1, alignItems: 'center' },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    gap: 3,
    minWidth: 68,
    position: 'relative',
    overflow: 'hidden',
  },
  indicatorActive: {
    backgroundColor: ExtranetColors.primaryMuted,
  },
  activeBar: {
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: 3,
    borderRadius: 2,
    backgroundColor: Brand.red,
  },
  label: { fontWeight: '500', fontSize: 11 },
  labelActive: { fontWeight: '700' },
});
