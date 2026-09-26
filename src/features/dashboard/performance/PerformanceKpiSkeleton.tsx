import type { PerformanceKpiType } from '@/api/performance/types';
import { Card } from '@/ui/Card';
import { Skeleton } from '@/ui/Skeleton';

import { kpiPresentation } from './consts';

type PerformanceKpiSkeletonProps = {
  type: PerformanceKpiType;
};

export function PerformanceKpiSkeleton({ type }: PerformanceKpiSkeletonProps) {
  const presentation = kpiPresentation[type];
  const isPipeline = type === 'pipeline';

  return (
    <Card className="flex h-17.75 flex-col rounded-lg p-2" aria-hidden="true">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        {type === 'contacts-engaged' && <Skeleton className="size-4" />}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex h-6 items-center">
          {!isPipeline && presentation.icon && <Skeleton className={`mr-1 size-4 ${presentation.skeletonAccentClassName}`} />}
          <Skeleton className={`h-5 w-8 ${presentation.skeletonAccentClassName}`} />
          <Skeleton className="ml-1 h-4 w-12" />
        </div>
        <div className={`h-1 overflow-hidden rounded-full ${presentation.trackClassName}`}>
          <Skeleton className={`h-full w-3/5 ${presentation.skeletonAccentClassName}`} />
        </div>
      </div>
    </Card>
  );
}
