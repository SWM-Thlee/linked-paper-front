import { createContext } from "react";
import {
  GroupContainerID,
  OptionContainerID,
  SettingsContainer,
  Tab,
  TabContainerID,
} from "./types";

export const OpenContext = createContext<boolean>(false);
export const SettingsContainerContext = createContext<SettingsContainer>({
  currentTabID: null,
  currentTabInfo: null,
  directionObserver: {},
  setTabID: () => {},
  setTabInfo: () => {},
  setDirectionObserver: () => {},
});
export const TabContainerContext = createContext<TabContainerID | null>(null);
export const TabContext = createContext<Tab | null>(null);
export const GroupContainerContext = createContext<GroupContainerID | null>(
  null,
);
export const OptionContainerContext = createContext<OptionContainerID | null>(
  null,
);
