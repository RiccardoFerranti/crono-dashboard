import { describe, expect, it } from 'vitest';

import { formatSignalDate, getMessagePartClassName } from './utils';

describe('Signals utilities', () => {
  it('should format signal dates in a stable UTC display format', () => {
    expect(formatSignalDate('2025-04-02')).toBe('Apr 2, 2025');
    expect(formatSignalDate('2024-02-29')).toBe('Feb 29, 2024');
  });

  it('should highlight website-view accent message parts only', () => {
    expect(getMessagePartClassName('website-view', { text: '3 pages', emphasis: 'accent' })).toBe('text-sidebar-active');
    expect(getMessagePartClassName('role-change', { text: 'Senior SDR', emphasis: 'accent' })).toBe('text-ink');
    expect(getMessagePartClassName('website-view', { text: 'Amazon', emphasis: 'strong' })).toBe('text-ink');
  });
});
