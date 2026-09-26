import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useSignalMutations } from './mutations';
import { completeSignal } from './service';
import type { Signal } from './types';

vi.mock('./service', () => ({
  completeSignal: vi.fn(),
  deleteSignal: vi.fn(),
}));

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });

  return { promise, resolve };
}

const completedSignal: Signal = {
  id: 'signal-001',
  category: 'role-change',
  inSequence: false,
  message: [{ text: 'Robert Smith', emphasis: 'strong' }],
  date: '2025-04-02',
  image: { src: 'medium.svg', alt: 'Medium' },
};

describe('useSignalMutations', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should allow another complete mutation for an ID after the in-flight mutation settles', async () => {
    const firstCompletion = deferred<Signal>();
    const secondCompletion = deferred<Signal>();
    vi.mocked(completeSignal).mockReturnValueOnce(firstCompletion.promise).mockReturnValueOnce(secondCompletion.promise);
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => useSignalMutations(), { wrapper });

    act(() => {
      result.current.completeSignal(completedSignal.id);
      result.current.completeSignal(completedSignal.id);
    });

    await waitFor(() => expect(completeSignal).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(result.current.pendingIds.has(completedSignal.id)).toBe(true));

    await act(async () => {
      firstCompletion.resolve(completedSignal);
      await firstCompletion.promise;
    });

    await waitFor(() => {
      expect(result.current.pendingIds.has(completedSignal.id)).toBe(false);
    });

    act(() => result.current.completeSignal(completedSignal.id));

    await waitFor(() => expect(completeSignal).toHaveBeenCalledTimes(2));

    await act(async () => {
      secondCompletion.resolve(completedSignal);
      await secondCompletion.promise;
    });
  });
});
