import { Signature } from "@/utils/signature";

/** ex: tab-{NameWithPascalCase}-{signature} */
export type TabID = `tab-${string}-${Signature}`;
/** ex: tabcontainer-{signature} */
export type TabContainerID = `tabcontainer-${Signature}`;
/** ex: group-{NameWithPascalCase}-{signature} */
export type GroupContainerID = `groupcontainer-${string}-${Signature}`;
/** ex: option-{signature} */
export type OptionContainerID = `optioncontainer-${Signature}`;

export type Tab = { name: string; id: TabID } & TabInfo;
export type TabInfo = { title: string; description: string };
export type TabDirectionObserver = { [tab: string]: string[] };
export type SettingsContainer = {
  currentTabID: TabID | null;
  setTabID: React.Dispatch<React.SetStateAction<TabID | null>>;
  currentTabInfo: TabInfo | null;
  setTabInfo: React.Dispatch<React.SetStateAction<TabInfo | null>>;
  directionObserver: TabDirectionObserver;
  setDirectionObserver: React.Dispatch<
    React.SetStateAction<TabDirectionObserver>
  >;
};
