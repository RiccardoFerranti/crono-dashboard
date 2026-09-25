import { performanceKpisFixture } from './data';
import type { PerformanceKpi } from './types';

export async function getPerformanceKpis(): Promise<PerformanceKpi[]> {
  return performanceKpisFixture.map((kpi) => ({ ...kpi }));
}
