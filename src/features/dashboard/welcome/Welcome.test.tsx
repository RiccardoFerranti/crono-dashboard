import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { WelcomeCard } from './Welcome';

describe('WelcomeCard', () => {
  it('should render the welcome message and performance overview', () => {
    render(<WelcomeCard />);

    expect(screen.getByRole('heading', { level: 1, name: 'Welcome Alex,' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Welcome Alex,' })).toHaveTextContent(
      'Here’s your performance overview where you can track your daily and monthly KPIs',
    );
  });
});
