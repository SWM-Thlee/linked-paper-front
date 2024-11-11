"use client";

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as Primitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { tv, VariantProps } from "@/utils/style/tailwind-variants";
import CloseIcon from "../icons/close";
import {
  SettingsContainerContext,
  SettingsOpenContext,
  TabContainerContext,
} from "./context";
import useTabContainerID from "./hooks/use-tab-container-id";
import { SettingsContainer, TabDirectionObserver, TabID } from "./types";

// Root Component
export interface RootProps extends Primitive.DialogProps {}

export function Root({ children, onOpenChange, ...props }: RootProps) {
  const [isOpen, setIsOpen] = useState(true);

  const onOpen = useCallback(
    (open: boolean) => {
      onOpenChange?.(open);
      setIsOpen(open);
    },
    [onOpenChange],
  );

  return (
    <SettingsOpenContext.Provider value={isOpen}>
      <Primitive.Root {...props} onOpenChange={onOpen}>
        {children}
      </Primitive.Root>
    </SettingsOpenContext.Provider>
  );
}

// AriaInfo Component
export interface AriaInfoProps {
  title?: string;
  description?: string;
}

export function AriaInfo({
  title = "Settings",
  description = "This is the settings dialog.",
}: AriaInfoProps) {
  return (
    <VisuallyHidden>
      <Primitive.Title>{title}</Primitive.Title>
      <Primitive.Description>{description}</Primitive.Description>
    </VisuallyHidden>
  );
}

// Trigger Component
export interface TriggerProps
  extends Omit<Primitive.DialogTriggerProps, "asChild"> {}

export function Trigger({ children, ...props }: TriggerProps) {
  return (
    <Primitive.Trigger {...props} asChild>
      {children}
    </Primitive.Trigger>
  );
}

// Content Component
export const settingsVariant = tv({
  slots: {
    // Overlay
    overlay: [
      "fixed inset-0 z-overlay bg-light-shadow/15 dark:bg-dark-shadow/50",
      "transition data-[state=open]:animate-overlayShow",
    ],
    // Container (Tabs + Content)
    container: [
      "grid grid-cols-[3fr_4fr] overflow-hidden rounded-4 h-[75vh]",
      "fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
      "focus:outline-none z-dialog",
      "bg-light-surfaceContainer dark:bg-dark-surfaceContainer text-light-onSurface dark:text-dark-onSurface",
      "shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]",
      "transition data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide",
    ],
    // Tabs Container
    tabs: [
      "select-none flex flex-col gap-4 p-5 overflow-y-auto scrollbar-none",
      "bg-light-surfaceContainerLow text-light-onSurface dark:bg-dark-surfaceContainerLow dark:text-dark-onSurface",
    ],
    // Content Container
    content: ["flex snap-x snap-mandatory overflow-hidden scrollbar-none"],
    // Close Button
    close: [
      "absolute top-[34px] right-[34px] z-tooltip",
      "text-light-onSurface dark:text-dark-onSurface",
    ],
  },
});

export interface ContentProps
  extends Primitive.DialogContentProps,
    VariantProps<typeof settingsVariant> {}

export function Content({ children, className, ...props }: ContentProps) {
  const { overlay, container, close, tabs, content } = settingsVariant();

  // null로 설정 시 Content 영역에 빈 화면이 표시됩니다.
  const [tabID, setTabID] = useState<TabID | null>(null);

  // 특정 Tab으로 이동할 수 있도록 합니다.
  const [directionObserver, setDirectionObserver] =
    useState<TabDirectionObserver>({});

  const tabContainerID = useTabContainerID();
  const isOpen = useContext(SettingsOpenContext);

  const value = useMemo<SettingsContainer>(
    () => ({
      currentTabID: tabID,
      setTabID,
      directionObserver,
      setDirectionObserver,
    }),
    [tabID, directionObserver],
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
    }
  }, [isOpen]);

  return (
    <Primitive.Portal>
      <Primitive.Overlay className={overlay()} />
      <SettingsContainerContext.Provider value={value}>
        <TabContainerContext.Provider value={tabContainerID}>
          <Primitive.Content className={container({ className })} {...props}>
            <Primitive.Close asChild>
              <button type="button" aria-label="Close" className={close()}>
                <CloseIcon />
              </button>
            </Primitive.Close>
            <div className={tabs()} id={tabContainerID} />
            <div className={content()}>{children}</div>
          </Primitive.Content>
        </TabContainerContext.Provider>
      </SettingsContainerContext.Provider>
    </Primitive.Portal>
  );
}

export * as Tab from "./tab";
export * as Group from "./group";
