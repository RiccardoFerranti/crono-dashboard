import type { Signal } from '@/api/signals/types';
import { signalCategoryPresentation } from './consts';
import { formatSignalDate, getMessagePartClassName } from './utils';
import clsx from 'clsx';

type SignalRowProps = {
  signal: Signal;
};

export function SignalRow({ signal }: SignalRowProps) {
  const category = signalCategoryPresentation[signal.category];

  return (
    <div className="flex min-w-0 items-center gap-4 px-4">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="relative size-8 shrink-0">
          <img src={signal.image.src} alt={signal.image.alt} className="size-8 rounded-full object-cover" />
          <span
            aria-hidden="true"
            className="bg-unread absolute -top-0.5 -left-0.5 box-content size-1.5 rounded-full border-2 border-white"
          />
        </div>
        <div className="min-w-0">
          <p className="text-ink truncate text-sm leading-5.5 font-semibold">
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
      <div className="flex shrink-0 items-center gap-4">
        <time
          dateTime={signal.date}
          className="text-sidebar-inactive text-[11px] leading-3.5 font-medium tracking-normal whitespace-nowrap"
        >
          {formatSignalDate(signal.date)}
        </time>
        <button
          type="button"
          aria-label={`Action for ${signal.image.alt}`}
          className={clsx(
            'h-8 w-22.5 shrink-0 rounded-full',
            'bg-action hover:bg-sidebar-active',
            'px-4 py-1.75',
            'cursor-pointer text-center',
            'text-sm leading-4.5 font-medium tracking-normal text-white',
          )}
        >
          Action
        </button>
      </div>
    </div>
  );
}
