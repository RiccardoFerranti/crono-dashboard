import { tasksSummaryFixture } from './data';
import type { TasksSummary } from './types';

const tasksQueryDelay = 5000;

function waitForTasksQuery() {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, tasksQueryDelay);
  });
}

export async function getTasksSummary(): Promise<TasksSummary> {
  await waitForTasksQuery();

  return { ...tasksSummaryFixture };
}
