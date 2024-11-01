import React from "react";

import { cn } from "@/utils/style/tailwind-variants";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function ToolbarContainer({ children, className }: Props) {
  return (
    <div
      className={cn(
        "pointer-events-auto flex items-center gap-2 rounded-circle bg-light-surfaceContainerLowest/90 p-2 dark:bg-dark-surfaceDim/90",
        className,
      )}
    >
      {children}
    </div>
  );
}
