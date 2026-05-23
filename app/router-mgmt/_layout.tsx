import { Stack } from 'expo-router';

import { Brand } from '@/constants/extranet-theme';

export default function RouterMgmtLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Brand.background },
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="devices" />
      <Stack.Screen name="wifi" />
    </Stack>
  );
}
