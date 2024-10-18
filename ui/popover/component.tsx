"use client";

import * as Primitive from "@radix-ui/react-popover";

import { tv, VariantProps } from "@/utils/style/tailwind-variants";

export const popoverVariant = tv({
  slots: {
    content: [
      "data-[state=open]:data-[side=top]:animate-slideDownAndFade",
      "data-[state=open]:data-[side=right]:animate-slideLeftAndFade",
      "data-[state=open]:data-[side=bottom]:animate-slideUpAndFade",
      "data-[state=open]:data-[side=left]:animate-slideRightAndFade",
      "shadow-2xl",
      "bg-light-surfaceContainerLow",
      "dark:bg-dark-surfaceContainerHigh",
      "z-popover",
    ],
    arrow: [
      "fill-light-surfaceContainerLow",
      "dark:fill-dark-surfaceContainerHigh",
      "z-popover",
    ],
  },
  variants: {
    ui_size: {
      large: { content: ["rounded-6", "p-6"] },
      medium: { content: ["rounded-4", "p-4"] },
      small: { content: ["rounded-2", "p-4"] },
    },
  },
  defaultVariants: {
    ui_size: "medium",
  },
});

export interface PopoverRootProps extends Primitive.PopoverProps {}

export function Root({ children, ...props }: PopoverRootProps) {
  return <Primitive.Root {...props}>{children}</Primitive.Root>;
}

export interface PopoverTriggerProps extends Primitive.PopoverTriggerProps {}

export function Trigger({
  children,
  asChild = true,
  ...props
}: PopoverTriggerProps) {
  return (
    <Primitive.Trigger asChild={asChild} {...props}>
      {children}
    </Primitive.Trigger>
  );
}

export interface PopoverContentProps
  extends VariantProps<typeof popoverVariant>,
    Primitive.PopoverContentProps {}

export function Content({
  children,
  ui_size,
  className,
  ...props
}: PopoverContentProps) {
  const { content, arrow } = popoverVariant({ ui_size });

  return (
    <Primitive.Portal>
      <Primitive.Content
        className={content({ className })}
        onOpenAutoFocus={(event) => event.preventDefault()}
        sideOffset={5}
        {...props}
      >
        {children}
        <Primitive.Arrow className={arrow()} />
      </Primitive.Content>
    </Primitive.Portal>
  );
}
