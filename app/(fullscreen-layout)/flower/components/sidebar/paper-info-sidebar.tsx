"use client";

import React, { useCallback } from "react";

import Badge from "@/ui/badge";
import IconButton from "@/ui/icon-button";
import CloseIcon from "@/ui/icons/close";
import { Paper } from "@/features/paper/types";
import AuthorChip from "@/features/search/components/chip/author";
import { CategoryChip } from "@/features/search/components/chip/category";
import OthersChip from "@/features/search/components/chip/others";
import SidebarContainer from "@/features/graph/components/sidebar/sidebar-container";
import OriginLinkButton from "@/features/paper/components/origin";
import PdfLinkButton from "@/features/paper/components/pdf";
import { Analytics } from "@/features/analytics/types";
import useAnalytics from "@/features/analytics/hooks/use-analytics";

type Props = {
  paper: Paper.Scheme.Metadata | null;
  children?: React.ReactNode;
  onClose: () => void;
};

export default function PaperInfoSidebar({ paper, onClose, children }: Props) {
  const { log } = useAnalytics();

  /* User Event: 특정 노드의 원문(Origin) 링크로 들어갑니다. */
  const onClickOriginLink = useCallback(
    (originLink: string) => {
      if (!paper) return;

      const { link, ...others } = paper;

      log(Analytics.Event.CLICK_ORIGIN_LINK, {
        ...others,
        origin_link: originLink,
        pdf_link: Array.isArray(link.pdf_link)
          ? link.pdf_link.join(",")
          : link.pdf_link,
        view: Analytics.Track.View.CORRELATION,
      });
    },
    [log, paper],
  );

  /* User Event: 특정 노드의 PDF 링크로 들어갑니다. */
  const onClickPdfLink = useCallback(
    (pdfLink: string) => {
      if (!paper) return;

      const { link, ...others } = paper;

      log(Analytics.Event.CLICK_PDF_LINK, {
        ...others,
        origin_link: Array.isArray(link.origin_link)
          ? link.origin_link.join(",")
          : link.origin_link,
        pdf_link: pdfLink,
        view: Analytics.Track.View.CORRELATION,
      });
    },
    [log, paper],
  );

  return (
    <SidebarContainer>
      <div className="pointer-events-none absolute left-0 top-0 z-10 flex w-full items-center justify-end p-8">
        <IconButton onClick={onClose} className="pointer-events-auto">
          <CloseIcon />
        </IconButton>
      </div>
      <div className="flex max-h-[80vh] flex-col gap-8 overflow-y-auto p-8 scrollbar-none">
        {/* Header */}
        <div className="flex items-center gap-2">
          {paper?.link.origin_link && (
            <OriginLinkButton
              origin_link={paper?.link.origin_link}
              onClick={onClickOriginLink}
            />
          )}
          {paper?.link.pdf_link && (
            <PdfLinkButton
              pdf_link={paper?.link.pdf_link}
              onClick={onClickPdfLink}
            />
          )}
          {children}
        </div>
        {/* Content */}
        {paper && (
          <>
            <div className="text-headline-small">{paper.title}</div>
            <div className="flex flex-wrap items-center gap-2">
              <AuthorChip authors={paper.authors} />
              <CategoryChip categoryIDs={paper.categories} />
              <OthersChip {...paper} />
            </div>
            <div className="flex flex-col gap-4">
              <Badge ui_color="secondary" className="self-start">
                ABSTRACTION
              </Badge>
              <div className="text-body-large text-lg leading-loose tracking-wider">
                {paper.abstraction}
              </div>
            </div>
          </>
        )}
      </div>
    </SidebarContainer>
  );
}
