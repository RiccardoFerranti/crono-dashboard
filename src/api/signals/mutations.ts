import { useRef } from 'react';
import { useMutation, useMutationState, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { completeSignal, deleteSignal } from './service';
import type { Signal } from './types';
import { signalsQueryKeys } from './queries';

const signalMutationKeys = {
  all: ['signals', 'mutation'] as const,
  complete: ['signals', 'mutation', 'complete'] as const,
  delete: ['signals', 'mutation', 'delete'] as const,
};

export function useSignalMutations() {
  const queryClient = useQueryClient();

  // Safeguard against duplicate actions on the same Signal before the pending state re-renders and hides its row.
  const inFlightIds = useRef(new Set<string>());

  // Read all pending Signal mutations from TanStack's mutation cache.
  // Each mutation receives a signal ID as its variables, so this gives us
  // the IDs to hide optimistically while Complete/Delete are in flight.
  const pendingSignalIds = useMutationState<string>({
    filters: { mutationKey: signalMutationKeys.all, status: 'pending' },
    select: (mutation) => mutation.state.variables as string,
  });

  function removeFromCache(id: string) {
    queryClient.setQueryData<Signal[]>(signalsQueryKeys.list, (signals) => signals?.filter((signal) => signal.id !== id));
  }

  function releaseSignal(id: string) {
    inFlightIds.current.delete(id);
  }

  const completeMutation = useMutation({
    mutationKey: signalMutationKeys.complete,
    mutationFn: completeSignal,
    onSuccess: (_, id) => {
      removeFromCache(id);
      toast.success('Signal completed');
    },
    onError: () => {
      toast.error('Could not complete signal', {
        description: 'The signal was restored. Please try again.',
      });
    },
    onSettled: (_, __, id) => releaseSignal(id),
  });

  const deleteMutation = useMutation({
    mutationKey: signalMutationKeys.delete,
    mutationFn: deleteSignal,
    onSuccess: (_, id) => {
      removeFromCache(id);
      toast.success('Signal deleted');
    },
    onError: () => {
      toast.error('Could not delete signal', {
        description: 'The signal was restored. Please try again.',
      });
    },
    onSettled: (_, __, id) => releaseSignal(id),
  });

  // Start only when this Signal has no mutation in flight; different IDs remain independent.
  function startMutation(id: string, mutate: (signalId: string) => void) {
    if (inFlightIds.current.has(id)) return;

    inFlightIds.current.add(id);
    mutate(id);
  }

  return {
    pendingIds: new Set(pendingSignalIds),
    completeSignal: (id: string) => startMutation(id, completeMutation.mutate),
    deleteSignal: (id: string) => startMutation(id, deleteMutation.mutate),
  };
}
