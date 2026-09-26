import { Skeleton } from '@/ui/Skeleton';

export function SignalRowSkeleton() {
  return (
    <div aria-hidden="true" className="flex min-w-0 flex-col items-stretch gap-4 px-4 md:flex-row md:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <Skeleton className="size-8 shrink-0" />
        <div className="min-w-0 flex-1">
          <Skeleton className="h-5.5 w-3/4" />
          <Skeleton className="mt-0.5 h-5 w-2/5 sm:hidden" />
          <Skeleton className="mt-0.5 h-5.5 w-16" />
        </div>
      </div>
      <div className="flex w-full shrink-0 items-center justify-between gap-4 md:w-auto md:justify-start">
        <Skeleton className="h-3.5 w-15" />
        <Skeleton className="h-8 w-22.5" />
      </div>
    </div>
  );
}
