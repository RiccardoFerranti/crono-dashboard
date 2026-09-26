import { describe, expect, it } from 'vitest';

import { formatPipelineValue, getProgressPercentage } from './utils';

describe('Performance utilities', () => {
  it('should calculate progress percentages and clamp values to the valid range', () => {
    expect(getProgressPercentage(50, 100)).toBe(50);
    expect(getProgressPercentage(-10, 100)).toBe(0);
    expect(getProgressPercentage(150, 100)).toBe(100);
    expect(getProgressPercentage(50, 0)).toBe(0);
  });

  it('should format pipeline values in thousands', () => {
    expect(formatPipelineValue(0)).toBe('0K');
    expect(formatPipelineValue(1000)).toBe('1K');
    expect(formatPipelineValue(12500)).toBe('12.5K');
  });
});
