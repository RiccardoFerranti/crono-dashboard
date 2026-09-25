export function getProgressPercentage(current: number, target: number) {
  if (target <= 0) {
    return 0;
  }

  return Math.min(100, Math.max(0, (current / target) * 100));
}

export function formatPipelineValue(value: number) {
  return `${value / 1000}K`;
}
