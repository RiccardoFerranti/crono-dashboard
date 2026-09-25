import type { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function Card({ className, ...props }: ComponentPropsWithoutRef<'section'>) {
  return <section className={twMerge('rounded-card border-border-subtle bg-surface border p-4', className)} {...props} />;
}
