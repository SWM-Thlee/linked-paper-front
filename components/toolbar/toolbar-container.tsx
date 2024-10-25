import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function ToolbarContainer({ children }: Props) {
  return (
    <div className="pointer-events-auto flex items-center gap-2 rounded-circle bg-light-surfaceContainerLowest/90 p-2 dark:bg-dark-surfaceDim/90">
      {children}
    </div>
  );
}
