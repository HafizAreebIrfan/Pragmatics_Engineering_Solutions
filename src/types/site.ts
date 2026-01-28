export interface PowerMetrics {
  solar: number;
  wind: number;
  grid: number;
  pvSize?: number;
}

export interface Site {
  id: string;
  name: string;
  location?: string;
  lastUpdated: string;
  powerMetrics: PowerMetrics;
  efficiency: number;
  status: 'online' | 'offline' | 'warning';
  alarmCount?: number;
}

export interface SiteDetail extends Site {
  load: number;
  devices: Device[];
  alarms: Alarm[];
}

export interface Device {
  id: string;
  name: string;
  type: 'solar' | 'wind' | 'grid' | 'pcs' | 'inverter' | 'meter';
  status: 'online' | 'offline' | 'warning';
  output: number;
  unit: string;
}

export interface Alarm {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info' | 'resolved';
  deviceName: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface LiveParameter {
  name: string;
  value: number;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
}
