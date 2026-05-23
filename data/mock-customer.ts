export type ConnectionStatus = 'online' | 'offline';
export type SubscriptionStatus = 'active' | 'suspended';

export type CustomerPlan = {
  id: string;
  name: string;
  speed: string;
  speedMbps: number;
  price: number;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
  expiryDate: string;
  daysRemaining: number;
  ott: { id: string; label: string; icon: string }[];
};

export type BroadbandPlan = {
  id: string;
  name: string;
  speed: string;
  speedMbps: number;
  price: number;
  originalPrice?: number;
  ott: { id: string; label: string; icon: string }[];
  features: string[];
  recommended?: boolean;
  gradient: [string, string];
};

export type PromoBanner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  gradient: [string, string];
  icon: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const MOCK_CUSTOMER = {
  firstName: 'Rahul',
  lastName: 'Sharma',
  phone: '+91 98765 43210',
  email: 'rahul.sharma@email.com',
  accountId: 'EXT-8847291',
  avatarInitials: 'RS',
  connectionStatus: 'online' as ConnectionStatus,
  subscriptionStatus: 'active' as SubscriptionStatus,
  address: {
    line1: 'Prestige Lakeside Habitat',
    line2: 'Tower 4, Flat 1208',
    area: 'Bellandur, Outer Ring Road',
    city: 'Bengaluru',
    pincode: '560034',
  },
  notificationsEnabled: true,
};

export const MOCK_ACTIVE_PLAN: CustomerPlan = {
  id: 'plan-ultra-300',
  name: 'Extranet Ultra 300',
  speed: '300 Mbps',
  speedMbps: 300,
  price: 799,
  billingCycle: 'monthly',
  expiryDate: '15 Jun 2026',
  daysRemaining: 23,
  ott: [
    { id: 'netflix', label: 'Netflix', icon: 'film' },
    { id: 'prime', label: 'Prime', icon: 'play-circle' },
    { id: 'hotstar', label: 'Hotstar', icon: 'star' },
  ],
};

export const MOCK_SPEED = {
  download: 312,
  upload: 298,
  ping: 8,
  lastTested: '2 hours ago',
};

export const MOCK_PLANS: BroadbandPlan[] = [
  {
    id: 'plan-starter-100',
    name: 'Starter 100',
    speed: '100 Mbps',
    speedMbps: 100,
    price: 499,
    ott: [{ id: 'hotstar', label: 'Hotstar', icon: 'star' }],
    features: ['Unlimited data', 'Wi‑Fi 5 router', 'Free installation'],
    gradient: ['#F5F7FA', '#EDF1F6'],
  },
  {
    id: 'plan-ultra-300',
    name: 'Ultra 300',
    speed: '300 Mbps',
    speedMbps: 300,
    price: 799,
    originalPrice: 999,
    recommended: true,
    ott: [
      { id: 'netflix', label: 'Netflix', icon: 'film' },
      { id: 'prime', label: 'Prime', icon: 'play-circle' },
      { id: 'hotstar', label: 'Hotstar', icon: 'star' },
    ],
    features: ['Unlimited data', 'Wi‑Fi 6 router', '3 OTT apps included'],
    gradient: ['#0B4EA2', '#2D7FF9'],
  },
  {
    id: 'plan-giga-500',
    name: 'Giga 500',
    speed: '500 Mbps',
    speedMbps: 500,
    price: 1099,
    ott: [
      { id: 'netflix', label: 'Netflix', icon: 'film' },
      { id: 'prime', label: 'Prime', icon: 'play-circle' },
      { id: 'hotstar', label: 'Hotstar', icon: 'star' },
      { id: 'sonyliv', label: 'SonyLIV', icon: 'tv' },
    ],
    features: ['Unlimited data', 'Mesh Wi‑Fi 6', '4 OTT apps + gaming port'],
    gradient: ['#071426', '#0B4EA2'],
  },
  {
    id: 'plan-fiber-1g',
    name: 'Fiber 1 Gbps',
    speed: '1 Gbps',
    speedMbps: 1000,
    price: 1499,
    ott: [
      { id: 'netflix', label: 'Netflix', icon: 'film' },
      { id: 'prime', label: 'Prime', icon: 'play-circle' },
      { id: 'hotstar', label: 'Hotstar', icon: 'star' },
      { id: 'sonyliv', label: 'SonyLIV', icon: 'tv' },
      { id: 'zee5', label: 'ZEE5', icon: 'play' },
    ],
    features: ['Symmetric 1 Gbps', 'Premium mesh kit', 'Priority support'],
    gradient: ['#0B4EA2', '#1565C0'],
  },
];

export const MOCK_PROMOS: PromoBanner[] = [
  {
    id: '1',
    title: 'Upgrade to 500 Mbps',
    subtitle: 'Get 3 months OTT free · Limited time',
    cta: 'View offer',
    gradient: ['#0B4EA2', '#2D7FF9'],
    icon: 'rocket',
  },
  {
    id: '2',
    title: 'Refer & earn ₹500',
    subtitle: 'Invite friends in your society',
    cta: 'Refer now',
    gradient: ['#071426', '#0B4EA2'],
    icon: 'gift',
  },
  {
    id: '3',
    title: 'Annual plan — save 15%',
    subtitle: 'Lock price for 12 months',
    cta: 'Explore plans',
    gradient: ['#D71920', '#A81218'],
    icon: 'pricetag',
  },
];

export const MOCK_FAQS: FaqItem[] = [
  {
    id: '1',
    question: 'How do I restart my router?',
    answer: 'Use the Restart Router quick action on Home, or power-cycle your ONU for 30 seconds.',
  },
  {
    id: '2',
    question: 'When will my plan renew?',
    answer: 'Auto-renewal happens on your billing date. You can renew early from the Home dashboard.',
  },
  {
    id: '3',
    question: 'How do I change my Wi‑Fi password?',
    answer: 'Open Account → Router settings (coming soon) or contact support for assistance.',
  },
  {
    id: '4',
    question: 'What if my internet is slow?',
    answer: 'Run a speed test from Quick Actions. If speeds are below your plan, raise a support ticket.',
  },
];

export const MOCK_OUTAGE = {
  hasOutage: false,
  message: 'All systems operational in Bengaluru',
  lastUpdated: 'Updated 12 min ago',
  affectedAreas: [] as string[],
};

export const SUPPORT = {
  whatsapp: '+919876543210',
  phone: '1800-123-4567',
  email: 'support@extranet.in',
};

export const APP_VERSION = '1.0.0';
