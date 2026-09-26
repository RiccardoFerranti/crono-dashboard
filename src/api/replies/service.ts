import { mockApiDelay, wait } from '../utils';

import { repliesSummaryFixture } from './data';
import type { RepliesSummary } from './types';

export async function getRepliesSummary(): Promise<RepliesSummary> {
  await wait(mockApiDelay);

  return { ...repliesSummaryFixture };
}
