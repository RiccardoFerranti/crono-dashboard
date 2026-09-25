import { repliesSummaryFixture } from './data';
import type { RepliesSummary } from './types';

export async function getRepliesSummary(): Promise<RepliesSummary> {
  return { ...repliesSummaryFixture };
}
