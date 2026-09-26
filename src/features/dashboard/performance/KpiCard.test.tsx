import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { KpiCard } from './KpiCard';

describe('KpiCard', () => {
  it('should render a standard KPI value, target, and available information control', () => {
    render(
      <KpiCard kpi={{ id: 'contacts-engaged', type: 'contacts-engaged', label: 'Contacts engaged', current: 50, target: 100 }} />,
    );

    expect(screen.getByText('Contacts engaged')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText(/\/ 100/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'More information about Contacts engaged' })).toBeInTheDocument();
  });

  it('should format pipeline KPI values in thousands without the contacts information control', () => {
    render(<KpiCard kpi={{ id: 'pipeline', type: 'pipeline', label: 'Pipeline', current: 50000, target: 100000 }} />);

    expect(screen.getByText('Pipeline')).toBeInTheDocument();
    expect(screen.getByText('€50K')).toBeInTheDocument();
    expect(screen.getByText(/\/ 100K/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'More information about Contacts engaged' })).not.toBeInTheDocument();
  });
});
