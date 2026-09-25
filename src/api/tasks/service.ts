import { tasksSummaryFixture } from './data';
import type { TasksSummary } from './types';

export async function getTasksSummary(): Promise<TasksSummary> {
  return { ...tasksSummaryFixture };
}
