import { screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { getPerformanceKpis } from '@/api/performance/service';
import { getRepliesSummary } from '@/api/replies/service';
import { getSignals } from '@/api/signals/service';
import { getTasksSummary } from '@/api/tasks/service';
import { renderWithQueryClient } from '@/test/renderWithQueryClient';

import { DashboardPage } from './DashboardPage';

vi.mock('@/api/performance/service', () => ({
  getPerformanceKpis: vi.fn(),
}));

vi.mock('@/api/replies/service', () => ({
  getRepliesSummary: vi.fn(),
}));

vi.mock('@/api/signals/service', () => ({
  getSignals: vi.fn(),
  completeSignal: vi.fn(),
  deleteSignal: vi.fn(),
}));

vi.mock('@/api/tasks/service', () => ({
  getTasksSummary: vi.fn(),
}));

describe('DashboardPage', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should compose the major dashboard sections', async () => {
    vi.mocked(getRepliesSummary).mockResolvedValue({ unreadCount: 7 });
    vi.mocked(getTasksSummary).mockResolvedValue({
      overdueCount: 1,
      pendingManualCount: 2,
      pendingAutoCount: 3,
      pendingAutoErrorCount: 0,
      completedCount: 4,
    });
    vi.mocked(getSignals).mockResolvedValue([
      {
        id: 'dashboard-signal',
        category: 'role-change',
        inSequence: false,
        message: [{ text: 'Dashboard signal', emphasis: 'strong' }],
        date: '2025-04-02',
        image: { src: 'medium.svg', alt: 'Medium' },
      },
    ]);
    vi.mocked(getPerformanceKpis).mockResolvedValue([
      { id: 'dashboard-kpi', type: 'contacts-engaged', label: 'Dashboard KPI', current: 1, target: 10 },
    ]);

    renderWithQueryClient(<DashboardPage />);

    expect(screen.getByRole('complementary', { name: 'Sidebar' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('main', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Welcome Alex,' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Replies' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Today’s tasks' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Signals' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'May’s performance' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Onboarding' })).toBeInTheDocument();
    expect(await screen.findByText('Dashboard signal')).toBeInTheDocument();
  });
});
