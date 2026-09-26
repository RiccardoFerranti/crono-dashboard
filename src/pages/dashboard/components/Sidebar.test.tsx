import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest';

import { getRepliesSummary } from '@/api/replies/service';
import { RepliesCard } from '@/features/dashboard/replies/Replies';

import { Sidebar } from './Sidebar';

vi.mock('@/api/replies/service', () => ({
  getRepliesSummary: vi.fn(),
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

function renderSidebarAndReplies() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <Sidebar />
      <RepliesCard />
    </QueryClientProvider>,
  );
}

test('shares a successful zero unread count with the sidebar Inbox badge', async () => {
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

test('shares an unavailable unread count with the sidebar Inbox badge', async () => {
  vi.mocked(getRepliesSummary).mockRejectedValue(new Error('Replies unavailable'));

  renderSidebarAndReplies();

  expect(await screen.findByLabelText('Count unavailable')).toHaveTextContent('—');
  expect(screen.getByLabelText('Unread count unavailable')).toHaveTextContent('—');
  expect(getRepliesSummary).toHaveBeenCalledTimes(1);
});
