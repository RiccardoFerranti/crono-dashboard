import { ChevronRight } from 'lucide-react';
import inboxIcon from '@/assets/icons/replies/Inbox.svg';
import { useRepliesSummary } from '@/api/replies/queries';
import { Card } from '@/ui/Card';
import { replySourceLogos } from './consts';

export function RepliesCard() {
  const { data } = useRepliesSummary();
  const unreadCount = data?.unreadCount ?? 0;

  return (
    <Card className="flex flex-col" aria-labelledby="replies-title">
      <div className="flex items-center justify-between gap-2">
        <h2 id="replies-title" className="text-ink text-sm leading-5.5 font-semibold">
          Replies
        </h2>
        <a href="#inbox" className="text-sidebar-active text-sidebar flex items-center gap-1 font-medium">
          Open inbox
          <ChevronRight aria-hidden="true" className="size-5" strokeWidth={2.5} />
        </a>
      </div>
      <div className="[container-type:inline-size] bg-brand-soft flex w-full items-center gap-4 rounded-xl py-4 pr-6 pl-4">
        <div className="bg-brand/10 flex size-12 shrink-0 items-center justify-center rounded-full">
          <img src={inboxIcon} alt="Inbox" className="size-6" />
        </div>
        <p className="text-replies-count text-ink-secondary ml-2 tracking-tight">{unreadCount}</p>
        <div className="ml-auto flex -space-x-[clamp(6px,calc(62.8px_-_17.75cqw),28px)]" aria-label="Reply sources">
          {replySourceLogos.map((logo) => (
            <img key={logo.src} src={logo.src} alt={logo.alt} className="size-10 rounded-full bg-white ring-2 ring-white" />
          ))}
        </div>
      </div>
    </Card>
  );
}
