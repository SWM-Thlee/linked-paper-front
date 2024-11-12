"use client";

import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import useIsClient from "@/hooks/use-is-client";
import { Tab } from "./types";
import { TabContext } from "./context";
import TabButton from "./tab-button";
import useTab from "./hooks/use-tab";
import useSettings from "./hooks/use-settings-container";
import useTabContainer from "./hooks/use-tab-container";
import useGroupContainer from "./hooks/use-group-container";

export interface SettingsTabRootProps extends PropsWithChildren<Tab> {
  defaultTab?: boolean;
}

export function Root({ id, defaultTab, children }: SettingsTabRootProps) {
  const { currentTabID, setTabID } = useSettings();

  // 선택된 Tab이 존재하지 않은 경우에만 기본 Tab으로 이동합니다.
  useEffect(() => {
    if (currentTabID || !defaultTab) return;
    setTabID(id);
  }, [currentTabID, defaultTab, id, setTabID]);

  return (
    <TabContext.Provider value={useMemo(() => ({ id }), [id])} key={id}>
      {children}
    </TabContext.Provider>
  );
}

export interface SettingsTabContentProps extends PropsWithChildren {}

export function Content({ children }: SettingsTabContentProps) {
  const { currentTabID } = useSettings();
  const tab = useTab();

  return tab?.id === currentTabID ? children : null;
}

export interface SettingsTabTitleProps extends PropsWithChildren {
  extra?: ReactNode;
}

export function Title({ children, extra }: SettingsTabTitleProps) {
  const { currentTabID, setTabID } = useSettings();
  const { element: tabContainerElement } = useTabContainer();
  const { groupContainerID, element: groupContainerElement } =
    useGroupContainer();
  const tab = useContext(TabContext);

  const [inited, setInited] = useState(false);
  const elementRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Scroll 전 덜컹거리는 Issue를 해결하기 위해 100ms 정도 뒤에 Scroll을 수행하도록 합니다.
    const timer = setTimeout(() => {
      if (elementRef.current && currentTabID === tab?.id) {
        elementRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [inited, currentTabID, tab]);

  const refCallback = useCallback((ref: HTMLButtonElement | null) => {
    elementRef.current = ref;
    if (elementRef.current) setInited(true);
  }, []);

  if (!useIsClient() || !tab) return null;

  return createPortal(
    <div className="flex items-center gap-2">
      <TabButton
        ui_variant={tab.id === currentTabID ? "selected" : "default"}
        ref={refCallback}
        onClick={() => {
          if (tab.id !== currentTabID) {
            setTabID(tab.id);
          }
        }}
        className="flex-1"
      >
        {children}
      </TabButton>
      {extra}
    </div>,
    groupContainerID ? groupContainerElement() : tabContainerElement(),
  );
}
