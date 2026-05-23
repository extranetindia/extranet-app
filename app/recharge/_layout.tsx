import { Stack } from 'expo-router';

import { Brand } from '@/constants/extranet-theme';

export default function RechargeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Brand.background },
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="billing" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="success" options={{ animation: 'fade' }} />
      <Stack.Screen name="failed" options={{ animation: 'fade' }} />
      <Stack.Screen name="receipt" />
    </Stack>
  );
}
