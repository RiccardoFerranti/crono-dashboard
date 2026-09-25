import { clsx } from 'clsx';
import { ChevronsLeft } from 'lucide-react';
import companyDashLogo from '@/assets/icons/sidebar/company-logo.svg';
import cronosLogo from '@/assets/brand/crono-logo.svg';
import { SidebarItem } from './SidebarItem';
import { activeSidebarItemId, sidebarItems } from '../sidebar.config';
import { SidebarTrialBanner } from './SidebarTrialBanner';

export function Sidebar() {
  return (
    <aside
      aria-label="Sidebar"
      className={clsx(
        'sticky top-0 hidden h-dvh w-48 shrink-0',
        'flex-col gap-2 overflow-y-auto',
        'border-sidebar-border bg-surface border-r',
        'md:flex',
      )}
    >
      <div className="text-sidebar-inactive flex items-center justify-between px-4 py-5.5 text-2xl font-bold">
        <img src={cronosLogo} alt="Crono" className="h-7 w-24.5 shrink-0" />

        <button
          type="button"
          aria-label="Collapse sidebar"
          className="bg-canvas flex size-6 cursor-pointer items-center justify-center rounded-full"
        >
          <ChevronsLeft className="size-4" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <nav aria-label="Main navigation">
          <ul className="flex flex-col gap-4">
            {sidebarItems.map((item) => (
              <SidebarItem key={item.id} item={item} active={item.id === activeSidebarItemId} />
            ))}
          </ul>
        </nav>
      </div>
      <SidebarTrialBanner days={2} />

      <div className="border-sidebar-border mt-auto flex items-center gap-2 border-t px-3 py-4">
        <div aria-hidden="true" className="bg-user-avatar flex size-8 shrink-0 items-center justify-center rounded-full">
          <img src={companyDashLogo} alt="Company Logo" className="size-8 shrink-0" aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <p className="text-ink text-sm font-normal">William Robertson</p>
          <p className="text-sidebar-inactive text-xs font-normal">Sales</p>
        </div>
      </div>
    </aside>
  );
}
