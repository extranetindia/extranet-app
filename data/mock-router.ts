export type RouterDevice = {
  id: string;
  name: string;
  mac: string;
  signal: 'excellent' | 'good' | 'fair';
  band: '5 GHz' | '2.4 GHz';
  dataToday: string;
};

export const MOCK_ROUTER = {
  model: 'Extranet Wi‑Fi 6 ONU',
  firmware: 'v3.2.1',
  uptime: '14 days 6 hours',
  ssid2g: 'Extranet_Home_2G',
  ssid5g: 'Extranet_Home_5G',
  parentalControlEnabled: false,
  lastRestart: '14 days ago',
};

export const MOCK_ROUTER_DEVICES: RouterDevice[] = [
  { id: '1', name: 'Rahul\'s iPhone', mac: 'AA:BB:CC:11:22:01', signal: 'excellent', band: '5 GHz', dataToday: '4.2 GB' },
  { id: '2', name: 'MacBook Pro', mac: 'AA:BB:CC:11:22:18', signal: 'excellent', band: '5 GHz', dataToday: '12.8 GB' },
  { id: '3', name: 'Living Room TV', mac: 'AA:BB:CC:11:22:24', signal: 'good', band: '5 GHz', dataToday: '6.1 GB' },
  { id: '4', name: 'Smart Bulb Hub', mac: 'AA:BB:CC:11:22:31', signal: 'fair', band: '2.4 GHz', dataToday: '120 MB' },
];
