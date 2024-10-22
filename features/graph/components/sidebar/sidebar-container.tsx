"use client";

import React, { useContext, useEffect } from "react";

import useSignature from "@/hooks/use-signature";
import { SidebarContext } from "./context";

type Props = {
  children?: React.ReactNode;
};

export default function SidebarContainer({ children }: Props) {
  const id = useSignature("Sidebar");
  const { registerSidebar, unregisterSidebar } = useContext(SidebarContext);

  useEffect(() => {
    registerSidebar(id);
    return () => unregisterSidebar(id);
  }, [id, registerSidebar, unregisterSidebar]);

  return (
    <div className="pointer-events-auto animate-fadeIn overflow-hidden rounded-6 bg-light-surfaceContainerLowest/90 text-light-onSurface dark:bg-dark-surfaceDim/90 dark:text-dark-onSurface">
      {children}
    </div>
  );
}
