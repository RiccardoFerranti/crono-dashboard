import { Pencil } from 'lucide-react';

import { usePerformanceKpis } from '@/api/performance/queries';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';

import { performanceKpiTypes } from './consts';
import { KpiCard } from './KpiCard';
import { PerformanceKpiSkeleton } from './PerformanceKpiSkeleton';

export function PerformanceCard() {
  const { data, isError, isFetching, isPending, refetch } = usePerformanceKpis();
  const hasInitialError = isError && data === undefined;

  return (
    <Card className="flex min-h-73.25 flex-col gap-2.5" aria-labelledby="performance-title" aria-busy={isPending || isFetching}>
      <div className="flex items-center justify-between gap-2">
        <h2 id="performance-title" className="text-ink text-sm leading-5.5 font-semibold">
          May’s performance
        </h2>
        <button
          type="button"
          className="text-sidebar-active text-sidebar focus-visible:ring-sidebar-active flex cursor-pointer items-center gap-1 rounded-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Edit KPIs
          <Pencil aria-hidden="true" className="size-3" strokeWidth={2.5} />
        </button>
      </div>
      {hasInitialError ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <p role="alert" className="text-sidebar-inactive text-sm leading-5.5 font-medium">
            Unable to load performance data.
          </p>
          <Button onClick={() => refetch()} disabled={isFetching} aria-label="Retry loading performance data">
            Retry
          </Button>
        </div>
      ) : isPending ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {performanceKpiTypes.map((type) => (
            <PerformanceKpiSkeleton key={type} type={type} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {data?.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      )}
    </Card>
  );
}
