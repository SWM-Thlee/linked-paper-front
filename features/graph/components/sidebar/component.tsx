"use client";

import { useCallback, useMemo, useState } from "react";
import { produce } from "immer";

import { SidebarContext } from "./context";
import { Graph } from "../../types";

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
      <div className="pointer-events-none fixed right-0 top-[50%] z-dialog w-[40vw] -translate-y-[50%] p-[2rem]">
        <div className="relative flex flex-col items-stretch justify-center gap-[2rem]">
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
