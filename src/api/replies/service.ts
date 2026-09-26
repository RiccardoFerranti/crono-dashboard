import { repliesSummaryFixture } from './data';
import type { RepliesSummary } from './types';

const repliesQueryDelay = 5000;

function waitForRepliesQuery() {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, repliesQueryDelay);
  });
}

export async function getRepliesSummary(): Promise<RepliesSummary> {
  await waitForRepliesQuery();

  return { ...repliesSummaryFixture };
}
