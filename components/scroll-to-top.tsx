"use client";

import { useCallback } from "react";

import { tv } from "@/utils/tailwind-variants";
import useIsClient from "@/hooks/use-is-client";
import ArrowUpIcon from "@/ui/icons/arrow-up";
import { Tooltip, TooltipProvider } from "@/ui/tooltip";

export const variant = tv({
  base: [
    "fixed top-[50vh] right-[4rem] -translate-y-[50%]",
    "animate-fadeIn",
    "rounded-circle",
    "p-4",
    "ring-2 ring-inset",
    "bg-light-surfaceDim/50",
    "text-light-onSurface",
    "ring-light-outlineVariant",
    "dark:bg-dark-surfaceDim/50",
    "dark:text-dark-onSurface",
    "dark:ring-dark-outlineVariant",
  ],
});

export default function ScrollToTop() {
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
          className={variant()}
        >
          <ArrowUpIcon ui_size="large" />
        </button>
      </Tooltip>
    </TooltipProvider>
  );
}