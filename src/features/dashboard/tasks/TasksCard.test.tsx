import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { getTasksSummary } from '@/api/tasks/service';

import { TasksCard } from './TasksCard';

vi.mock('@/api/tasks/service', () => ({
  getTasksSummary: vi.fn(),
}));

test('renders task counts and errors returned by the summary query', async () => {
  vi.mocked(getTasksSummary).mockResolvedValue({
    overdueCount: 31,
    pendingManualCount: 32,
    pendingAutoCount: 33,
    pendingAutoErrorCount: 2,
    completedCount: 34,
  });

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <TasksCard />
    </QueryClientProvider>,
  );

  expect(await screen.findByText('31')).toBeInTheDocument();
  expect(screen.getByText('32')).toBeInTheDocument();
  expect(screen.getByText('33')).toBeInTheDocument();
  expect(screen.getByText('34')).toBeInTheDocument();
  expect(screen.getByText('2 errors')).toBeInTheDocument();
});
