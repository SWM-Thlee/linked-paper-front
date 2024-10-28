"use client";

import React, { useCallback } from "react";

import Badge from "@/ui/badge";
import { Paper } from "@/features/paper/types";
import AuthorChip from "@/features/search/components/chip/author";
import CategoryChip from "@/features/search/components/chip/category";
import JournalChip from "@/features/search/components/chip/journal";
import OthersChip from "@/features/search/components/chip/others";
import SidebarContainer from "@/features/graph/components/sidebar/sidebar-container";
import OriginLinkButton from "@/features/paper/components/origin";
import PdfLinkButton from "@/features/paper/components/pdf";
import { Analytics } from "@/features/analytics/types";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import InfoIcon from "@/ui/icons/info";

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

      log(Analytics.Event.CLICK_ORIGIN_LINK, {
        ...paper,
        originLink: [originLink],
        view: Analytics.Track.View.CORRELATION,
      });
    },
    [log, paper],
  );

  /* User Event: 특정 노드의 PDF 링크로 들어갑니다. */
  const onClickPdfLink = useCallback(
    (pdfLink: string) => {
      if (!paper) return;

      log(Analytics.Event.CLICK_PDF_LINK, {
        ...paper,
        pdfLink: [pdfLink],
        view: Analytics.Track.View.CORRELATION,
      });
    },
    [log, paper],
  );

  return (
    <SidebarContainer
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <InfoIcon />
          <div className="select-none text-title-medium">Paper Details</div>
        </div>
      }
    >
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center gap-2">
          {!!paper && (
            <>
              {paper.originLink.length > 0 && (
                <OriginLinkButton
                  originLink={paper.originLink}
                  onClick={onClickOriginLink}
                />
              )}
              {paper.pdfLink.length > 0 && (
                <PdfLinkButton
                  pdfLink={paper.pdfLink}
                  onClick={onClickPdfLink}
                />
              )}
            </>
          )}

          {children}
        </div>
        {/* Content */}
        {paper && (
          <>
            <div className="text-headline-small">{paper.title}</div>
            <div className="flex flex-wrap items-center gap-2">
              <AuthorChip
                value={paper.authors}
                className="max-w-[20rem] overflow-hidden text-ellipsis"
              />
              <OthersChip {...paper} />
              <CategoryChip
                value={paper.categories}
                className="max-w-[20rem] overflow-hidden text-ellipsis"
              />
              <JournalChip
                value={paper.journal}
                className="max-w-[20rem] overflow-hidden text-ellipsis"
              />
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
