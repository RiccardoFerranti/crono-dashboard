import type { ComponentPropsWithoutRef } from 'react'

export function Card({ className = '', ...props }: ComponentPropsWithoutRef<'section'>) {
  return (
    <section
      className={`rounded-card border border-border-subtle bg-surface ${className}`}
      {...props}
    />
  )
}
