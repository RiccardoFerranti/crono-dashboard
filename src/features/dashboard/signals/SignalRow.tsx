import type { Signal } from '@/api/signals/types';

import { signalCategoryPresentation } from './consts';
import { SignalActionMenu } from './SignalActionMenu';
import { formatSignalDate, getMessagePartClassName } from './utils';

type SignalRowProps = {
  signal: Signal;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export function SignalRow({ signal, onComplete, onDelete }: SignalRowProps) {
  const category = signalCategoryPresentation[signal.category];

  return (
    <div className="flex min-w-0 flex-col items-stretch gap-4 px-4 md:flex-row md:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="relative size-8 shrink-0">
          <img src={signal.image.src} alt={signal.image.alt} className="size-8 rounded-full object-cover" />
          <span
            aria-hidden="true"
            className="bg-unread absolute -top-0.5 -left-0.5 box-content size-1.5 rounded-full border-2 border-white"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-ink line-clamp-2 text-sm leading-5.5 font-semibold md:line-clamp-none md:truncate">
            {signal.message.map((part, index) => (
              <span key={`${part.text}-${index}`} className={getMessagePartClassName(signal.category, part)}>
                {part.text}
              </span>
            ))}
          </p>
          <div className="mt-0.5 flex items-center gap-1">
            <span className={`${category.textClassName} text-sm leading-5.5 font-medium`}>{category.label}</span>
            {signal.inSequence && (
              <span className="bg-brand-soft text-sidebar-active inline-flex h-4 w-17.5 shrink-0 items-center justify-center rounded-xl px-1 py-0.5 text-[10px] leading-3 font-medium tracking-normal whitespace-nowrap">
                In sequence
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full shrink-0 items-center justify-between gap-4 md:w-auto md:justify-start">
        <time
          dateTime={signal.date}
          className="text-sidebar-inactive text-[11px] leading-3.5 font-medium tracking-normal whitespace-nowrap"
        >
          {formatSignalDate(signal.date)}
        </time>
        <SignalActionMenu
          signalName={signal.image.alt}
          onComplete={() => onComplete(signal.id)}
          onDelete={() => onDelete(signal.id)}
        />
      </div>
    </div>
  );
}
