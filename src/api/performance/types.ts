export type PerformanceKpiType = 'contacts-engaged' | 'companies-engaged' | 'activities' | 'meetings' | 'deals' | 'pipeline';

export type PerformanceKpi = {
  id: string;
  type: PerformanceKpiType;
  label: string;
  current: number;
  target: number;
};
