import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AppFeaturesProvider } from '@/context/app-features-context';
import { CustomerProvider } from '@/context/customer-context';
import { OnboardingProvider } from '@/context/onboarding-context';
import { Brand, ExtranetColors } from '@/constants/extranet-theme';

export const unstable_settings = {
  anchor: '(onboarding)',
};

const ExtranetTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Brand.primary,
    background: Brand.background,
    card: ExtranetColors.surface,
    text: ExtranetColors.text,
    border: ExtranetColors.border,
    notification: Brand.red,
  },
};

export default function RootLayout() {
  return (
    <OnboardingProvider>
      <CustomerProvider>
        <AppFeaturesProvider>
        <ThemeProvider value={ExtranetTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}>
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="recharge" />
            <Stack.Screen name="subscription" />
            <Stack.Screen name="usage" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="support-tickets" />
            <Stack.Screen name="router-mgmt" />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="dark" />
        </ThemeProvider>
        </AppFeaturesProvider>
      </CustomerProvider>
    </OnboardingProvider>
  );
}
