import { createContext } from "react";
import { Graph } from "../../types";

// 이후 Type으로 넘어갈 예정
export type SidebarInfo = { [id: string]: boolean };

const defaultValue = {
  hasSidebar: false,
  registerSidebar() {},
  unregisterSidebar() {},
  sidebarInfo: {},
} satisfies Graph.Sidebar.Context;

export const GraphViewSidebarContext =
  createContext<Graph.Sidebar.Context>(defaultValue);
