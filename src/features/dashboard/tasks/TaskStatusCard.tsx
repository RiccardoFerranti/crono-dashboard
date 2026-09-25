import { ChevronRight, TriangleAlert } from 'lucide-react';

type TaskStatusCardProps = {
  count: number;
  label: string;
  className: string;
  showChevron?: boolean;
  errorCount?: number;
};

export function TaskStatusCard({ count, label, className, showChevron = true, errorCount }: TaskStatusCardProps) {
  return (
    <div className={`relative flex h-21.5 min-w-0 flex-col justify-between rounded-xl p-4 ${className}`}>
      <p className="text-2xl leading-7.5 font-medium">{count}</p>
      <div className="text-ink-subtle flex w-full items-center justify-between text-sm leading-4 font-medium">
        <span>{label}</span>
        {showChevron && <ChevronRight aria-hidden="true" className="size-4 shrink-0" />}
      </div>
      {errorCount !== undefined && (
        <div className="text-critical absolute top-2 right-2.5 flex h-6 w-17.75 items-center gap-1 rounded-2xl bg-white pl-2 text-xs leading-4 font-medium">
          <span>
            {errorCount} {errorCount === 1 ? 'error' : 'errors'}
          </span>
          <TriangleAlert aria-hidden="true" className="size-3.5 shrink-0" />
        </div>
      )}
    </div>
  );
}
