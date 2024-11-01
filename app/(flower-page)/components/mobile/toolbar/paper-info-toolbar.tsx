"use client";

import { useCallback } from "react";

import ResultItemInfo from "@/app/(search-page)/components/mobile/info";
import ToolbarContainer from "@/components/toolbar/toolbar-container";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import { Analytics } from "@/features/analytics/types";
import OriginLinkButton from "@/features/paper/components/origin";
import PdfLinkButton from "@/features/paper/components/pdf";
import { Paper } from "@/features/paper/types";
import { Dialog } from "@/ui/dialog";
import InfoIcon from "@/ui/icons/info";
import LabelButton from "@/ui/label-button";
import VisuallyHidden from "@/ui/visually-hidden";
import Badge from "@/ui/badge";

export type PaperInfoToolbarProps = {
  paper: Paper.Scheme.Metadata | null;
};

export default function PaperInfoToolbar({ paper }: PaperInfoToolbarProps) {
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
    <ToolbarContainer className="gap-0 p-0.5">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <LabelButton ui_variant="ghost" ui_color="secondary">
            <InfoIcon />
            <span>Paper Info</span>
          </LabelButton>
        </Dialog.Trigger>
        <VisuallyHidden>
          <Dialog.Title>Paper Info</Dialog.Title>
          <Dialog.Description>
            {paper?.title ?? "Unknown Paper"}
          </Dialog.Description>
        </VisuallyHidden>
        <Dialog.Content className="h-screen w-screen overflow-y-auto rounded-0 p-8 scrollbar-none">
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
            </div>
            {/* Content */}
            {paper && (
              <>
                <div className="text-headline-small">{paper.title}</div>
                <ResultItemInfo {...paper} defaultOpen />
                <div className="flex flex-col gap-2">
                  <Badge
                    ui_color="secondary"
                    className="select-none self-start"
                  >
                    ABSTRACTION
                  </Badge>
                  <p className="text-pretty break-words align-middle text-body-medium leading-loose">
                    {paper.abstraction}
                  </p>
                </div>
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </ToolbarContainer>
  );
}
