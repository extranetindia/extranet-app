import type { BroadbandPlan, CustomerPlan } from '@/data/mock-customer';

type BillingCycle = CustomerPlan['billingCycle'];
type OttItem = CustomerPlan['ott'][number];

const DEFAULT_SPEED_MBPS = 100;
const DEFAULT_PRICE = 0;

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function firstString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return undefined;
}

function firstNumber(...values: unknown[]): number | undefined {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === 'string') {
      const numericText = value.replace(/[^\d.]/g, '');
      if (!numericText) continue;
      const parsed = Number(numericText);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }
  return undefined;
}

function normalizeBillingCycle(value: unknown): BillingCycle {
  const cycle = typeof value === 'string' ? value.toLowerCase() : '';
  if (cycle.includes('annual') || cycle.includes('year')) return 'annual';
  if (cycle.includes('quarter')) return 'quarterly';
  return 'monthly';
}

function formatSpeed(speedMbps: number): string {
  if (speedMbps >= 1000) {
    const gbps = speedMbps / 1000;
    return `${Number.isInteger(gbps) ? gbps : gbps.toFixed(1)} Gbps`;
  }
  return `${speedMbps} Mbps`;
}

export function resolveSpeedMbps(speed: unknown, speedMbps: unknown): number {
  const numericSpeed = firstNumber(speedMbps);
  if (numericSpeed) return numericSpeed;

  if (typeof speed === 'string') {
    const value = firstNumber(speed) ?? DEFAULT_SPEED_MBPS;
    return speed.toLowerCase().includes('gbps') ? value * 1000 : value;
  }

  return DEFAULT_SPEED_MBPS;
}

export function resolveOtt(speedMbps: number): OttItem[] {
  if (speedMbps >= 1000) {
    return [
      { id: 'netflix', label: 'Netflix', icon: 'film' },
      { id: 'prime', label: 'Prime', icon: 'play-circle' },
      { id: 'hotstar', label: 'Hotstar', icon: 'star' },
      { id: 'sonyliv', label: 'SonyLIV', icon: 'tv' },
      { id: 'zee5', label: 'ZEE5', icon: 'play' },
    ];
  }

  if (speedMbps >= 300) {
    return [
      { id: 'netflix', label: 'Netflix', icon: 'film' },
      { id: 'prime', label: 'Prime', icon: 'play-circle' },
      { id: 'hotstar', label: 'Hotstar', icon: 'star' },
      { id: 'sonyliv', label: 'SonyLIV', icon: 'tv' },
    ];
  }

  if (speedMbps >= 100) {
    return [
      { id: 'netflix', label: 'Netflix', icon: 'film' },
      { id: 'prime', label: 'Prime', icon: 'play-circle' },
      { id: 'hotstar', label: 'Hotstar', icon: 'star' },
    ];
  }

  return [{ id: 'hotstar', label: 'Hotstar', icon: 'star' }];
}

export function resolvePlanPrice(...sources: unknown[]): number {
  const values: unknown[] = [];

  for (const source of sources) {
    const record = asRecord(source);
    values.push(
      source,
      record.billingAmount,
      record.amount,
      record.startingPrice,
      record.monthlyPrice,
      record.monthlyAmount,
      record.priceMonthly,
      record.basePrice,
      record.price,
      asRecord(record.price).monthly,
      asRecord(record.price).amount,
      asRecord(record.price).monthlyAmount,
      asRecord(record.pricing).monthly,
      asRecord(record.pricing).amount,
      asRecord(record.pricing).monthlyAmount,
      asRecord(record.billing).amount,
      asRecord(record.billing).monthlyAmount,
    );
  }

  return Math.round(firstNumber(...values) ?? DEFAULT_PRICE);
}

export function mapSubscriptionToCustomerPlan(subscriptionData: unknown): CustomerPlan {
  const subscription = asRecord(subscriptionData);
  const plan = asRecord(subscription.plan);
  const catalogPlan = asRecord(subscription.catalogPlan);
  const billing = asRecord(subscription.billing);
  const pricing = asRecord(subscription.pricing);
  const speedMbps = resolveSpeedMbps(
    firstString(subscription.speed, plan.speed, catalogPlan.speed),
    firstNumber(subscription.speedMbps, plan.speedMbps, catalogPlan.speedMbps),
  );

  return {
    id: firstString(
      subscription.planCatalogId,
      subscription.planId,
      plan.planCatalogId,
      plan.id,
      catalogPlan.id,
      subscription.id,
    ) ?? 'plan-current',
    name: firstString(subscription.planName, plan.name, catalogPlan.name, subscription.name) ?? 'Current plan',
    speed: firstString(subscription.speed, plan.speed, catalogPlan.speed) ?? formatSpeed(speedMbps),
    speedMbps,
    price: resolvePlanPrice(subscription, billing, pricing, plan, catalogPlan),
    billingCycle: normalizeBillingCycle(
      subscription.billingCycle ?? billing.cycle ?? pricing.cycle ?? plan.billingCycle ?? catalogPlan.billingCycle,
    ),
    expiryDate: firstString(
      subscription.expiryDate,
      subscription.nextBillingDate,
      billing.nextBillingDate,
      billing.expiryDate,
    ) ?? '15 Jun 2026',
    daysRemaining: 0,
    ott: resolveOtt(speedMbps),
  };
}

export function mapServerPlanToAppPlan(serverPlanData: unknown): BroadbandPlan {
  const serverPlan = asRecord(serverPlanData);
  const pricing = asRecord(serverPlan.pricing);
  const speedMbps = resolveSpeedMbps(serverPlan.speed, serverPlan.speedMbps);
  const premium = speedMbps >= 300 || serverPlan.id === 'business-pro';
  let gradient: [string, string] = ['#F5F7FA', '#EDF1F6'];

  if (speedMbps >= 1000) {
    gradient = ['#071426', '#0B4EA2'];
  } else if (premium) {
    gradient = ['#071426', '#0B4EA2'];
  } else if (speedMbps >= 100 || serverPlan.id === 'home-stream') {
    gradient = ['#0B4EA2', '#2D7FF9'];
  }

  return {
    id: firstString(serverPlan.id, serverPlan.planCatalogId) ?? 'plan-catalog',
    name: firstString(serverPlan.name, serverPlan.planName, serverPlan.displayName, serverPlan.title) ?? formatSpeed(speedMbps),
    speed: firstString(serverPlan.speed) ?? formatSpeed(speedMbps),
    speedMbps,
    price: resolvePlanPrice(serverPlan, pricing),
    originalPrice: firstNumber(serverPlan.originalPrice, pricing.originalPrice),
    ott: resolveOtt(speedMbps),
    features: Array.isArray(serverPlan.features) ? serverPlan.features.filter((item): item is string => typeof item === 'string') : [],
    recommended: Boolean(serverPlan.popular ?? serverPlan.recommended ?? serverPlan.id === 'home-stream'),
    gradient,
  };
}
