export type RenewalRecord = {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'failed' | 'pending';
  method: string;
};

export const MOCK_SUBSCRIPTION = {
  negotiatedDiscount: 15,
  negotiatedLabel: 'Society partnership · 15% off',
  billingCycle: 'Monthly',
  nextBillingDate: '15 Jun 2026',
  autoRenew: true,
  memberSince: 'Mar 2024',
};

export const MOCK_RENEWAL_HISTORY: RenewalRecord[] = [
  { id: '1', date: '15 May 2026', amount: 942, status: 'paid', method: 'UPI · GPay' },
  { id: '2', date: '15 Apr 2026', amount: 942, status: 'paid', method: 'Visa ••4242' },
  { id: '3', date: '15 Mar 2026', amount: 942, status: 'paid', method: 'NetBanking' },
  { id: '4', date: '15 Feb 2026', amount: 892, status: 'paid', method: 'UPI · PhonePe' },
  { id: '5', date: '10 Jan 2026', amount: 942, status: 'failed', method: 'Card declined' },
];
