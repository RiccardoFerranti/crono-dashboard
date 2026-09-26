import { mockApiDelay, wait } from '../utils';

import { tasksSummaryFixture } from './data';
import type { TasksSummary } from './types';

export async function getTasksSummary(): Promise<TasksSummary> {
  await wait(mockApiDelay);
  return { ...tasksSummaryFixture };
}
