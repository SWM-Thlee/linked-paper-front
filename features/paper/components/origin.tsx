"use client";

import Link from "next/link";

import Button from "@/ui/button";
import OriginLinkIcon from "@/ui/icons/origin-link";
import { Popover } from "@/ui/popover";
import LabelButton from "@/ui/label-button";
import Badge from "@/ui/badge";
import { toArray } from "@/utils/array";

type Props = {
  originLink: string | string[];
  title?: string;
  onClick?: (originLink: string) => void;
};

/**
 * 해당 논문의 원문 링크를 새로운 탭으로 열도록 합니다.
 */
export default function OriginLinkButton({
  originLink,
  title,
  onClick,
}: Props) {
  const linksToArray = toArray(originLink);
  const hasSingleLink = linksToArray.length === 1;

  return hasSingleLink ? (
    // 링크가 하나만 존재하는 경우
    <Link
      href={linksToArray[0]}
      target="_blank"
      onClick={() => onClick?.(linksToArray[0])}
    >
      <LabelButton
        ui_variant="bordered"
        ui_color="secondary"
        ui_size="medium"
        className="flex h-full w-full items-center gap-4 only:justify-evenly"
      >
        <OriginLinkIcon ui_size="small" />
        {title && <div>{title}</div>}
      </LabelButton>
    </Link>
  ) : (
    // 링크가 두 개 이상 존재하는 경우
    <Popover.Root>
      <Popover.Trigger>
        <LabelButton
          ui_color="secondary"
          ui_variant="bordered"
          ui_size="medium"
          className="relative flex h-full w-full items-center justify-between gap-4"
        >
          <OriginLinkIcon ui_size="small" />
          {title && <div>{title}</div>}
          <Badge ui_variant="topRight" ui_color="secondary">
            {originLink.length}
          </Badge>
        </LabelButton>
      </Popover.Trigger>
      <Popover.Content>
        <ul className="flex max-h-[20rem] list-disc flex-col overflow-y-auto scrollbar">
          {linksToArray.map((link) => (
            <Link
              href={link}
              target="_blank"
              className="w-full"
              key={link}
              onClick={() => onClick?.(link)}
            >
              <Button ui_color="secondary" ui_variant="ghost" ui_size="small">
                <li className="ml-2 text-left text-label-large">{link}</li>
              </Button>
            </Link>
          ))}
        </ul>
      </Popover.Content>
    </Popover.Root>
  );
}
