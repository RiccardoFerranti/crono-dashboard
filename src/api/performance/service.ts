import { mockApiDelay, wait } from '../utils';

import { performanceKpisFixture } from './data';
import { type PerformanceKpi, performanceKpisResponseSchema } from './types';

export async function getPerformanceKpis(): Promise<PerformanceKpi[]> {
  await wait(mockApiDelay);
  return performanceKpisResponseSchema.parse(performanceKpisFixture.map((kpi) => ({ ...kpi })));
}
