"use client";

import * as Primitive from "@radix-ui/react-tooltip";

import { sem } from "@/utils/semantic-styles";
import { tv, VariantProps } from "@/utils/tailwind-variants";

export const tooltipVariant = tv({
  slots: {
    content: sem()
      .layout([
        "select-none",
        "rounded-1",
        "px-3",
        "py-1.5",
        "leading-6",
        "border-2",
        "z-tooltip",
        "break-keep",
        "max-w-[40rem]",
        "text-center",
      ])
      .color(["border-light-outline", "dark:border-dark-outline"])
      .transition([
        "will-change-[transform,opacity]",
        "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
        "data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade",
        "data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade",
        "data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
      ])
      .build(),
    arrow: sem()
      .layout(["z-tooltip"])
      .color(["fill-light-outline", "dark:fill-dark-outline"])
      .build(),
  },
  variants: {
    ui_color: {
      default: {
        content: [
          "bg-light-surfaceVariant/75",
          "text-light-onSurface",
          "dark:bg-dark-surfaceVariant/75",
          "dark:text-dark-onSurface",
        ],
      },
      error: {
        content: [
          "bg-light-errorContainer/75",
          "text-light-onErrorContainer",
          "dark:bg-dark-errorContainer/75",
          "dark:text-dark-onErrorContainer",
        ],
      },
    },
  },
  defaultVariants: {
    ui_color: "default",
  },
});

export interface TooltipProps
  extends VariantProps<typeof tooltipVariant>,
    Primitive.TooltipContentProps {
  title: string;
}

export const { TooltipProvider } = Primitive;

export function Tooltip({
  title,
  ui_color,
  children,
  className,
  ...props
}: TooltipProps) {
  const { content, arrow } = tooltipVariant({ ui_color });

  return (
    <Primitive.Root delayDuration={100}>
      <Primitive.Trigger asChild>{children}</Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Content
          sideOffset={5}
          className={content({ className })}
          {...props}
        >
          {title}
          <Primitive.Arrow className={arrow()} />
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
