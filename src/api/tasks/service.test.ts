import { describe, expect, it, vi } from 'vitest';
import { ZodError } from 'zod';

vi.mock('../utils', () => ({
  mockApiDelay: 0,
  wait: vi.fn(),
}));

vi.mock('./data', () => ({
  tasksSummaryFixture: {
    overdueCount: '3',
    pendingManualCount: 10,
    pendingAutoCount: 20,
    pendingAutoErrorCount: 1,
    completedCount: 8,
  },
}));

import { getTasksSummary } from './service';

describe('Tasks service', () => {
  it('should reject malformed task summary data at the service boundary', async () => {
    await expect(getTasksSummary()).rejects.toBeInstanceOf(ZodError);
  });
});
