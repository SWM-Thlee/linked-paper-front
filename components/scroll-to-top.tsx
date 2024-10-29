"use client";

import { useCallback } from "react";

import { tv, VariantProps } from "@/utils/style/tailwind-variants";
import useIsClient from "@/hooks/use-is-client";
import ArrowUpIcon from "@/ui/icons/arrow-up";
import { Tooltip, TooltipProvider } from "@/ui/tooltip";

export const variant = tv({
  base: [
    "fixed right-[2rem]",
    "animate-fadeIn",
    "rounded-circle",
    "ring-1 ring-inset",
  ],
  variants: {
    ui_size: {
      large: "p-4",
      medium: "p-3",
      small: "p-2",
    },
    ui_color: {
      default:
        "bg-light-surfaceContainer/90 text-light-onSurface dark:bg-dark-surfaceContainer/90 dark:text-dark-onSurface ring-light-outline dark:ring-dark-outline",
      primary:
        "bg-light-primary/90 text-light-onPrimary dark:bg-dark-primary/90 dark:text-dark-onPrimary ring-light-primaryContainer dark:ring-dark-primaryContainer",
      secondary:
        "bg-light-secondary/90 text-light-onSecondary dark:bg-dark-secondary/90 dark:text-dark-onSecondary ring-light-secondaryContainer dark:ring-dark-secondaryContainer",
      tertiary:
        "bg-light-tertiary/90 text-light-onTertiary dark:bg-dark-tertiary/90 dark:text-dark-onTertiary ring-light-tertiaryContainer dark:ring-dark-tertiaryContainer",
    },
    ui_position: {
      top: "top-[10vh] -translate-y-[50%]",
      center: "top-[50vh] -translate-y-[50%]",
      bottom: "bottom-[10vh] translate-y-[50%]",
    },
  },
  defaultVariants: {
    ui_size: "medium",
    ui_color: "default",
    ui_position: "center",
  },
});

export type ScrollToTopProps = VariantProps<typeof variant>;

export default function ScrollToTop({
  ui_size,
  ui_color,
  ui_position,
}: ScrollToTopProps) {
  const isClient = useIsClient();

  const onClick = useCallback(() => {
    if (typeof window === undefined) return;

    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, []);

  if (!isClient) return null;

  return (
    <TooltipProvider>
      <Tooltip title="Scroll To Top" side="left">
        <button
          aria-label="Scroll To Top"
          type="button"
          onClick={onClick}
          className={variant({ ui_size, ui_color, ui_position })}
        >
          <ArrowUpIcon ui_size="large" />
        </button>
      </Tooltip>
    </TooltipProvider>
  );
}
