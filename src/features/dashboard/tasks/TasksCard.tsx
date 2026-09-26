import { useTasksSummary } from '@/api/tasks/queries';
import { Card } from '@/ui/Card';
import { Skeleton } from '@/ui/Skeleton';

import { TaskStatusCard } from './TaskStatusCard';

export function TasksCard() {
  const { data, isPending } = useTasksSummary();

  return (
    <Card className="flex min-w-0 flex-col gap-2" aria-labelledby="tasks-title">
      <h2 id="tasks-title" className="text-ink text-sm leading-5.5 font-semibold">
        Today’s tasks
      </h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)_minmax(0,1fr)_1px_minmax(0,1fr)] sm:items-center">
        <TaskStatusCard
          count={isPending ? <Skeleton className="bg-critical/20 h-7 w-7" /> : (data?.overdueCount ?? 0)}
          label="Overdue"
          className="bg-critical-soft text-critical"
        />
        <div aria-hidden="true" className="bg-divider hidden h-21.5 sm:block" />
        <TaskStatusCard
          count={isPending ? <Skeleton className="bg-warning/20 h-7 w-7" /> : (data?.pendingManualCount ?? 0)}
          label="Pending Manual"
          className="bg-warning-soft text-warning"
        />
        <TaskStatusCard
          count={isPending ? <Skeleton className="bg-info/20 h-7 w-7" /> : (data?.pendingAutoCount ?? 0)}
          label="Pending Auto"
          errorCount={isPending ? undefined : data?.pendingAutoErrorCount}
          errorBadge={isPending ? <Skeleton className="bg-surface/75 absolute top-2 right-2.5 h-6 w-17.75" /> : undefined}
          className="bg-info-soft text-info"
        />
        <div aria-hidden="true" className="bg-divider hidden h-21.5 sm:block" />
        <TaskStatusCard
          count={isPending ? <Skeleton className="bg-success/20 h-7 w-7" /> : (data?.completedCount ?? 0)}
          label="Completed"
          showChevron={false}
          className="bg-success-soft text-success"
        />
      </div>
    </Card>
  );
}
