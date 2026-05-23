export type NotificationType = 'renewal' | 'maintenance' | 'outage' | 'offer';

export type AppNotification = {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  actionLabel?: string;
};

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: '1',
    type: 'renewal',
    title: 'Plan renews in 23 days',
    body: 'Your Ultra 300 plan renews on 15 Jun 2026. Recharge early to avoid interruption.',
    time: '2h ago',
    read: false,
    actionLabel: 'Renew now',
  },
  {
    id: '2',
    type: 'offer',
    title: 'Upgrade to 500 Mbps — save ₹200',
    body: 'Limited offer for Prestige Lakeside residents. Valid till 31 May.',
    time: 'Yesterday',
    read: false,
    actionLabel: 'View offer',
  },
  {
    id: '3',
    type: 'maintenance',
    title: 'Scheduled maintenance — 28 May',
    body: 'Brief outage expected 2:00–4:00 AM in Bellandur zone for fiber upgrades.',
    time: '2 days ago',
    read: true,
  },
  {
    id: '4',
    type: 'outage',
    title: 'Resolved: Brief outage on 20 May',
    body: 'A localized issue affected ORR segment. Service restored at 11:42 PM.',
    time: '3 days ago',
    read: true,
  },
  {
    id: '5',
    type: 'renewal',
    title: 'Payment receipt — May 2026',
    body: '₹942 received for Ultra 300. Transaction EXT8K2M9P1.',
    time: '8 May',
    read: true,
    actionLabel: 'View receipt',
  },
  {
    id: '6',
    type: 'offer',
    title: 'Refer & earn ₹500',
    body: 'Invite neighbours in your society. Both get ₹500 credit.',
    time: '12 May',
    read: true,
  },
];
