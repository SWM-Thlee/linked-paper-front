import { Signature } from "@/utils/signature";

/** ex: tab-{NameWithPascalCase}-{signature} */
export type TabID = `tab-${string}-${Signature}`;
/** ex: tab-container-{signature} */
export type TabContainerID = `tab-container-${Signature}`;
/** ex: group-container-{NameWithPascalCase}-{signature} */
export type GroupContainerID = `group-container-${string}-${Signature}`;

export type Tab = { id: TabID };
export type TabDirectionObserver = { [tab: string]: string[] };
export type SettingsContainer = {
  currentTabID: TabID | null;
  setTabID: React.Dispatch<React.SetStateAction<TabID | null>>;
  directionObserver: TabDirectionObserver;
  setDirectionObserver: React.Dispatch<
    React.SetStateAction<TabDirectionObserver>
  >;
};
