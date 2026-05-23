import type { AvailabilityResult, LocationSummary } from '@/types/onboarding';

/** Pincodes where Extranet fiber is live (mock) */
export const AVAILABLE_PINCODES = new Set([
  '400001',
  '400050',
  '560001',
  '560034',
  '110001',
  '110020',
  '700001',
  '411001',
]);

export const MOCK_DETECTED_LOCATION: LocationSummary = {
  pincode: '560034',
  society: 'Prestige Lakeside Habitat',
  areaLabel: 'Bellandur, Outer Ring Road',
  city: 'Bengaluru',
};

export const BENEFITS = [
  { id: '1', icon: 'flash' as const, title: 'Up to 1 Gbps speeds', subtitle: 'Symmetric fiber for work & play' },
  { id: '2', icon: 'wifi' as const, title: 'Free Wi‑Fi 6 router', subtitle: 'Included with every plan' },
  { id: '3', icon: 'headset' as const, title: '24×7 local support', subtitle: 'Average 12 min response time' },
  { id: '4', icon: 'shield-checkmark' as const, title: '99.9% uptime SLA', subtitle: 'Enterprise-grade reliability' },
];

export function checkAvailability(pincode: string): AvailabilityResult {
  const normalized = pincode.replace(/\s/g, '').trim();
  if (normalized.length !== 6) return 'unavailable';
  return AVAILABLE_PINCODES.has(normalized) ? 'available' : 'unavailable';
}

export function getCityForPincode(pincode: string): string {
  const map: Record<string, string> = {
    '400001': 'Mumbai',
    '400050': 'Mumbai',
    '560001': 'Bengaluru',
    '560034': 'Bengaluru',
    '110001': 'New Delhi',
    '110020': 'New Delhi',
    '700001': 'Kolkata',
    '411001': 'Pune',
  };
  return map[pincode] ?? 'Your city';
}

export const SUPPORT_PHONE = '1800-123-4567';
export const SUPPORT_EMAIL = 'hello@extranet.in';
