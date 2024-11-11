import { createContext } from "react";
import {
  GroupContainerID,
  SettingsContainer,
  Tab,
  TabContainerID,
} from "./types";

export const SettingsOpenContext = createContext<boolean>(false);
export const SettingsContainerContext = createContext<SettingsContainer>({
  currentTabID: null,
  directionObserver: {},
  setTabID: () => {},
  setDirectionObserver: () => {},
});
export const TabContainerContext = createContext<TabContainerID | null>(null);
export const TabContext = createContext<Tab | null>(null);
export const GroupContainerContext = createContext<GroupContainerID | null>(
  null,
);
