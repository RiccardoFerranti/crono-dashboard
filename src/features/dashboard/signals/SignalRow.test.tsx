import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SignalRow } from './SignalRow';

describe('SignalRow', () => {
  it('should render its message, metadata, and in-sequence status', () => {
    render(
      <SignalRow
        signal={{
          id: 'signal-001',
          category: 'website-view',
          inSequence: true,
          message: [{ text: 'Acme', emphasis: 'strong' }, { text: ' viewed ' }, { text: '3 pages', emphasis: 'accent' }],
          date: '2025-04-02',
          image: { src: 'acme.svg', alt: 'Acme' },
        }}
        onComplete={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('viewed', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('3 pages')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Acme' })).toBeInTheDocument();
    expect(screen.getByText('Website view')).toBeInTheDocument();
    expect(screen.getByText('In sequence')).toBeInTheDocument();
    expect(screen.getByText('Apr 2, 2025')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action for Acme' })).toBeInTheDocument();
  });

  it('should omit the in-sequence status when the signal is not in a sequence', () => {
    render(
      <SignalRow
        signal={{
          id: 'signal-002',
          category: 'role-change',
          inSequence: false,
          message: [{ text: 'Taylor', emphasis: 'strong' }],
          date: '2025-04-02',
          image: { src: 'taylor.svg', alt: 'Taylor' },
        }}
        onComplete={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText('Taylor')).toBeInTheDocument();
    expect(screen.queryByText('In sequence')).not.toBeInTheDocument();
  });
});
