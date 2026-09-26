import { Pencil } from 'lucide-react';

import { usePerformanceKpis } from '@/api/performance/queries';
import { Card } from '@/ui/Card';

import { performanceKpiTypes } from './consts';
import { KpiCard } from './KpiCard';
import { PerformanceKpiSkeleton } from './PerformanceKpiSkeleton';

export function PerformanceCard() {
  const { data = [], isPending } = usePerformanceKpis();

  return (
    <Card className="flex min-h-73.25 flex-col gap-2.5" aria-labelledby="performance-title" aria-busy={isPending}>
      <div className="flex items-center justify-between gap-2">
        <h2 id="performance-title" className="text-ink text-sm leading-5.5 font-semibold">
          May’s performance
        </h2>
        <button
          type="button"
          className="text-sidebar-active text-sidebar flex cursor-pointer items-center gap-1 rounded-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-active focus-visible:ring-offset-2"
        >
          Edit KPIs
          <Pencil aria-hidden="true" className="size-3" strokeWidth={2.5} />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {isPending
          ? performanceKpiTypes.map((type) => <PerformanceKpiSkeleton key={type} type={type} />)
          : data.map((kpi) => <KpiCard key={kpi.id} kpi={kpi} />)}
      </div>
    </Card>
  );
}
