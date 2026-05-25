import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/button';
import { AppInput } from '@/components/ui/input';
import { SafeScreen } from '@/components/ui/safe-screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenScroll } from '@/components/ui/screen-scroll';
import { ScreenSkeleton } from '@/components/ui/skeleton';
import { AppText } from '@/components/ui/typography';
import { ExtranetColors, Spacing } from '@/constants/extranet-theme';
import { useAppFeatures } from '@/context/app-features-context';
import { useScreenBootstrap } from '@/hooks/use-screen-bootstrap';

export default function WifiSettingsScreen() {
  const { routerSettings, wifiPassword, setWifiPassword } = useAppFeatures();
  const [ssid5g, setSsid5g] = useState(routerSettings.ssid5g);
  const [ssid2g, setSsid2g] = useState(routerSettings.ssid2g);
  const [password, setPassword] = useState(wifiPassword);
  const [confirm, setConfirm] = useState(wifiPassword);
  const { ready, showLoader } = useScreenBootstrap(360);
  const showSkeleton = showLoader && !ready && !routerSettings.ssid5g;

  const save = () => {
    if (password.length < 8) {
      Alert.alert('Weak password', 'Use at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Mismatch', 'Passwords do not match.');
      return;
    }
    setWifiPassword(password);
    Alert.alert('Saved (mock)', 'Wi-Fi settings updated on your router.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeScreen edges={['top', 'bottom']} tone="light">
      <ScreenScroll bottomInset={100}>
        {showSkeleton ? (
          <ScreenSkeleton rows={4} />
        ) : (
          <>
            <ScreenHeader title="Wi-Fi settings" subtitle="Update network name & password" />
            <AppInput label="5 GHz network name (SSID)" value={ssid5g} onChangeText={setSsid5g} />
            <View style={styles.gap} />
            <AppInput label="2.4 GHz network name (SSID)" value={ssid2g} onChangeText={setSsid2g} />
            <View style={styles.gap} />
            <AppInput
              label="New password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              hint="Minimum 8 characters"
            />
            <View style={styles.gap} />
            <AppInput
              label="Confirm password"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
            />
            <AppText variant="caption" tone="muted" style={styles.note}>
              Changing password will disconnect all devices. Reconnect using the new credentials.
            </AppText>
          </>
        )}
      </ScreenScroll>
      <View style={styles.footer}>
        <AppButton label="Save changes" onPress={save} />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  gap: { height: Spacing.lg },
  note: { marginTop: Spacing.xl, lineHeight: 18 },
  footer: {
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
    backgroundColor: ExtranetColors.surface,
    borderTopWidth: 1,
    borderTopColor: ExtranetColors.borderLight,
  },
});
