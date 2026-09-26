import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('should render children and forward native button props', () => {
    render(
      <Button disabled aria-label="Save changes">
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save changes' });

    expect(button).toHaveTextContent('Save');
    expect(button).toBeDisabled();
  });

  it('should compose a custom class name', () => {
    render(<Button className="custom-button">Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass('custom-button');
  });
});
