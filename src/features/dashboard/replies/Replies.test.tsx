import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';

import { getRepliesSummary } from '@/api/replies/service';

import { RepliesCard } from './Replies';

vi.mock('@/api/replies/service', () => ({
  getRepliesSummary: vi.fn(),
}));

afterEach(() => {
  vi.resetAllMocks();
});

function renderRepliesCard() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RepliesCard />
    </QueryClientProvider>,
  );
}

test('renders a successful zero unread count', async () => {
  vi.mocked(getRepliesSummary).mockResolvedValue({ unreadCount: 0 });

  renderRepliesCard();

  expect(await screen.findByText('0')).toBeInTheDocument();
  expect(screen.queryByLabelText('Unread count unavailable')).not.toBeInTheDocument();
});

test('renders an unavailable unread count when the query fails', async () => {
  vi.mocked(getRepliesSummary).mockRejectedValue(new Error('Replies unavailable'));

  renderRepliesCard();

  expect(await screen.findByLabelText('Unread count unavailable')).toHaveTextContent('—');
});
