import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Primitive from "@radix-ui/react-dialog";

import useIsClient from "@/hooks/use-is-client";
import { tv } from "@/utils/tailwind-variants";
import { sem } from "@/utils/semantic-styles";
import {
  SettingsContainer,
  TabDirectionObserver,
  TabID,
  TabInfo,
} from "./types";
import VisuallyHidden from "../visually-hidden";
import CloseIcon from "../icons/close";
import InfoTooltip from "../info-tooltip";
import InfoIcon from "../icons/info";
import IconButton from "../icon-button";
import {
  OpenContext,
  OptionContainerContext,
  SettingsContainerContext,
  TabContainerContext,
} from "./context";
import useTabContainerID from "./hooks/use-tab-container-id";
import useOptionContainerID from "./hooks/use-option-container-id";

export const settingsVariant = tv({
  slots: {
    overlay: sem()
      .layout(["fixed", "inset-0", "z-overlay"])
      .color(["bg-light-shadow/15", "dark:bg-dark-shadow/50"])
      .transition(["data-[state=open]:animate-overlayShow"])
      .build(),
    container: sem()
      .layout([
        "grid grid-cols-[minmax(15rem,_1fr)_4fr]",
        "fixed",
        "overflow-hidden",
        "rounded-6",
        "top-[50%] left-[50%]",
        "min-w-[50vw] max-w-[75vw]",
        "translate-x-[-50%] translate-y-[-50%]",
        "z-dialog",
      ])
      .color([
        "focus:outline-none",
        "shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]",
        "bg-light-surfaceContainerLowest",
        "text-light-onSurface",
        "dark:bg-dark-surfaceContainerLowest",
        "dark:text-dark-onSurface",
      ])
      .transition([
        "data-[state=open]:animate-contentShow",
        "data-[state=closed]:animate-contentHide",
      ])
      .build(),
    tabContainer: sem()
      .layout(["select-none", "h-[75vh]", "flex flex-col", "px-6"])
      .color([
        "bg-light-surfaceContainerLow",
        "text-light-onSurface",
        "dark:bg-dark-surfaceContainerLow",
        "dark:text-dark-onSurface",
      ])
      .build(),
    tab: sem()
      .layout([
        "flex flex-col",
        "overflow-hidden",
        "overflow-y-auto",
        "scrollbar-none",
        "py-6",
        "gap-4",
      ])
      .build(),
    contentContainer: sem()
      .layout(["relative", "h-[75vh]", "flex flex-col", "px-8"])
      .color([
        "bg-light-surfaceContainerLowest",
        "text-light-onSurface",
        "dark:bg-dark-surfaceContainerLowest",
        "dark:text-dark-onSurface",
      ])
      .build(),
    content: sem()
      .layout([
        "flex flex-col",
        "overflow-hidden",
        "overflow-y-auto",
        "scrollbar-none",
        "py-8",
      ])
      .build(),
    optionContainer: sem()
      .layout([
        "absolute",
        "flex items-center",
        "rounded-circle",
        "right-[50%] bottom-[1.5rem]",
        "translate-x-[50%]",
        "p-2",
        "gap-2",
      ])
      .color([
        "bg-light-surfaceVariant/50",
        "text-light-onSurface",
        "dark:bg-dark-surfaceVariant/50",
        "dark:text-dark-onSurface",
      ])
      .transition(["transition-transform", "empty:translate-y-[250%]"])
      .build(),
    close: sem()
      .layout(["absolute", "top-8", "right-8"])
      .color(["text-light-onSurface", "dark:text-dark-onSurface"])
      .build(),
    contentHeader: sem()
      .layout(["flex items-center", "gap-2", "text-title-large", "select-none"])
      .build(),
  },
});

export const EMPTY_TAB_INFO = {
  title: "Empty Tab",
  description: "Tab is not selected",
};

export interface SettingsRootProps extends Primitive.DialogProps {}

export function Root({ children, onOpenChange, ...props }: SettingsRootProps) {
  const [isOpen, setIsOpen] = useState(true);

  const onOpen = useCallback(
    (open: boolean) => {
      onOpenChange?.(open);
      setIsOpen(open);
    },
    [onOpenChange],
  );

  return (
    <OpenContext.Provider value={isOpen}>
      <Primitive.Root {...props} onOpenChange={onOpen}>
        {children}
      </Primitive.Root>
    </OpenContext.Provider>
  );
}

