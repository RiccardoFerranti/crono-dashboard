import { describe, expect, it, vi } from 'vitest';
import { ZodError } from 'zod';

vi.mock('../utils', () => ({
  mockApiDelay: 0,
  wait: vi.fn(),
}));

vi.mock('./data', () => ({
  performanceKpisFixture: [
    {
      id: 'contacts-engaged',
      type: 'unknown-kpi',
      label: 'Contacts engaged',
      current: 0,
      target: 500,
    },
  ],
}));

import { getPerformanceKpis } from './service';

describe('Performance service', () => {
  it('should reject a malformed KPI response at the service boundary', async () => {
    await expect(getPerformanceKpis()).rejects.toBeInstanceOf(ZodError);
  });
});
