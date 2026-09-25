import type { PerformanceKpi } from './types';

export const performanceKpisFixture: PerformanceKpi[] = [
  { id: 'contacts-engaged', type: 'contacts-engaged', label: 'Contacts engaged', current: 0, target: 500 },
  { id: 'companies-engaged', type: 'companies-engaged', label: 'Companies engaged', current: 0, target: 500 },
  { id: 'activities', type: 'activities', label: 'Activities', current: 1000, target: 2000 },
  { id: 'meetings', type: 'meetings', label: 'Meetings', current: 20, target: 30 },
  { id: 'deals', type: 'deals', label: 'Deals', current: 100, target: 200 },
  { id: 'pipeline', type: 'pipeline', label: 'Pipeline', current: 50000, target: 100000 },
];
