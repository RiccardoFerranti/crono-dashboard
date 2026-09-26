import { repliesSummaryFixture } from './data';
import type { RepliesSummary } from './types';
import { mockApiDelay, wait } from '../utils';

export async function getRepliesSummary(): Promise<RepliesSummary> {
  await wait(mockApiDelay);

  return { ...repliesSummaryFixture };
}
