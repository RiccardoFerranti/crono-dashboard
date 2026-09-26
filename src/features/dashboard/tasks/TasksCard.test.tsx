import { screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { getTasksSummary } from '@/api/tasks/service';
import { renderWithQueryClient } from '@/test/renderWithQueryClient';

import { TasksCard } from './TasksCard';

vi.mock('@/api/tasks/service', () => ({
  getTasksSummary: vi.fn(),
}));

function renderTasksCard() {
  return renderWithQueryClient(<TasksCard />);
}

describe('TasksCard', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render task counts and errors returned by the summary query', async () => {
    vi.mocked(getTasksSummary).mockResolvedValue({
      overdueCount: 31,
      pendingManualCount: 32,
      pendingAutoCount: 33,
      pendingAutoErrorCount: 2,
      completedCount: 34,
    });

    renderTasksCard();

    expect(await screen.findByText('31')).toBeInTheDocument();
    expect(screen.getByText('32')).toBeInTheDocument();
    expect(screen.getByText('33')).toBeInTheDocument();
    expect(screen.getByText('34')).toBeInTheDocument();
    expect(screen.getByText('2 errors')).toBeInTheDocument();
  });

  it('should render successful zero counts without treating them as unavailable', async () => {
    vi.mocked(getTasksSummary).mockResolvedValue({
      overdueCount: 0,
      pendingManualCount: 0,
      pendingAutoCount: 0,
      pendingAutoErrorCount: 0,
      completedCount: 0,
    });

    renderTasksCard();

    expect((await screen.findAllByText('0')).length).toBe(4);
    expect(screen.queryByLabelText('Count unavailable')).not.toBeInTheDocument();
  });

  it('should render unavailable counts without the pending-auto error badge when the query fails', async () => {
    vi.mocked(getTasksSummary).mockRejectedValue(new Error('Tasks unavailable'));

    renderTasksCard();

    expect((await screen.findAllByLabelText('Count unavailable')).length).toBe(4);
    expect(screen.queryByText(/errors?/)).not.toBeInTheDocument();
  });
});
