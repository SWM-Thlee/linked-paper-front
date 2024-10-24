"use client";

import { useCallback, useMemo, useState } from "react";
import { produce } from "immer";

import { tv } from "@/utils/style/tailwind-variants";
import { SidebarContext } from "./context";
import { Graph } from "../../types";

const sidebarVariant = tv({
  base: [
    "fixed right-0 top-[45%]",
    "z-dialog",
    "mr-[2rem]",
    "max-h-[calc(90vh-4rem)] w-[30vw] md:w-[40vw]",
    "-translate-y-[50%]",
    "overflow-y-auto",
    "rounded-6",
    "bg-light-surfaceBright/90 dark:bg-dark-surfaceDim/90",
    "p-6",
    "scrollbar scrollbar-none",
  ],
  variants: {
    internal_ui_visible: {
      visible: ["block"],
      invisible: ["hidden"],
    },
  },
});

type Props = {
  children?: React.ReactNode;
};

export default function Sidebar({ children }: Props) {
  const [sidebarInfo, setSidebarInfo] = useState<Graph.Sidebar.Info>({});

  const hasSidebar = useMemo(
    () => Object.keys(sidebarInfo).length > 0,
    [sidebarInfo],
  );

  const registerSidebar = useCallback(
    (id: Graph.Sidebar.Id) =>
      setSidebarInfo((prevInfo) => ({ ...prevInfo, [id]: {} })),
    [],
  );

  const unregisterSidebar = useCallback(
    (id: Graph.Sidebar.Id) =>
      setSidebarInfo((prevInfo) =>
        produce(prevInfo, (draft) => {
          delete draft[id];
        }),
      ),
    [],
  );

  const sidebarProps = useMemo(() => {
    return { hasSidebar, registerSidebar, unregisterSidebar, sidebarInfo };
  }, [hasSidebar, registerSidebar, unregisterSidebar, sidebarInfo]);

  return (
    <SidebarContext.Provider value={sidebarProps}>
      <div
        className={sidebarVariant({
          internal_ui_visible: hasSidebar ? "visible" : "invisible",
        })}
      >
        <div className="relative flex flex-col items-stretch justify-center gap-6">
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
