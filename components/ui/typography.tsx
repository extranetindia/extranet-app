import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

import {
  ExtranetColors,
  Typography,
  textColorForTone,
  type ScreenTone,
} from '@/constants/extranet-theme';

type Variant = keyof typeof Typography;
type TextTone = 'default' | 'secondary' | 'muted' | 'inverse' | 'brand' | 'danger';

type AppTextProps = TextProps & {
  variant?: Variant;
  tone?: TextTone;
  screen?: ScreenTone;
  color?: string;
  align?: TextStyle['textAlign'];
};

export function AppText({
  variant = 'body',
  tone = 'default',
  screen = 'light',
  color,
  align,
  style,
  ...rest
}: AppTextProps) {
  const resolvedColor = color ?? textColorForTone(tone, screen);
  return (
    <Text
      style={[Typography[variant], { color: resolvedColor, textAlign: align }, style]}
      {...rest}
    />
  );
}

export function AppHeading(
  props: Omit<AppTextProps, 'variant'> & { level?: 1 | 2 | 3 | 'hero' },
) {
  const { level = 1, ...rest } = props;
  const variant =
    level === 'hero' ? 'hero' : level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3';
  return <AppText variant={variant} {...rest} />;
}

export const textStyles = StyleSheet.create({
  muted: { color: ExtranetColors.textMuted },
  brand: { color: ExtranetColors.primary },
  accent: { color: ExtranetColors.accent },
});
