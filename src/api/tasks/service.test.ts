import { afterEach, expect, test, vi } from 'vitest';
import { ZodError } from 'zod';

import { tasksSummaryFixture } from './data';
import { getTasksSummary } from './service';

vi.mock('../utils', () => ({
  mockApiDelay: 0,
  wait: vi.fn(),
}));

const validTasksSummary = { ...tasksSummaryFixture };

afterEach(() => {
  Object.assign(tasksSummaryFixture, validTasksSummary);
});

test('rejects malformed task summary data at the service boundary', async () => {
  Object.assign(tasksSummaryFixture, { overdueCount: '3' as unknown as number });

  await expect(getTasksSummary()).rejects.toBeInstanceOf(ZodError);
});
