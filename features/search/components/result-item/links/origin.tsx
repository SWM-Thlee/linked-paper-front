"use client";

import { SearchResult } from "@/features/search/types/result";
import Button from "@/ui/button";
import OriginLinkIcon from "@/ui/icons/origin-link";
import Popover from "@/ui/popover";
import Link from "next/link";

type Props = { origin_link: NonNullable<SearchResult["link"]["origin_link"]> };

// 해당 논문의 원문 링크를 새 탭으로 열도록 합니다.
export default function SearchResultOriginLink({ origin_link }: Props) {
  // 링크가 하나만 존재
  if (!Array.isArray(origin_link))
    return (
      <Button _variant="light">
        <Link
          href={origin_link}
          target="_blank"
          className="flex items-center justify-between gap-4"
        >
          <OriginLinkIcon _size="small" />
          <span className="text-label-large">Origin Link</span>
        </Link>
      </Button>
    );

  // 링크가 여러 개 존재
  return (
    <Popover
      _size="large"
      trigger={
        <Button
          _variant="light"
          className="flex items-center justify-between gap-4"
        >
          <OriginLinkIcon _size="small" />
          <span className="text-label-large">
            Origin Links ({origin_link.length})
          </span>
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="text-title-large">{origin_link.length} Links</div>
        <div className="flex flex-col gap-2">
          {origin_link.map((link) => (
            <Button key={link} _variant="bordered" className="text-left">
              <Link href={link} target="_blank">
                <div className="max-w-[20rem] overflow-hidden text-ellipsis text-nowrap text-label-large">
                  {link}
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </Popover>
  );
}
