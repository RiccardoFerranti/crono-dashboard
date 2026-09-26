import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { getRepliesSummary } from '@/api/replies/service';
import { RepliesCard } from '@/features/dashboard/replies/Replies';
import { renderWithQueryClient } from '@/test/renderWithQueryClient';

import { Sidebar } from './Sidebar';

vi.mock('@/api/replies/service', () => ({
  getRepliesSummary: vi.fn(),
}));

function renderSidebarAndReplies() {
  return renderWithQueryClient(
    <>
      <Sidebar />
      <RepliesCard />
    </>,
  );
}

function renderSidebar() {
  return renderWithQueryClient(<Sidebar />);
}

describe('Sidebar', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should share a successful zero unread count with the sidebar Inbox badge', async () => {
    vi.mocked(getRepliesSummary).mockResolvedValue({ unreadCount: 0 });

    renderSidebarAndReplies();

    const inboxItem = screen.getByText('Inbox').closest('li');
    const repliesCard = screen.getByRole('heading', { name: 'Replies' }).closest('section');

    expect(inboxItem).not.toBeNull();
    expect(repliesCard).not.toBeNull();
    expect(await within(inboxItem!).findByText('0')).toBeInTheDocument();
    expect(await within(repliesCard!).findByText('0')).toBeInTheDocument();
    expect(getRepliesSummary).toHaveBeenCalledTimes(1);
  });

  it('should share an unavailable unread count with the sidebar Inbox badge', async () => {
    vi.mocked(getRepliesSummary).mockRejectedValue(new Error('Replies unavailable'));

    renderSidebarAndReplies();

    expect(await screen.findByLabelText('Count unavailable')).toHaveTextContent('—');
    expect(screen.getByLabelText('Unread count unavailable')).toHaveTextContent('—');
    expect(getRepliesSummary).toHaveBeenCalledTimes(1);
  });

  it('should collapse and expand the complete sidebar navigation', async () => {
    vi.mocked(getRepliesSummary).mockResolvedValue({ unreadCount: 3 });
    const user = userEvent.setup();

    renderSidebar();

    const collapseControl = screen.getByRole('button', { name: 'Collapse sidebar' });

    expect(collapseControl).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    for (const label of ['Dashboard', 'Find New', 'Lists', 'Templates', 'Sequences', 'Tasks', 'Inbox', 'Deals', 'Analytics']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    expect(screen.getByText('Trial ends in 2 days')).toBeInTheDocument();

    await user.click(collapseControl);

    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Trial ends in 2 days')).not.toBeInTheDocument();
    expect(screen.queryByText('William Robertson')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Expand sidebar' }));

    expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Trial ends in 2 days')).toBeInTheDocument();
    expect(screen.getByText('William Robertson')).toBeInTheDocument();
  });
});
