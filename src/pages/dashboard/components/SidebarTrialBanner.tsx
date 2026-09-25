import { Gift } from 'lucide-react';

import trialDecoration from '@/assets/illustrations/trial-banner-decoration.svg';

type SidebarTrialBannerProps = {
  days: number;
};

export function SidebarTrialBanner({ days }: SidebarTrialBannerProps) {
  return (
    <div className="bg-trial-bg relative mx-2 mt-4 overflow-hidden rounded-xl p-2">
      <div className="relative flex flex-col items-start gap-1.5">
        <p className="text-ink text-sm leading-4.5 font-medium">Trial ends in {days} days</p>

        <button type="button" className="bg-unread text-surface flex items-center gap-1 rounded-sm px-2 py-1">
          <span className="text-xs leading-4 font-medium">Upgrade plan</span>

          <Gift aria-hidden="true" className="size-3" />
        </button>
      </div>

      <img
        src={trialDecoration}
        alt="Decorative illustration for trial banner"
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-10 object-cover mix-blend-color-burn"
      />
    </div>
  );
}
