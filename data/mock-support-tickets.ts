export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'scheduled';

export type IssueCategory = {
  id: string;
  label: string;
  icon: string;
};

export type TimelineEvent = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  completed: boolean;
};

export type SupportTicket = {
  id: string;
  category: string;
  subject: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  description: string;
  technicianVisit?: {
    date: string;
    slot: string;
    engineer: string;
    phone: string;
  };
  timeline: TimelineEvent[];
};

export const ISSUE_CATEGORIES: IssueCategory[] = [
  { id: 'slow', label: 'Slow internet', icon: 'speedometer-outline' },
  { id: 'no-net', label: 'No connectivity', icon: 'cloud-offline-outline' },
  { id: 'billing', label: 'Billing issue', icon: 'receipt-outline' },
  { id: 'router', label: 'Router / Wi‑Fi', icon: 'wifi-outline' },
  { id: 'relocation', label: 'Relocation', icon: 'home-outline' },
  { id: 'other', label: 'Other', icon: 'ellipsis-horizontal' },
];

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: 'TKT-28491',
    category: 'Slow internet',
    subject: 'Speed below 100 Mbps during evenings',
    status: 'in_progress',
    createdAt: '22 May 2026',
    updatedAt: '23 May 2026',
    description: 'Speed drops after 7 PM. Speed test shows 80–90 Mbps on 300 Mbps plan.',
    technicianVisit: {
      date: '25 May 2026',
      slot: '10:00 AM – 1:00 PM',
      engineer: 'Vikram S.',
      phone: '+91 98XXX XXXX',
    },
    timeline: [
      { id: '1', title: 'Ticket raised', subtitle: 'Via app', time: '22 May, 4:12 PM', completed: true },
      { id: '2', title: 'Assigned to L1 support', subtitle: 'Agent Priya M.', time: '22 May, 4:28 PM', completed: true },
      { id: '3', title: 'Technician visit scheduled', subtitle: '25 May slot confirmed', time: '23 May, 9:15 AM', completed: true },
      { id: '4', title: 'Resolution pending', subtitle: 'Awaiting field visit', time: '—', completed: false },
    ],
  },
  {
    id: 'TKT-28102',
    category: 'Billing issue',
    subject: 'Duplicate charge on April bill',
    status: 'resolved',
    createdAt: '10 May 2026',
    updatedAt: '12 May 2026',
    description: 'Charged twice for April renewal.',
    timeline: [
      { id: '1', title: 'Ticket raised', subtitle: 'Via app', time: '10 May, 11:00 AM', completed: true },
      { id: '2', title: 'Refund initiated', subtitle: '₹942 credit', time: '12 May, 2:30 PM', completed: true },
      { id: '3', title: 'Resolved', subtitle: 'Closed', time: '12 May, 3:00 PM', completed: true },
    ],
  },
];
