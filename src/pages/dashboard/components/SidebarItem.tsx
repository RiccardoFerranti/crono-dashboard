import { clsx } from 'clsx';
import type { SidebarMenuItem } from '../sidebar.config';
import { ChevronDown } from 'lucide-react';

type SidebarItemProps = {
  item: SidebarMenuItem;
  active: boolean;
};

export function SidebarItem({ item, active }: SidebarItemProps) {
  return (
    <li
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'relative flex h-8 cursor-pointer items-center gap-2',
        'px-3.25 py-1',
        'text-sidebar not-italic',
        'hover:text-sidebar-active',
        active ? 'text-sidebar-active' : 'text-sidebar-inactive',
      )}
    >
      {active && (
        <span
          aria-hidden="true"
          className="bg-sidebar-active absolute top-1/2 left-0 h-8 w-0.75 -translate-y-1/2 rounded-r-[3px]"
        />
      )}
      <span
        aria-hidden="true"
        className="size-6 shrink-0 bg-current mask-contain mask-center mask-no-repeat"
        style={{ maskImage: `url("${item.icon}")` }}
      />
      <span>{item.label}</span>
      {item.badge !== undefined && (
        <span className={clsx('ml-auto rounded-full px-2 py-0.5', 'bg-unread text-surface')}>{item.badge}</span>
      )}
      {item.expandable && <ChevronDown aria-hidden="true" className="ml-auto size-4" />}
    </li>
  );
}
