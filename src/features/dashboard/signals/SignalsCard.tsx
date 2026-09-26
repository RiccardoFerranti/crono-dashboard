import { useSignals } from '@/api/signals/queries';
import { useSignalMutations } from '@/api/signals/mutations';
import { Card } from '@/ui/Card';
import { ScrollArea } from '@/ui/ScrollArea';
import { SignalRow } from './SignalRow';

export function SignalsCard() {
  const { data: signals = [] } = useSignals();
  const { pendingIds, completeSignal, deleteSignal } = useSignalMutations();
  const visibleSignals = signals.filter((signal) => !pendingIds.has(signal.id));

  return (
    <Card className="flex h-104 min-h-0 min-w-0 flex-col gap-0 overflow-hidden p-0 xl:h-full" aria-labelledby="signals-title">
      <div className="shrink-0 p-4">
        <div className="flex items-center gap-1.5">
          <h2 id="signals-title" className="text-ink text-sm leading-5.5 font-semibold">
            Signals
          </h2>
          <span className="bg-unread inline-flex h-6 min-w-7 items-center justify-center rounded-xl px-2 text-xs leading-4 font-semibold text-white">
            {visibleSignals.length}
          </span>
        </div>
        <p className="text-sidebar-inactive mt-1 text-sm leading-6 font-normal">
          Never miss a single opportunity: check out your top signals from your 1st-degree LinkedIn connections.
        </p>
      </div>
      <ScrollArea constrainContentToViewport className="min-h-0 min-w-0 flex-1">
        <div className="flex min-w-0 flex-col gap-4 pb-4">
          {visibleSignals.map((signal, index) => (
            <div key={signal.id} className="contents">
              <SignalRow signal={signal} onComplete={completeSignal} onDelete={deleteSignal} />
              {index < visibleSignals.length - 1 && <div aria-hidden="true" className="bg-divider h-px" />}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
