import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { CircleCheckBig, Trash2 } from 'lucide-react';

import { Button } from '@/ui/Button';

type SignalActionMenuProps = {
  signalName: string;
  onComplete: () => void;
  onDelete: () => void;
};

const menuItemClassName = clsx(
  'text-ink flex h-10 w-50 cursor-pointer items-center justify-between rounded-lg p-2',
  'text-xs leading-4 font-medium tracking-normal outline-none',
  'data-[highlighted]:bg-brand-soft data-[highlighted]:text-sidebar-active',
);

export function SignalActionMenu({ signalName, onComplete, onDelete }: SignalActionMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button aria-label={`Action for ${signalName}`}>Action</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="end"
          sideOffset={9}
          className="border-divider bg-surface shadow-dropdown w-54 rounded-xl border p-2 outline-none"
        >
          <DropdownMenu.Item className={menuItemClassName} onSelect={onComplete}>
            <span>Complete</span>
            <CircleCheckBig aria-hidden="true" className="size-4" />
          </DropdownMenu.Item>
          <DropdownMenu.Item className={menuItemClassName} onSelect={onDelete}>
            <span>Delete</span>
            <Trash2 aria-hidden="true" className="size-4" />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
