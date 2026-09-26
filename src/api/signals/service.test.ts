import { describe, expect, it, vi } from 'vitest';
import { ZodError } from 'zod';

vi.mock('../utils', () => ({
  mockApiDelay: 0,
  wait: vi.fn(),
}));

vi.mock('./data', () => ({
  signalsFixture: [
    {
      id: 'signal-001',
      category: 'role-change',
      inSequence: false,
      message: [{ text: 42, emphasis: 'strong' }],
      date: '2025-04-02',
      image: { src: 'medium.svg', alt: 'Medium' },
    },
  ],
}));

import { getSignals } from './service';

describe('Signals service', () => {
  it('should reject malformed nested signal data at the service boundary', async () => {
    await expect(getSignals()).rejects.toBeInstanceOf(ZodError);
  });
});
