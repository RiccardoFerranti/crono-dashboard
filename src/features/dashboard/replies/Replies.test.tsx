import { screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { getRepliesSummary } from '@/api/replies/service';
import { renderWithQueryClient } from '@/test/renderWithQueryClient';

import { RepliesCard } from './Replies';

vi.mock('@/api/replies/service', () => ({
  getRepliesSummary: vi.fn(),
}));

function renderRepliesCard() {
  return renderWithQueryClient(<RepliesCard />);
}

describe('RepliesCard', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should mark the replies card as busy while the initial request is unresolved', async () => {
    vi.mocked(getRepliesSummary).mockReturnValue(new Promise<never>(() => {}));

    renderRepliesCard();

    await waitFor(() => {
      expect(screen.getByRole('region', { name: 'Replies' })).toHaveAttribute('aria-busy', 'true');
    });
  });

  it('should render a successful zero unread count', async () => {
    vi.mocked(getRepliesSummary).mockResolvedValue({ unreadCount: 0 });

    renderRepliesCard();

    expect(await screen.findByText('0')).toBeInTheDocument();
    expect(screen.queryByText('—')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Unread count unavailable')).not.toBeInTheDocument();
  });

  it('should render an unavailable unread count when the query fails', async () => {
    vi.mocked(getRepliesSummary).mockRejectedValue(new Error('Replies unavailable'));

    renderRepliesCard();

    expect(await screen.findByLabelText('Unread count unavailable')).toHaveTextContent('—');
  });
});
