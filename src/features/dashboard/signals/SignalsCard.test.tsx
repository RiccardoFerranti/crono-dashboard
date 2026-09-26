import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest';

import { getSignals } from '@/api/signals/service';
import type { Signal } from '@/api/signals/types';

import { SignalsCard } from './SignalsCard';

vi.mock('@/api/signals/service', () => ({
  getSignals: vi.fn(),
  completeSignal: vi.fn(),
  deleteSignal: vi.fn(),
}));

beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

afterAll(() => {
  vi.unstubAllGlobals();
});

afterEach(() => {
  vi.resetAllMocks();
});

function renderSignalsCard() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <SignalsCard />
    </QueryClientProvider>,
  );
}

test('renders an error state and retries loading signals', async () => {
  const signals: Signal[] = [
    {
      id: 'signal-001',
      category: 'role-change',
      inSequence: false,
      message: [{ text: 'Robert Smith', emphasis: 'strong' }],
      date: '2025-04-02',
      image: { src: 'medium.svg', alt: 'Medium' },
    },
  ];
  let resolveRetry: (value: Signal[]) => void;
  const retryPromise = new Promise<Signal[]>((resolve) => {
    resolveRetry = resolve;
  });

  vi.mocked(getSignals).mockRejectedValueOnce(new Error('Signals unavailable')).mockReturnValueOnce(retryPromise);

  const user = userEvent.setup();
  renderSignalsCard();

  expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load signals.');
  expect(screen.getByLabelText('Signals count unavailable')).toHaveTextContent('—');
  const retryButton = screen.getByRole('button', { name: 'Retry loading signals' });

  await user.click(retryButton);
  await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());

  resolveRetry!(signals);

  expect(await screen.findByText('Robert Smith')).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(getSignals).toHaveBeenCalledTimes(2);
});
