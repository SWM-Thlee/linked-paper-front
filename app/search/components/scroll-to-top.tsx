"use client";

import { useCallback } from "react";

import useIsClient from "@/hooks/use-is-client";
import ArrowUpIcon from "@/ui/icons/arrow-up";

export function ScrollToTop() {
  const isClient = useIsClient();

  const onClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!isClient) return null;

  return (
    <button
      aria-label="Scroll To Top"
      type="button"
      onClick={onClick}
      className="fixed bottom-[3rem] right-[3rem] animate-fadeIn rounded-circle bg-light-surfaceDim/50 p-4 text-light-onSurface ring-2 ring-inset ring-light-outlineVariant dark:bg-dark-surfaceDim/50 dark:text-dark-onSurface dark:ring-dark-outlineVariant"
    >
      <ArrowUpIcon ui_size="large" />
    </button>
  );
}
