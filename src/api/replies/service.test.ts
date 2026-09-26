import { describe, expect, it, vi } from 'vitest';
import { ZodError } from 'zod';

vi.mock('../utils', () => ({
  mockApiDelay: 0,
  wait: vi.fn(),
}));

vi.mock('./data', () => ({
  repliesSummaryFixture: { unreadCount: '24' },
}));

import { getRepliesSummary } from './service';

describe('Replies service', () => {
  it('should reject a malformed replies summary at the service boundary', async () => {
    await expect(getRepliesSummary()).rejects.toBeInstanceOf(ZodError);
  });
});
