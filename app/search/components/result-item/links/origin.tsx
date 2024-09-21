"use client";

import Link from "next/link";

import Button from "@/ui/button";
import OriginLinkIcon from "@/ui/icons/origin-link";
import { Popover } from "@/ui/popover";
import { Search } from "@/features/search/types";

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
    <Button ui_variant="light">
      <Link
        href={linksToArray[0]}
        target="_blank"
        className="flex items-center justify-between gap-4"
      >
        <OriginLinkIcon ui_size="small" />
        <span className="text-label-large">Origin Link</span>
      </Link>
    </Button>
  ) : (
    // 링크가 두 개 이상 존재하는 경우
    <Popover.Root>
      <Popover.Trigger>
        <Button
          ui_variant="light"
          className="flex items-center justify-between gap-4"
        >
          <OriginLinkIcon ui_size="small" />
          <span className="text-label-large">
            Origin Links ({origin_link.length})
          </span>
        </Button>
      </Popover.Trigger>
      <Popover.Content ui_size="large">
        <div className="flex flex-col gap-4">
          <div className="text-title-large">{origin_link.length} Links</div>
          <div className="flex flex-col gap-2">
            {linksToArray.map((link) => (
              <Button key={link} ui_variant="bordered" className="text-left">
                <Link href={link} target="_blank">
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
