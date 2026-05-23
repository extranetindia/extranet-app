export type PaymentMethod = {
  id: string;
  type: 'upi' | 'card' | 'netbanking' | 'wallet';
  label: string;
  subtitle: string;
  icon: string;
};

export type Coupon = {
  code: string;
  discount: number;
  type: 'flat' | 'percent';
  label: string;
};

export type BillingLine = {
  id: string;
  label: string;
  amount: number;
  type: 'charge' | 'discount' | 'tax';
};

export type Transaction = {
  id: string;
  date: string;
  time: string;
  planName: string;
  amount: number;
  paymentMethod: string;
  status: 'success' | 'failed';
  txnRef: string;
};

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'upi-gpay', type: 'upi', label: 'Google Pay', subtitle: 'rahul@okaxis', icon: 'phone-portrait-outline' },
  { id: 'upi-phonepe', type: 'upi', label: 'PhonePe UPI', subtitle: 'rahul@ybl', icon: 'phone-portrait-outline' },
  { id: 'card-visa', type: 'card', label: 'Visa •••• 4242', subtitle: 'Expires 08/28', icon: 'card-outline' },
  { id: 'netbanking', type: 'netbanking', label: 'HDFC NetBanking', subtitle: 'Instant debit', icon: 'business-outline' },
  { id: 'wallet-paytm', type: 'wallet', label: 'Paytm Wallet', subtitle: 'Balance ₹1,240', icon: 'wallet-outline' },
  { id: 'fail-demo', type: 'card', label: 'Demo: Fail payment', subtitle: 'Triggers failed state', icon: 'close-circle-outline' },
];

export const MOCK_COUPONS: Coupon[] = [
  { code: 'EXTRANET50', discount: 50, type: 'flat', label: '₹50 off on renewal' },
  { code: 'FIBER10', discount: 10, type: 'percent', label: '10% off monthly bill' },
  { code: 'LOYALTY100', discount: 100, type: 'flat', label: 'Loyalty reward' },
];

export const PLAN_BASE_PRICE = 799;
export const GST_RATE = 0.18;

export function buildBillingLines(
  basePrice: number,
  coupon: Coupon | null,
): BillingLine[] {
  let discount = 0;
  if (coupon) {
    discount =
      coupon.type === 'flat'
        ? coupon.discount
        : Math.round((basePrice * coupon.discount) / 100);
  }
  const subtotal = Math.max(0, basePrice - discount);
  const gst = Math.round(subtotal * GST_RATE);
  const total = subtotal + gst;

  const lines: BillingLine[] = [
    { id: 'plan', label: 'Plan charges (Ultra 300)', amount: basePrice, type: 'charge' },
  ];
  if (discount > 0) {
    lines.push({
      id: 'discount',
      label: `Coupon (${coupon?.code})`,
      amount: -discount,
      type: 'discount',
    });
  }
  lines.push(
    { id: 'gst', label: 'GST (18%)', amount: gst, type: 'tax' },
    { id: 'total', label: 'Amount payable', amount: total, type: 'charge' },
  );
  return lines;
}

export function getTotalFromLines(lines: BillingLine[]): number {
  const totalLine = lines.find((l) => l.id === 'total');
  return totalLine?.amount ?? 0;
}

export function createTransaction(
  amount: number,
  paymentMethod: string,
  status: 'success' | 'failed',
): Transaction {
  const now = new Date();
  return {
    id: `TXN${Date.now().toString().slice(-8)}`,
    date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    planName: 'Extranet Ultra 300',
    amount,
    paymentMethod,
    status,
    txnRef: `EXT${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
  };
}
