import { produce } from "immer";
import { useCallback, useMemo, useState } from "react";

import { Graph } from "../../types";

export default function useInternalSidebar() {
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

  return {
    hasSidebar,
    registerSidebar,
    unregisterSidebar,
    sidebarInfo,
  } satisfies Graph.Sidebar.Context;
}
