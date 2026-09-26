import { mockApiDelay, wait } from '../utils';

import { performanceKpisFixture } from './data';
import type { PerformanceKpi } from './types';

export async function getPerformanceKpis(): Promise<PerformanceKpi[]> {
  await wait(mockApiDelay);

  return performanceKpisFixture.map((kpi) => ({ ...kpi }));
}
