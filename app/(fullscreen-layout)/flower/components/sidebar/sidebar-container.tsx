import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function SidebarContainer({ children }: Props) {
  return (
    <div className="pointer-events-auto animate-fadeIn overflow-hidden rounded-6 bg-light-surfaceContainerLowest/90 text-light-onSurface dark:bg-dark-surfaceDim/90 dark:text-dark-onSurface">
      {children}
    </div>
  );
}
