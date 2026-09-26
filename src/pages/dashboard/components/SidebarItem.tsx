import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

import type { SidebarMenuItem } from '../sidebar.config';

type SidebarItemProps = {
  item: SidebarMenuItem;
  active: boolean;
  collapsed?: boolean;
  badge?: ReactNode;
  badgeAriaLabel?: string;
};

export function SidebarItem({ item, active, collapsed = false, badge = item.badge, badgeAriaLabel }: SidebarItemProps) {
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
      {!collapsed && <span>{item.label}</span>}
      {!collapsed && badge !== undefined && (
        <span aria-label={badgeAriaLabel} className={clsx('ml-auto rounded-full px-2 py-0.5', 'bg-unread text-surface')}>
          {badge}
        </span>
      )}
      {!collapsed && item.expandable && <ChevronDown aria-hidden="true" className="ml-auto size-4" />}
    </li>
  );
}
