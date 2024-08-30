"use client";

import { SearchResult } from "@/features/search/types/result";
import Button from "@/ui/button";
import PdfLinkIcon from "@/ui/icons/pdf-link";
import Popover from "@/ui/popover";
import Link from "next/link";

type Props = { pdf_link: NonNullable<SearchResult["link"]["pdf_link"]> };

// 해당 논문의 PDF 링크를 새 탭으로 열도록 합니다.
export default function SearchResultPdfLink({ pdf_link }: Props) {
  // 링크가 하나만 존재
  if (!Array.isArray(pdf_link))
    return (
      <Button _variant="light">
        <Link
          href={pdf_link}
          target="_blank"
          className="flex items-center justify-between gap-4"
        >
          <PdfLinkIcon _size="small" />
          <span className="text-label-large">Open PDF</span>
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
          <PdfLinkIcon _size="small" />
          <span className="text-label-large">
            PDF Links ({pdf_link.length})
          </span>
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="text-title-large">{pdf_link.length} Links</div>
        <div className="flex flex-col gap-2">
          {pdf_link.map((link) => (
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
