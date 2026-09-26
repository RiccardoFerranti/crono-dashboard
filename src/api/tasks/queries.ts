import { useQuery } from '@tanstack/react-query';

import { getTasksSummary } from './service';

export const tasksQueryKeys = {
  summary: ['tasks'] as const,
};

export function useTasksSummary() {
  return useQuery({
    queryKey: tasksQueryKeys.summary,
    queryFn: getTasksSummary,
    staleTime: Infinity,
    retry: false,
  });
}
