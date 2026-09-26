import { performanceKpisFixture } from './data';
import type { PerformanceKpi } from './types';
import { mockApiDelay, wait } from '../utils';

export async function getPerformanceKpis(): Promise<PerformanceKpi[]> {
  await wait(mockApiDelay);

  return performanceKpisFixture.map((kpi) => ({ ...kpi }));
}
