import { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import type { PerformanceKpi } from '@/api/performance/types';
import { Card } from '@/ui/Card';
import { kpiPresentation } from './constants';
import { formatPipelineValue, getProgressPercentage } from './utils';

type KpiCardProps = {
  kpi: PerformanceKpi;
};

export function KpiCard({ kpi }: KpiCardProps) {
  const presentation = kpiPresentation[kpi.type];
  const progressPercentage = getProgressPercentage(kpi.current, kpi.target);
  const isPipeline = kpi.type === 'pipeline';
  const [animatedProgressPercentage, setAnimatedProgressPercentage] = useState(0);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setAnimatedProgressPercentage(progressPercentage);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [progressPercentage]);

  return (
    <Card className="flex h-17.75 flex-col rounded-lg! p-2!">
      <div className="flex items-center justify-between">
        <span className="text-ink-subtle text-xs leading-4 font-medium tracking-normal">{kpi.label}</span>
        {kpi.type === 'contacts-engaged' && (
          <Info aria-label="Information about contacts engaged" className="text-sidebar-inactive size-4" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center text-base leading-6 font-medium">
          {!isPipeline && presentation.icon && <img src={presentation.icon} alt="" className="mr-1 size-4 shrink-0" />}
          <span className={presentation.accentTextClassName}>
            {isPipeline ? `€${formatPipelineValue(kpi.current)}` : kpi.current}
          </span>
          <span className="text-target-muted">&nbsp;/ {isPipeline ? formatPipelineValue(kpi.target) : kpi.target}</span>
        </div>
        <div className={`h-1 overflow-hidden rounded-full ${presentation.trackClassName}`}>
          <div
            className={`h-full rounded-full transition-[width] duration-300 ease-out ${presentation.accentBackgroundClassName}`}
            style={{ width: `${animatedProgressPercentage}%` }}
          />
        </div>
      </div>
    </Card>
  );
}
