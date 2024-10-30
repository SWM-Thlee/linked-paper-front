"use client";

import { useCallback } from "react";
import Link from "next/link";

import LabelButton from "@/ui/label-button";
import OriginLinkButton from "@/features/paper/components/origin";
import PdfLinkButton from "@/features/paper/components/pdf";
import BloomIcon from "@/ui/icons/bloom";
import { Paper } from "@/features/paper/types";
import { Analytics } from "@/features/analytics/types";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import useSearchQueryInfo from "@/features/search/hooks/query/use-search-query-info";
import Abstraction from "./abstraction";
import ResultItemInfo from "./info";

export default function SearchResultItem(data: Paper.Scheme.ResultMetadata) {
  const { log } = useAnalytics();
  const info = useSearchQueryInfo();

  const {
    id,
    title,
    abstraction,
    authors,
    categories,
    date,
    journal,
    referenceCount,
    citationCount,
    originLink,
    pdfLink,
  } = data;
  const { similarity, ...paper } = data;

  /* User Event: 검색 결과의 원문(Origin) 링크로 들어갑니다. */
  const onClickOriginLink = useCallback(
    (origin: string) => {
      log(Analytics.Event.CLICK_ORIGIN_LINK, {
        ...paper,
        originLink: [origin],
        query: info.requiredQuery.query,
        view: Analytics.Track.View.SEARCH,
      });
    },
    [log, paper, info.requiredQuery.query],
  );

  /* User Event: 검색 결과의 PDF 링크로 들어갑니다. */
  const onClickPdfLink = useCallback(
    (pdf: string) => {
      log(Analytics.Event.CLICK_PDF_LINK, {
        ...paper,
        query: info.requiredQuery.query,
        pdfLink: [pdf],
        view: Analytics.Track.View.SEARCH,
      });
    },
    [info.requiredQuery.query, log, paper],
  );

  /* User Event: 검색 결과 기반의 그래프 뷰 페이지로 이동합니다. */
  const onMoveToGraphView = useCallback(() => {
    log(Analytics.Event.CLICK_GRAPH_VIEW, {
      ...paper,
      query: info.requiredQuery.query,
    });
  }, [info.requiredQuery.query, log, paper]);

  return (
    <div className="flex animate-slideUpAndFade flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="text-title-large text-light-onSurface dark:text-dark-onSurface">
          {title}
        </div>
        <ResultItemInfo
          authors={authors}
          categories={categories}
          journal={journal}
          date={date}
          referenceCount={referenceCount}
          citationCount={citationCount}
        />
      </div>
      <Abstraction>{abstraction}</Abstraction>
      <div className="flex gap-4">
        <Link
          href={{ pathname: "/flower", query: { id } }}
          onClick={onMoveToGraphView}
          target="_blank"
          className="flex-1"
        >
          <LabelButton
            ui_size="medium"
            className="flex h-full w-full items-center justify-evenly gap-2"
          >
            <BloomIcon ui_size="small" />
            Graph
          </LabelButton>
        </Link>
        <div className="flex flex-1 gap-4">
          <div className="flex-1">
            {originLink.length > 0 && (
              <OriginLinkButton
                originLink={originLink}
                onClick={onClickOriginLink}
              />
            )}
          </div>
          <div className="flex-1">
            {pdfLink.length > 0 && (
              <PdfLinkButton pdfLink={pdfLink} onClick={onClickPdfLink} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