export interface SettingsTriggerProps
  extends Omit<Primitive.DialogTriggerProps, "asChild"> {}

export function Trigger({ children, ...props }: SettingsTriggerProps) {
  return (
    <Primitive.Trigger {...props} asChild>
      {children}
    </Primitive.Trigger>
  );
}

export interface SettingsContentProps extends Primitive.DialogContentProps {}

export function Content({
  children,
  className,
  ...props
}: SettingsContentProps) {
  // null로 설정 시 Content 영역에 빈 화면이 표시됩니다.
  const [tabID, setTabID] = useState<TabID | null>(null);
  const [tabInfo, setTabInfo] = useState<TabInfo | null>(null);

  // 특정 Tab으로 이동할 수 있도록 합니다.
  const [directionObserver, setDirectionObserver] =
    useState<TabDirectionObserver>({});

  const tabContainerID = useTabContainerID();
  const optionContainerID = useOptionContainerID();
  const isOpen = useContext(OpenContext);

  const value = useMemo<SettingsContainer>(
    () => ({
      currentTabID: tabID,
      setTabID,
      currentTabInfo: tabInfo,
      setTabInfo,
      directionObserver,
      setDirectionObserver,
    }),
    [tabID, tabInfo, directionObserver],
  );

  /**
   * 각 Tab은 Settings가 닫힐 때마다 Unmount됩니다. (<-> Settings 자체는 Mount를 그대로 유지)
   * 각 Tab의 고유 ID는 Mount 상태일 때만 유지되며, Unmount 후 새로 Mount될 때마다 새로운 ID가 부여됩니다.
   * Settings를 열고 닫을 때마다 Settings 내의 currentTabID와 실제 Tab의 ID와 불일치하는 현상이 일어나게 됩니다.
   * 따라서, Settings를 닫을 때 currentTab 정보를 초기화해야 합니다.
   */
  useEffect(() => {
    if (!isOpen) {
      setTabID(null);
      setTabInfo(null);
    }
  }, [isOpen]);

  if (!useIsClient()) return null;

  const {
    overlay,
    container,
    tabContainer,
    tab,
    contentContainer,
    content,
    optionContainer,
    close,
    contentHeader,
  } = settingsVariant();

  return (
    <Primitive.Portal>
      <Primitive.Overlay className={overlay()} />
      <SettingsContainerContext.Provider value={value}>
        <TabContainerContext.Provider value={tabContainerID}>
          <OptionContainerContext.Provider value={optionContainerID}>
            <Primitive.Content className={container({ className })} {...props}>
              <div className={tabContainer()}>
                <div className={tab()} id={tabContainerID} />
              </div>
              <div className={contentContainer()}>
                <Primitive.Close asChild>
                  <IconButton className={close()}>
                    <CloseIcon />
                  </IconButton>
                </Primitive.Close>
                <div className={content()}>
                  <div className={contentHeader()}>
                    {tabInfo ? (
                      <>
                        <Primitive.Title>{tabInfo.title}</Primitive.Title>
                        <InfoTooltip title={tabInfo.description}>
                          <InfoIcon />
                        </InfoTooltip>
                        <VisuallyHidden>
                          <Primitive.Description>
                            {tabInfo.description}
                          </Primitive.Description>
                        </VisuallyHidden>
                      </>
                    ) : (
                      <VisuallyHidden>
                        <Primitive.Title>
                          {EMPTY_TAB_INFO.title}
                        </Primitive.Title>
                        <Primitive.Description>
                          {EMPTY_TAB_INFO.description}
                        </Primitive.Description>
                      </VisuallyHidden>
                    )}
                  </div>
                  {children}
                </div>
                <div id={optionContainerID} className={optionContainer()} />
              </div>
            </Primitive.Content>
          </OptionContainerContext.Provider>
        </TabContainerContext.Provider>
      </SettingsContainerContext.Provider>
    </Primitive.Portal>
  );
}

export * as Tab from "./tab";
export * as Group from "./group";
