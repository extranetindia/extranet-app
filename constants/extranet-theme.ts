/**
 * Extranet ISP — centralized brand design system
 * Enterprise telecom · Airtel / ACT / JioFiber inspired
 */

/** Core brand palette */
export const Brand = {
  primary: '#0B4EA2',
  accent: '#2D7FF9',
  red: '#D71920',
  navy: '#071426',
  background: '#F5F7FA',
  white: '#FFFFFF',
} as const;

/** Semantic colors — light surfaces (dashboard, onboarding forms) */
export const ExtranetColors = {
  ...Brand,

  // Surfaces
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  backgroundMuted: '#EDF1F6',

  // Text on light backgrounds
  text: '#071426',
  textSecondary: '#4A5D73',
  textMuted: '#7A8C9E',
  textInverse: '#FFFFFF',
  textInverseMuted: 'rgba(255, 255, 255, 0.72)',
  textInverseSubtle: 'rgba(255, 255, 255, 0.52)',

  // Borders & dividers
  border: '#DDE4EC',
  borderLight: '#E8EDF3',
  borderFocus: '#2D7FF9',

  // Brand aliases (used across components)
  primaryBlue: Brand.primary,
  accentBlue: Brand.accent,
  telecomRed: Brand.red,
  darkNavy: Brand.navy,

  // Status
  success: '#0D7A4E',
  successBg: '#E6F4EE',
  successBorder: '#B8E0CC',
  warning: '#B45309',
  warningBg: '#FEF3E2',
  error: Brand.red,
  errorBg: '#FDECEC',
  errorBorder: '#F5C4C6',

  // Interactive states
  primaryMuted: 'rgba(11, 78, 162, 0.08)',
  accentMuted: 'rgba(45, 127, 249, 0.12)',
  redMuted: 'rgba(215, 25, 32, 0.08)',

  // Dark screen surfaces (splash)
  navy800: '#0A1D38',
  navy700: '#0C2445',
  navy600: '#14325A',
  cardBgDark: 'rgba(255, 255, 255, 0.06)',
  cardBorderDark: 'rgba(255, 255, 255, 0.1)',
  inputBgDark: 'rgba(255, 255, 255, 0.08)',
  inputBorderDark: 'rgba(255, 255, 255, 0.14)',
  overlay: 'rgba(7, 20, 38, 0.92)',

  // Legacy aliases → brand (smooth migration)
  navy900: Brand.navy,
  electricBlue: Brand.accent,
  electricBlueDim: Brand.primary,
  blue500: Brand.accent,
  blue600: Brand.primary,
  white: Brand.white,
  white90: 'rgba(255, 255, 255, 0.9)',
  white70: 'rgba(255, 255, 255, 0.72)',
  white50: 'rgba(255, 255, 255, 0.52)',
  white20: 'rgba(255, 255, 255, 0.2)',
  white10: 'rgba(255, 255, 255, 0.1)',
  cardBg: 'rgba(255, 255, 255, 0.06)',
  cardBorder: '#DDE4EC',
  inputBg: Brand.white,
  inputBorder: '#DDE4EC',
} as const;

export const Gradients = {
  primaryButton: [Brand.primary, Brand.accent] as const,
  primaryButtonPressed: ['#094389', '#2568D4'] as const,
  heroCard: [Brand.primary, '#1565C0'] as const,
  heroCardAccent: [Brand.primary, Brand.accent] as const,
  splashBackground: [Brand.navy, '#0A1D38', Brand.navy] as const,
  planStandard: ['#FFFFFF', '#F5F7FA'] as const,
  planPremium: [Brand.primary, Brand.accent] as const,
  planGiga: ['#0A3D7A', Brand.primary] as const,
  planFiber: [Brand.navy, Brand.primary] as const,
  promoBlue: [Brand.primary, Brand.accent] as const,
  promoRed: [Brand.red, '#A81218'] as const,
  promoTeal: ['#0B4EA2', '#0D7A6E'] as const,
} as const;

export type ScreenTone = 'light' | 'dark' | 'splash';

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  massive: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
} as const;

export const Typography = {
  hero: { fontSize: 32, lineHeight: 40, fontWeight: '700' as const, letterSpacing: -0.5 },
  h1: { fontSize: 28, lineHeight: 36, fontWeight: '700' as const, letterSpacing: -0.3 },
  h2: { fontSize: 22, lineHeight: 28, fontWeight: '600' as const, letterSpacing: -0.2 },
  h3: { fontSize: 18, lineHeight: 24, fontWeight: '600' as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  bodyMedium: { fontSize: 16, lineHeight: 24, fontWeight: '500' as const },
  small: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' as const },
  button: { fontSize: 16, lineHeight: 24, fontWeight: '600' as const, letterSpacing: 0.2 },
  label: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600' as const,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
  },
} as const;

export const Shadows = {
  sm: {
    shadowColor: Brand.navy,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    shadowColor: Brand.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  cardElevated: {
    shadowColor: Brand.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  button: {
    shadowColor: Brand.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

/** Resolve text color from tone + screen */
export function textColorForTone(
  tone: 'default' | 'secondary' | 'muted' | 'inverse' | 'brand' | 'danger',
  screen: ScreenTone = 'light',
): string {
  if (tone === 'brand') return ExtranetColors.primary;
  if (tone === 'danger') return ExtranetColors.error;
  if (screen === 'dark' || screen === 'splash') {
    if (tone === 'inverse' || tone === 'default') return ExtranetColors.textInverse;
    if (tone === 'secondary') return ExtranetColors.textInverseMuted;
    return ExtranetColors.textInverseSubtle;
  }
  if (tone === 'default') return ExtranetColors.text;
  if (tone === 'secondary') return ExtranetColors.textSecondary;
  return ExtranetColors.textMuted;
}
