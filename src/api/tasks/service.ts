import { tasksSummaryFixture } from './data';
import type { TasksSummary } from './types';
import { mockApiDelay, wait } from '../utils';

export async function getTasksSummary(): Promise<TasksSummary> {
  await wait(mockApiDelay);

  return { ...tasksSummaryFixture };
}
