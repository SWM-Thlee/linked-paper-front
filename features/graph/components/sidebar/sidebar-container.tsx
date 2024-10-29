"use client";

import React, { useContext, useEffect } from "react";

import useSignature from "@/hooks/use-signature";
import IconButton from "@/ui/icon-button";
import CloseIcon from "@/ui/icons/close";
import { SidebarContext } from "./context";

type Props = {
  children?: React.ReactNode;
  title?: string | React.ReactNode;
  onClose?: () => void;
};

export default function SidebarContainer({ children, onClose, title }: Props) {
  const id = useSignature("Sidebar");
  const { registerSidebar, unregisterSidebar } = useContext(SidebarContext);

  useEffect(() => {
    registerSidebar(id);
    return () => unregisterSidebar(id);
  }, [id, registerSidebar, unregisterSidebar]);

  return (
    <div>
      {title && (
        <div className="mb-4 flex items-center justify-between text-title-medium text-light-onSurface dark:text-dark-onSurface">
          {title}
          {onClose && (
            <IconButton aria-label={`Close ${title}`} onClick={onClose}>
              <CloseIcon ui_size="small" />
            </IconButton>
          )}
        </div>
      )}

      <div className="animate-fadeIn rounded-4 p-8 text-light-onSurface ring-2 ring-inset ring-light-outlineVariant/25 dark:text-dark-onSurface dark:ring-dark-outlineVariant/25">
        {children}
      </div>
    </div>
  );
}
