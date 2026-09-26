import { performanceKpisFixture } from './data';
import type { PerformanceKpi } from './types';

const performanceLoadingDelay = 500;

export async function getPerformanceKpis(): Promise<PerformanceKpi[]> {
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, performanceLoadingDelay);
  });

  return performanceKpisFixture.map((kpi) => ({ ...kpi }));
}
