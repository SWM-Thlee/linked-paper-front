"use client";

import { tv, VariantProps } from "@/utils/tailwind-variants";
import * as UiPopover from "@radix-ui/react-popover";

const popoverVariant = tv({
  slots: {
    content: [
      "data-[state=open]:data-[side=top]:animate-slideDownAndFade",
      "data-[state=open]:data-[side=right]:animate-slideLeftAndFade",
      "data-[state=open]:data-[side=bottom]:animate-slideUpAndFade",
      "data-[state=open]:data-[side=left]:animate-slideRightAndFade",
      "shadow-2xl",
      "bg-light-surfaceContainerLowest",
      "dark:bg-dark-surfaceContainerLowest",
    ],
    arrow: [
      "fill-light-surfaceContainerLowest",
      "dark:fill-dark-surfaceContainerLowest",
    ],
  },
  variants: {
    _size: {
      large: { content: ["rounded-large", "p-6"] },
      medium: { content: ["rounded-medium", "p-4"] },
      small: { content: ["rounded-small", "p-4"] },
    },
  },
  defaultVariants: {
    _size: "medium",
  },
});

type Props = {
  children: React.ReactNode;
  trigger: React.ReactNode;
} & VariantProps<typeof popoverVariant> &
  UiPopover.PopoverProps;

export default function Popover({ children, trigger, _size, ...props }: Props) {
  const { content, arrow } = popoverVariant({ _size });

  return (
    <UiPopover.Root {...props}>
      <UiPopover.Trigger asChild>{trigger}</UiPopover.Trigger>
      <UiPopover.Portal>
        <UiPopover.Content
          className={content()}
          onOpenAutoFocus={(event) => event.preventDefault()}
          sideOffset={5}
        >
          {children}
          <UiPopover.Arrow className={arrow()} />
        </UiPopover.Content>
      </UiPopover.Portal>
    </UiPopover.Root>
  );
}
