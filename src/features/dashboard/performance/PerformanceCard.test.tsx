import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { getPerformanceKpis } from '@/api/performance/service';
import type { PerformanceKpi } from '@/api/performance/types';
import { renderWithQueryClient } from '@/test/renderWithQueryClient';

import { PerformanceCard } from './PerformanceCard';

vi.mock('@/api/performance/service', () => ({
  getPerformanceKpis: vi.fn(),
}));

function renderPerformanceCard() {
  return renderWithQueryClient(<PerformanceCard />);
}

describe('PerformanceCard', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render an initial error and retry the performance query', async () => {
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

    await waitFor(() => {
      expect(screen.getByRole('region', { name: 'May’s performance' })).toHaveAttribute('aria-busy', 'true');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    resolveRetry!(kpis);

    expect(await screen.findByText('Contacts engaged')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(getPerformanceKpis).toHaveBeenCalledTimes(2);
  });

  it('should render each KPI returned by a successful query', async () => {
    vi.mocked(getPerformanceKpis).mockResolvedValue([
      { id: 'contacts-engaged', type: 'contacts-engaged', label: 'Contacts engaged', current: 10, target: 500 },
      { id: 'pipeline', type: 'pipeline', label: 'Pipeline', current: 50000, target: 100000 },
    ]);

    renderPerformanceCard();

    expect(await screen.findByText('Contacts engaged')).toBeInTheDocument();
    expect(screen.getByText('Pipeline')).toBeInTheDocument();
  });
});
