import { useQuery } from '@tanstack/react-query';

import { getSignals } from './service';

export const signalsQueryKeys = {
  list: ['signals'] as const,
};

export function useSignals() {
  return useQuery({
    queryKey: signalsQueryKeys.list,
    queryFn: getSignals,
    staleTime: Infinity,
    retry: false,
  });
}
