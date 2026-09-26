import { screen } from '@testing-library/react';
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

  it('should render a successful zero unread count', async () => {
    vi.mocked(getRepliesSummary).mockResolvedValue({ unreadCount: 0 });

    renderRepliesCard();

    expect(await screen.findByText('0')).toBeInTheDocument();
    expect(screen.queryByLabelText('Unread count unavailable')).not.toBeInTheDocument();
  });

  it('should render an unavailable unread count when the query fails', async () => {
    vi.mocked(getRepliesSummary).mockRejectedValue(new Error('Replies unavailable'));

    renderRepliesCard();

    expect(await screen.findByLabelText('Unread count unavailable')).toHaveTextContent('—');
  });
});
