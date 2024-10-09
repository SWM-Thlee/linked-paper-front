"use client";

import { useState } from "react";

import { tv } from "@/utils/tailwind-variants";
import Badge from "@/ui/badge";
import IconButton from "@/ui/icon-button";
import AddIcon from "@/ui/icons/add";
import CloseIcon from "@/ui/icons/close";

const abstractionVariant = tv({
  slots: {
    container: [
      "group/abs",
      "relative",
      "flex flex-col gap-2",
      "rounded-2",
      "p-4",
      "transition-colors",
    ],
    badgeContainer: ["flex flex-wrap items-center gap-2"],
    badge: ["select-none", "transition-colors"],
    content: [
      "align-middle",
      "leading-loose",
      "text-body-large",
      "transition-colors",
    ],
    open: [
      "invisible",
      "absolute right-[1rem] top-[1rem]",
      "group-hover/abs:visible",
    ],
    close: ["absolute right-[1rem] top-[1rem]"],
  },
  variants: {
    internal_ui_variant: {
      opened: {
        container: [
          "bg-light-secondaryContainer",
          "dark:bg-dark-secondaryContainer",
        ],
        badge: [
          "bg-light-onSecondaryContainer",
          "text-light-secondaryContainer",
          "dark:bg-dark-onSecondaryContainer",
          "dark:text-dark-secondaryContainer",
        ],
        content: [
          "text-light-onSecondaryContainer",
          "dark:text-dark-onSecondaryContainer",
        ],
      },
      closed: {
        container: [
          "ring-inset ring-2",
          "ring-light-outlineVariant/25",
          "hover:bg-light-secondaryContainer",
          "dark:ring-dark-outlineVariant/25",
          "dark:hover:bg-dark-secondaryContainer",
        ],
        badge: [
          "group-hover/abs:bg-light-onSecondaryContainer",
          "group-hover/abs:text-light-secondaryContainer",
          "dark:group-hover/abs:bg-dark-onSecondaryContainer",
          "dark:group-hover/abs:text-dark-secondaryContainer",
        ],
        content: [
          "line-clamp-3",
          "text-light-onSurface",
          "group-hover/abs:text-light-onSecondaryContainer",
          "dark:text-dark-onSurface",
          "dark:group-hover/abs:text-dark-onSecondaryContainer",
        ],
      },
    },
  },
});

type Props = {
  children?: React.ReactNode;
};

// TODO: TLDR 등 추가 예정
/** 논문의 요약 정보를 나타냅니다. */
export default function Abstraction({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { container, badgeContainer, badge, content, open, close } =
    abstractionVariant({ internal_ui_variant: isOpen ? "opened" : "closed" });

  return (
    <div className={container()}>
      <div className={badgeContainer()}>
        <Badge ui_color="secondary" className={badge()}>
          ABSTRACTION
        </Badge>
      </div>
      <div className={content()}>{children}</div>
      {isOpen ? (
        <IconButton className={close()} onClick={() => setIsOpen(false)}>
          <CloseIcon ui_size="small" />
        </IconButton>
      ) : (
        <IconButton className={open()} onClick={() => setIsOpen(true)}>
          <AddIcon ui_size="small" />
        </IconButton>
      )}
    </div>
  );
}
