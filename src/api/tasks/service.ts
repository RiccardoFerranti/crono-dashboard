import { mockApiDelay, wait } from '../utils';

import { tasksSummaryFixture } from './data';
import { type TasksSummary, tasksSummarySchema } from './types';

export async function getTasksSummary(): Promise<TasksSummary> {
  await wait(mockApiDelay);
  return tasksSummarySchema.parse({ ...tasksSummaryFixture });
}
