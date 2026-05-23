import { Stack } from 'expo-router';

import { Brand } from '@/constants/extranet-theme';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Brand.background },
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}>
      <Stack.Screen name="index" options={{ animation: 'fade' }} />
      <Stack.Screen name="welcome" options={{ animation: 'fade' }} />
      <Stack.Screen name="availability" />
      <Stack.Screen name="area-available" options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="area-unavailable" />
    </Stack>
  );
}
