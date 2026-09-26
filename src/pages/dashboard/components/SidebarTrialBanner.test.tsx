import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SidebarTrialBanner } from './SidebarTrialBanner';

describe('SidebarTrialBanner', () => {
  it('should render the supplied trial duration and upgrade action', () => {
    render(<SidebarTrialBanner days={5} />);

    expect(screen.getByText('Trial ends in 5 days')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Upgrade plan' })).toBeInTheDocument();
  });
});
