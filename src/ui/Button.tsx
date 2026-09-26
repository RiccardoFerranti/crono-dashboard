import type { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function Button({ className, type = 'button', ...props }: ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type={type}
      className={twMerge(
        'h-8 w-22.5 shrink-0 rounded-full',
        'bg-action hover:bg-sidebar-active',
        'cursor-pointer px-4 py-1.75 text-center',
        'focus-visible:ring-sidebar-active focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        'text-sm leading-4.5 font-medium tracking-normal text-white',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    />
  );
}
