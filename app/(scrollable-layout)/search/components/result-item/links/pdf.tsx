"use client";

import Link from "next/link";

import Button from "@/ui/button";
import PdfLinkIcon from "@/ui/icons/pdf-link";
import { Popover } from "@/ui/popover";
import { Search } from "@/features/search/types";
import Badge from "@/ui/badge";
import LabelButton from "@/ui/label-button";

type Props = { pdf_link: NonNullable<Search.Result.Data["link"]["pdf_link"]> };

// 해당 논문의 PDF 링크를 새 탭으로 열도록 합니다.
export default function SearchResultPdfLink({ pdf_link }: Props) {
  const linksToArray = Array.isArray(pdf_link) ? pdf_link : [pdf_link];
  const hasSingleLink = linksToArray.length === 1;

  return hasSingleLink ? (
    // 링크가 하나만 존재
    <Link href={linksToArray[0]} target="_blank">
      <LabelButton
        ui_color="secondary"
        ui_variant="bordered"
        ui_size="medium"
        className="flex w-full"
      >
        <PdfLinkIcon ui_size="small" />
        <div>PDF</div>
      </LabelButton>
    </Link>
  ) : (
    // 링크가 여러 개 존재
    <Popover.Root>
      <Popover.Trigger>
        <LabelButton
          ui_color="secondary"
          ui_variant="bordered"
          ui_size="medium"
          className="relative flex items-center justify-between gap-4"
        >
          <PdfLinkIcon ui_size="small" />
          <div>PDF</div>
          <Badge ui_color="secondary" ui_variant="topRight">
            {pdf_link.length}
          </Badge>
        </LabelButton>
      </Popover.Trigger>
      <Popover.Content>
        <ul className="flex max-h-[20rem] list-disc flex-col overflow-y-auto scrollbar">
          {linksToArray.map((link) => (
            <Button
              key={link}
              ui_color="secondary"
              ui_variant="ghost"
              ui_size="small"
            >
              <li className="ml-2 text-left text-label-large">
                <Link href={link} target="_blank" className="w-full">
                  {link}
                </Link>
              </li>
            </Button>
          ))}
        </ul>
      </Popover.Content>
    </Popover.Root>
  );
}
