import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, test, vi } from 'vitest';

import { getPerformanceKpis } from '@/api/performance/service';
import type { PerformanceKpi } from '@/api/performance/types';

import { PerformanceCard } from './PerformanceCard';

vi.mock('@/api/performance/service', () => ({
  getPerformanceKpis: vi.fn(),
}));

afterEach(() => {
  vi.resetAllMocks();
});

function renderPerformanceCard() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <PerformanceCard />
    </QueryClientProvider>,
  );
}

test('renders an initial error and retries the performance query', async () => {
  const kpis: PerformanceKpi[] = [
    { id: 'contacts-engaged', type: 'contacts-engaged', label: 'Contacts engaged', current: 0, target: 500 },
  ];
  let resolveRetry: (value: PerformanceKpi[]) => void;
  const retryPromise = new Promise<PerformanceKpi[]>((resolve) => {
    resolveRetry = resolve;
  });

  vi.mocked(getPerformanceKpis).mockRejectedValueOnce(new Error('Performance unavailable')).mockReturnValueOnce(retryPromise);

  const user = userEvent.setup();
  renderPerformanceCard();

  expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load performance data.');
  const retryButton = screen.getByRole('button', { name: 'Retry loading performance data' });

  await user.click(retryButton);

  resolveRetry!(kpis);

  expect(await screen.findByText('Contacts engaged')).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(getPerformanceKpis).toHaveBeenCalledTimes(2);
});
