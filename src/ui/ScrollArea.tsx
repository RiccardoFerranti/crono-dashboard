import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import type { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ScrollAreaProps = ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
  constrainContentToViewport?: boolean;
};

export function ScrollArea({ className, children, constrainContentToViewport = false, ...props }: ScrollAreaProps) {
  const contentConstraintClassName = constrainContentToViewport ? '[&>[data-radix-scroll-area-viewport]>div]:!block' : undefined;

  return (
    <ScrollAreaPrimitive.Root type="hover" className={twMerge('relative', contentConstraintClassName, className)} {...props}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit] outline-none">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className="flex w-2 touch-none select-none p-px"
      >
        <ScrollAreaPrimitive.Thumb className="bg-sidebar-inactive/40 hover:bg-sidebar-inactive/60 relative flex-1 rounded-full" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  );
}
