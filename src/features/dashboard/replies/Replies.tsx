import { ChevronRight } from 'lucide-react';

import { useRepliesSummary } from '@/api/replies/queries';
import inboxIcon from '@/assets/icons/replies/Inbox.svg';
import { Card } from '@/ui/Card';
import { Skeleton } from '@/ui/Skeleton';

import { replySourceLogos } from './consts';

export function RepliesCard() {
  const { data, isError, isFetching, isPending } = useRepliesSummary();

  return (
    <Card className="flex flex-col gap-2" aria-labelledby="replies-title" aria-busy={isPending || isFetching}>
      <div className="flex items-center justify-between">
        <h2 id="replies-title" className="text-ink text-sm leading-5.5 font-semibold">
          Replies
        </h2>
        <a
          href="#inbox"
          className="text-sidebar-active text-sidebar focus-visible:ring-sidebar-active flex items-center gap-1 rounded-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Open inbox
          <ChevronRight aria-hidden="true" className="size-5" strokeWidth={2.5} />
        </a>
      </div>
      <div className="bg-brand-soft @container flex w-full items-center gap-4 rounded-xl py-4 pr-6 pl-4">
        <div className="bg-brand/10 flex size-12 shrink-0 items-center justify-center rounded-full">
          <img src={inboxIcon} alt="Inbox" className="size-6" />
        </div>
        {isPending ? (
          <Skeleton className="bg-ink-secondary/20 ml-2 h-9 w-10" />
        ) : (
          <p className="text-replies-count text-ink-secondary ml-2 tracking-tight">
            {isError ? <span aria-label="Unread count unavailable">—</span> : data?.unreadCount}
          </p>
        )}
        <div className="ml-auto flex -space-x-[clamp(6px,calc(62.8px-17.75cqw),28px)]" aria-label="Reply sources">
          {replySourceLogos.map((logo) => (
            <img key={logo.src} src={logo.src} alt={logo.alt} className="size-10 rounded-full bg-white ring-2 ring-white" />
          ))}
        </div>
      </div>
    </Card>
  );
}
