import { mockApiDelay, wait } from '../utils';

import { repliesSummaryFixture } from './data';
import { type RepliesSummary, repliesSummarySchema } from './types';

export async function getRepliesSummary(): Promise<RepliesSummary> {
  await wait(mockApiDelay);
  return repliesSummarySchema.parse({ ...repliesSummaryFixture });
}
