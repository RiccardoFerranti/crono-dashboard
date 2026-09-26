import { useQuery } from '@tanstack/react-query';

import { getPerformanceKpis } from './service';

export const performanceQueryKeys = {
  kpis: ['performance', 'kpis'] as const,
};

export function usePerformanceKpis() {
  return useQuery({
    queryKey: performanceQueryKeys.kpis,
    queryFn: getPerformanceKpis,
    staleTime: Infinity,
    retry: false,
  });
}
