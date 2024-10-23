"use client";

import Link from "next/link";

import Button from "@/ui/button";
import PdfLinkIcon from "@/ui/icons/pdf-link";
import { Popover } from "@/ui/popover";
import Badge from "@/ui/badge";
import LabelButton from "@/ui/label-button";
import { toArray } from "@/utils/array";

type Props = {
  pdfLink: string | string[];
  onClick?: (pdfLink: string) => void;
};

// 해당 논문의 PDF 링크를 새 탭으로 열도록 합니다.
export default function PdfLinkButton({ pdfLink, onClick }: Props) {
  const linksToArray = toArray(pdfLink);
  const hasSingleLink = linksToArray.length === 1;

  return hasSingleLink ? (
    // 링크가 하나만 존재
    <Link
      href={linksToArray[0]}
      target="_blank"
      onClick={() => onClick?.(linksToArray[0])}
    >
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
            {pdfLink.length}
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
