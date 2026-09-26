import { clsx } from 'clsx';
import { ChevronsLeft } from 'lucide-react';
import { useState } from 'react';

import cronosLogo from '@/assets/brand/crono-logo.svg';
import cronoMark from '@/assets/brand/crono-mark.svg';
import companyDashLogo from '@/assets/icons/sidebar/company-logo.svg';
import { ScrollArea } from '@/ui/ScrollArea';

import { activeSidebarItemId, sidebarItems } from '../sidebar.config';

import { SidebarItem } from './SidebarItem';
import { SidebarTrialBanner } from './SidebarTrialBanner';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      aria-label="Sidebar"
      className={clsx(
        'sticky top-0 hidden h-dvh shrink-0',
        'relative flex-col gap-2',
        'border-sidebar-border bg-surface border-r',
        collapsed ? 'w-16' : 'w-48',
        'md:flex',
      )}
    >
      <div
        className={clsx(
          'text-sidebar-inactive flex h-18 items-center py-5.5 text-2xl font-bold',
          collapsed ? 'justify-start px-4' : 'justify-between px-4',
        )}
      >
        <img
          src={collapsed ? cronoMark : cronosLogo}
          alt="Crono"
          className={collapsed ? 'h-6 w-5 shrink-0' : 'h-7 w-24.5 shrink-0'}
        />

        <button
          type="button"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((isCollapsed) => !isCollapsed)}
          className={clsx(
            'bg-canvas focus-visible:ring-sidebar-active z-10 flex size-6 cursor-pointer items-center justify-center rounded-full',
            'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
            collapsed && 'absolute top-6 right-0 translate-x-1/2',
          )}
        >
          <ChevronsLeft aria-hidden="true" className={clsx('size-4', collapsed && 'rotate-180')} />
        </button>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <nav aria-label="Main navigation">
          <ul className="flex flex-col gap-4">
            {sidebarItems.map((item) => (
              <SidebarItem key={item.id} item={item} active={item.id === activeSidebarItemId} collapsed={collapsed} />
            ))}
          </ul>
        </nav>
      </ScrollArea>
      {!collapsed && <SidebarTrialBanner days={2} />}

      <div
        className={clsx(
          'border-sidebar-border mt-auto flex items-center border-t py-4',
          collapsed ? 'justify-center px-2' : 'gap-2 px-3',
        )}
      >
        <div aria-hidden="true" className="bg-user-avatar flex size-8 shrink-0 items-center justify-center rounded-full">
          <img src={companyDashLogo} alt="Company Logo" className="size-8 shrink-0" aria-hidden="true" />
        </div>

        {!collapsed && (
          <div className="min-w-0">
            <p className="text-ink text-sm font-normal">William Robertson</p>
            <p className="text-sidebar-inactive text-xs font-normal">Sales</p>
          </div>
        )}
      </div>
    </aside>
  );
}
