import { Tabs } from 'expo-router';

import { ExtranetTabBar } from '@/components/navigation/extranet-tab-bar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <ExtranetTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        lazy: true,
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="plans" options={{ title: 'Plans' }} />
      <Tabs.Screen name="support" options={{ title: 'Support' }} />
      <Tabs.Screen name="account" options={{ title: 'Account' }} />
    </Tabs>
  );
}
