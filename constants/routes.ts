import type { Href } from 'expo-router';

/** Typed route helpers until Expo regenerates route types */
export const Routes = {
  recharge: '/recharge' as Href,
  rechargeBilling: '/recharge/billing' as Href,
  rechargePayment: '/recharge/payment' as Href,
  rechargeSuccess: '/recharge/success' as Href,
  rechargeFailed: '/recharge/failed' as Href,
  rechargeReceipt: '/recharge/receipt' as Href,
  subscription: '/subscription' as Href,
  usage: '/usage' as Href,
  notifications: '/notifications' as Href,
  supportTickets: '/support-tickets' as Href,
  supportTicketNew: '/support-tickets/new' as Href,
  routerMgmt: '/router-mgmt' as Href,
  routerDevices: '/router-mgmt/devices' as Href,
  routerWifi: '/router-mgmt/wifi' as Href,
  tabs: '/(tabs)' as Href,
  plans: '/(tabs)/plans' as Href,
  support: '/support' as Href,
  account: '/(tabs)/account' as Href,
} as const;

export function ticketDetail(id: string): Href {
  return `/support-tickets/${id}` as Href;
}
