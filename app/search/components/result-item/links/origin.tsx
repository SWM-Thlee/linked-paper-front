"use client";

import Link from "next/link";

import Button from "@/ui/button";
import OriginLinkIcon from "@/ui/icons/origin-link";
import { Popover } from "@/ui/popover";
import { Search } from "@/features/search/types";
import LabelButton from "@/ui/label-button";
import Badge from "@/ui/badge";

type Props = {
  origin_link: Search.Result.Data["link"]["origin_link"] & NonNullable<unknown>;
};

/**
 * 해당 논문의 원문 링크를 새로운 탭으로 열도록 합니다.
 */
export default function SearchResultOriginLink({ origin_link }: Props) {
  const linksToArray = Array.isArray(origin_link) ? origin_link : [origin_link];
  const hasSingleLink = linksToArray.length === 1;

  return hasSingleLink ? (
    // 링크가 하나만 존재하는 경우
    <LabelButton ui_variant="bordered" ui_color="secondary" ui_size="medium">
      <Link
        href={linksToArray[0]}
        target="_blank"
        className="flex w-full items-center justify-between gap-4"
      >
        <OriginLinkIcon ui_size="small" />
        <div>Origin</div>
      </Link>
    </LabelButton>
  ) : (
    // 링크가 두 개 이상 존재하는 경우
    <Popover.Root>
      <Popover.Trigger>
        <LabelButton
          ui_color="secondary"
          ui_variant="bordered"
          ui_size="medium"
          className="relative flex items-center justify-between gap-4"
        >
          <OriginLinkIcon ui_size="small" />
          <div>Origin</div>
          <Badge ui_variant="topRight" ui_color="secondary">
            {origin_link.length}
          </Badge>
        </LabelButton>
      </Popover.Trigger>
      <Popover.Content ui_size="large">
        <div className="flex flex-col gap-4">
          <div className="select-none text-title-medium">
            {origin_link.length} Origin Links
          </div>
          <div className="flex flex-col gap-2">
            {linksToArray.map((link) => (
              <Button key={link} ui_color="secondary" ui_variant="light">
                <Link
                  href={link}
                  target="_blank"
                  className="flex w-full items-center gap-6"
                >
                  <OriginLinkIcon ui_size="small" />
                  <div className="max-w-[20rem] overflow-hidden text-ellipsis text-nowrap text-label-large">
                    {link}
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
