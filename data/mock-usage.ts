export type DailyUsage = {
  day: string;
  gb: number;
};

export type ConnectedDevice = {
  id: string;
  name: string;
  type: 'phone' | 'laptop' | 'tv' | 'iot' | 'tablet';
  ip: string;
  usageGb: number;
  connected: boolean;
};

export const MOCK_USAGE_SUMMARY = {
  monthLabel: 'May 2026',
  totalGb: 428,
  limitGb: 'Unlimited',
  avgSpeedMbps: 298,
  uptimePercent: 99.7,
  peakDay: 'Sat, 17 May',
};

export const MOCK_MONTHLY_USAGE: DailyUsage[] = [
  { day: '1', gb: 12 },
  { day: '5', gb: 18 },
  { day: '10', gb: 14 },
  { day: '15', gb: 22 },
  { day: '20', gb: 19 },
  { day: '25', gb: 16 },
  { day: '30', gb: 21 },
];

export const MOCK_DAILY_HOURS = [
  { hour: '6am', gb: 0.4 },
  { hour: '9am', gb: 1.2 },
  { hour: '12pm', gb: 2.1 },
  { hour: '3pm', gb: 1.8 },
  { hour: '6pm', gb: 3.4 },
  { hour: '9pm', gb: 4.2 },
  { hour: '12am', gb: 1.1 },
];

export const MOCK_CONNECTED_DEVICES: ConnectedDevice[] = [
  { id: '1', name: 'Rahul\'s iPhone', type: 'phone', ip: '192.168.1.12', usageGb: 42, connected: true },
  { id: '2', name: 'MacBook Pro', type: 'laptop', ip: '192.168.1.18', usageGb: 128, connected: true },
  { id: '3', name: 'Living Room TV', type: 'tv', ip: '192.168.1.24', usageGb: 86, connected: true },
  { id: '4', name: 'Smart Hub', type: 'iot', ip: '192.168.1.31', usageGb: 3.2, connected: true },
  { id: '5', name: 'Guest Tablet', type: 'tablet', ip: '—', usageGb: 0, connected: false },
];
