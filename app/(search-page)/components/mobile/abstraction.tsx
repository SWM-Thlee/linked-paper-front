"use client";

import { useState } from "react";

import { tv } from "@/utils/style/tailwind-variants";
import Badge from "@/ui/badge";
import ArrowDownIcon from "@/ui/icons/arrow-down";
import ArrowUpIcon from "@/ui/icons/arrow-up";

const abstractionVariant = tv({
  slots: {
    container: [
      "group/abs",
      "relative",
      "flex flex-col items-stretch gap-2",
      "rounded-2",
      "transition-colors",
      "text-left",
    ],
    badgeContainer: ["flex justify-between items-center gap-2"],
    badge: ["select-none", "transition-colors"],
    content: [
      "align-middle",
      "leading-loose",
      "text-body-medium",
      "break-words",
      "text-pretty",
      "transition-colors",
    ],
  },
  variants: {
    internal_ui_variant: {
      opened: {
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
        content: [
          "line-clamp-3",
          "text-light-onSurface",
          "dark:text-dark-onSurface",
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
  const { container, badgeContainer, badge, content } = abstractionVariant({
    internal_ui_variant: isOpen ? "opened" : "closed",
  });

  return (
    <button
      type="button"
      className={container()}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className={badgeContainer()}>
        <Badge ui_color="secondary" className={badge()}>
          ABSTRACTION
        </Badge>
        {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </div>
      <div className={content()}>{children}</div>
    </button>
  );
}
