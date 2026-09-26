const skeletonClassName = 'bg-divider animate-pulse rounded-full';

export function SignalRowSkeleton() {
  return (
    <div aria-hidden="true" className="flex min-w-0 flex-col items-stretch gap-4 px-4 md:flex-row md:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className={`${skeletonClassName} size-8 shrink-0`} />
        <div className="min-w-0 flex-1">
          <div className={`${skeletonClassName} h-5.5 w-3/4`} />
          <div className={`${skeletonClassName} mt-0.5 h-5 w-2/5 sm:hidden`} />
          <div className={`${skeletonClassName} mt-0.5 h-5.5 w-16`} />
        </div>
      </div>
      <div className="flex w-full shrink-0 items-center justify-between gap-4 md:w-auto md:justify-start">
        <div className={`${skeletonClassName} h-3.5 w-15`} />
        <div className={`${skeletonClassName} h-8 w-22.5`} />
      </div>
    </div>
  );
}
