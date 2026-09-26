import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SidebarItem } from './SidebarItem';

const inboxItem = {
  id: 'inbox',
  label: 'Inbox',
  icon: 'inbox.svg',
};

describe('SidebarItem', () => {
  it('should render its label, badge, and active-page state', () => {
    render(
      <ul>
        <SidebarItem item={inboxItem} active badge={3} badgeAriaLabel="Unread messages" />
      </ul>,
    );

    expect(screen.getByRole('listitem')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Inbox')).toBeInTheDocument();
    expect(screen.getByLabelText('Unread messages')).toHaveTextContent('3');
  });

  it('should hide its label and badge when collapsed', () => {
    render(
      <ul>
        <SidebarItem item={inboxItem} active collapsed badge={3} badgeAriaLabel="Unread messages" />
      </ul>,
    );

    expect(screen.queryByText('Inbox')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Unread messages')).not.toBeInTheDocument();
  });
});
