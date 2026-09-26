import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './Card';

describe('Card', () => {
  it('should render children and forward section props', () => {
    render(<Card aria-label="Summary">Summary content</Card>);

    expect(screen.getByRole('region', { name: 'Summary' })).toHaveTextContent('Summary content');
  });

  it('should compose a custom class name', () => {
    render(<Card className="custom-card">Summary content</Card>);

    expect(screen.getByText('Summary content').closest('section')).toHaveClass('custom-card');
  });
});
