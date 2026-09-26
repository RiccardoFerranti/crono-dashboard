import type { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function Skeleton({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={twMerge('bg-divider animate-pulse rounded-full', className)} {...props} />;
}
