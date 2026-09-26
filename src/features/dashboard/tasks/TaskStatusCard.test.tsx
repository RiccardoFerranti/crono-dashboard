import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TaskStatusCard } from './TaskStatusCard';

describe('TaskStatusCard', () => {
  it('should render the provided count, label, and error count badge', () => {
    render(<TaskStatusCard count={12} label="Pending Auto" className="bg-info-soft" errorCount={2} />);

    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Pending Auto')).toBeInTheDocument();
    expect(screen.getByText('2 errors')).toBeInTheDocument();
  });

  it('should render a custom error badge instead of the error count badge', () => {
    render(
      <TaskStatusCard
        count={12}
        label="Pending Auto"
        className="bg-info-soft"
        errorCount={2}
        errorBadge={<span>Loading errors</span>}
      />,
    );

    expect(screen.getByText('Loading errors')).toBeInTheDocument();
    expect(screen.queryByText('2 errors')).not.toBeInTheDocument();
  });
});
