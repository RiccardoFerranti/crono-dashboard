import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { OnboardingCard } from './OnboardingCard';

describe('OnboardingCard', () => {
  it('should render the onboarding steps and their estimated durations', () => {
    render(<OnboardingCard />);

    const onboarding = screen.getByRole('region', { name: 'Onboarding' });

    expect(screen.getByRole('heading', { name: 'Onboarding' })).toBeInTheDocument();
    for (const label of [
      'Integrations Setup',
      'Add new Contact',
      'Create your first sequence',
      'Add contacts to sequence',
      'Run your first task',
    ]) {
      expect(within(onboarding).getByText(label)).toBeInTheDocument();
    }
    expect(within(onboarding).getAllByText('5 min')).toHaveLength(3);
    expect(within(onboarding).getAllByText('10 min')).toHaveLength(2);
  });
});
