import type { SignalCategory, SignalMessagePart } from '@/api/signals/types';

const signalDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatSignalDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);

  return signalDateFormatter.format(new Date(Date.UTC(year, month - 1, day)));
}

export function getMessagePartClassName(category: SignalCategory, part: SignalMessagePart) {
  if (part.emphasis === 'accent' && category === 'website-view') {
    return 'text-sidebar-active';
  }

  return 'text-ink';
}
