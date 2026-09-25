import type { ComponentPropsWithoutRef } from 'react';

export function Card({ className = '', ...props }: ComponentPropsWithoutRef<'section'>) {
  return <section className={`rounded-card border-border-subtle bg-surface gap-2 border p-4 ${className}`} {...props} />;
}
