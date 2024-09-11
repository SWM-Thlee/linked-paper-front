"use client";

import { createPortal } from "react-dom";

import useIsClient from "@/hooks/use-is-client";
import { tv } from "@/utils/tailwind-variants";
import { sem } from "@/utils/semantic-styles";
import { GroupContainerID } from "./types";
import { GroupContainerContext } from "./context";
import useTabContainer from "./hooks/use-tab-container";
import useGroupContainer from "./hooks/use-group-container";

export const groupVariant = tv({
  base: sem()
    .layout(["flex flex-col", "gap-3", "p-4", "rounded-4", "text-body-large"])
    .color([
      "bg-light-primaryContainer/25",
      "text-light-onPrimaryContainer",
      "dark:bg-dark-primaryContainer/25",
      "dark:text-dark-onPrimaryContainer",
    ])
    .transition(["transition-colors", "animate-scaleIn", "duration-200"])
    .build(),
});

export interface SettingsGroupRootProps extends React.ComponentProps<"div"> {
  id: GroupContainerID;
}

export function Root({ id, children, ...props }: SettingsGroupRootProps) {
  const { element } = useTabContainer();

  if (!useIsClient()) return null;

  return (
    <GroupContainerContext.Provider value={id}>
      {children}
      {createPortal(
        <div id={id} className={groupVariant()} {...props} />,
        element(),
      )}
    </GroupContainerContext.Provider>
  );
}

export interface SettingsGroupTitleProps extends React.ComponentProps<"div"> {}

export function Title({ children, ...props }: SettingsGroupTitleProps) {
  const { element } = useGroupContainer();

  if (!useIsClient()) return null;

  return createPortal(<div {...props}>{children}</div>, element());
}
