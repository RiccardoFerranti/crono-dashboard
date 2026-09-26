import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('should forward custom attributes and class names', () => {
    render(<Skeleton aria-label="Loading summary" className="custom-skeleton" data-testid="summary-skeleton" />);

    const skeleton = screen.getByTestId('summary-skeleton');

    expect(skeleton).toHaveAttribute('aria-label', 'Loading summary');
    expect(skeleton).toHaveClass('custom-skeleton');
  });
});
