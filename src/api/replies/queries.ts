import { useQuery } from '@tanstack/react-query';
import { getRepliesSummary } from './service';

export const repliesQueryKeys = {
  summary: ['replies'] as const,
};

export function useRepliesSummary() {
  return useQuery({
    queryKey: repliesQueryKeys.summary,
    queryFn: getRepliesSummary,
    staleTime: Infinity,
  });
}
