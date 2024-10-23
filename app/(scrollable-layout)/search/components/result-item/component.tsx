"use client";

import { useCallback } from "react";
import Link from "next/link";

import { Search } from "@/features/search/types";
import AuthorChip from "@/features/search/components/chip/author";
import CategoryChip from "@/features/search/components/chip/category";
import JournalChip from "@/features/search/components/chip/journal";
import OthersChip from "@/features/search/components/chip/others";
import LabelButton from "@/ui/label-button";
import OriginLinkButton from "@/features/paper/components/origin";
import PdfLinkButton from "@/features/paper/components/pdf";
import BloomIcon from "@/ui/icons/bloom";
import { Analytics } from "@/features/analytics/types";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import useSearchQueryInfo from "@/features/search/hooks/query/use-search-query-info";
import Abstraction from "./abstraction";

export default function SearchResultItem(data: Search.Result.Data) {
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
    reference_count: reference,
    citation_count: citation,
  } = data;
  const { similarity, link, ...paper } = data;

  /* User Event: 검색 결과의 원문(Origin) 링크로 들어갑니다. */
  const onClickOriginLink = useCallback(
    (originLink: string) => {
      log(Analytics.Event.CLICK_ORIGIN_LINK, {
        ...paper,
        query: info.requiredQuery.query,
        origin_link: originLink,
        pdf_link: Array.isArray(link.pdf_link)
          ? link.pdf_link.join(",")
          : link.pdf_link,
        view: Analytics.Track.View.SEARCH,
      });
    },
    [log, paper, link.pdf_link, info.requiredQuery.query],
  );

  /* User Event: 검색 결과의 PDF 링크로 들어갑니다. */
  const onClickPdfLink = useCallback(
    (pdfLink: string) => {
      log(Analytics.Event.CLICK_PDF_LINK, {
        ...paper,
        query: info.requiredQuery.query,
        origin_link: Array.isArray(link.origin_link)
          ? link.origin_link.join(",")
          : link.origin_link,
        pdf_link: pdfLink,
        view: Analytics.Track.View.SEARCH,
      });
    },
    [info.requiredQuery.query, log, paper, link.origin_link],
  );

  /* User Event: 검색 결과 기반의 그래프 뷰 페이지로 이동합니다. */
  const onMoveToGraphView = useCallback(() => {
    log(Analytics.Event.CLICK_GRAPH_VIEW, {
      ...paper,
      query: info.requiredQuery.query,
      origin_link: Array.isArray(link.origin_link)
        ? link.origin_link.join(",")
        : link.origin_link,
      pdf_link: Array.isArray(link.pdf_link)
        ? link.pdf_link.join(",")
        : link.pdf_link,
    });
  }, [info.requiredQuery.query, log, paper, link.pdf_link, link.origin_link]);

  return (
    <div className="grid animate-slideUpAndFade grid-cols-[auto_10rem] gap-8">
      <div className="flex flex-1 flex-col gap-8">
        <div className="text-headline-small text-light-onSurface dark:text-dark-onSurface">
          {title}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <AuthorChip
            value={authors}
            className="max-w-[20rem] overflow-hidden text-ellipsis"
          />
          <CategoryChip
            value={categories}
            className="max-w-[20rem] overflow-hidden text-ellipsis"
          />
          <JournalChip
            value={journal}
            className="max-w-[20rem] overflow-hidden text-ellipsis"
          />
          <OthersChip
            date={date}
            reference_count={reference}
            citation_count={citation}
          />
        </div>
        <Abstraction>{abstraction}</Abstraction>
      </div>
      <div className="flex flex-col justify-end gap-2">
        <Link
          href={{ pathname: "/flower", query: { id } }}
          onClick={onMoveToGraphView}
        >
          <LabelButton ui_size="medium" className="w-full">
            <BloomIcon ui_size="small" />
            Graph
          </LabelButton>
        </Link>
        {link.origin_link && (
          <OriginLinkButton
            origin_link={link.origin_link}
            onClick={onClickOriginLink}
          />
        )}
        {link.pdf_link && (
          <PdfLinkButton pdf_link={link.pdf_link} onClick={onClickPdfLink} />
        )}
      </div>
    </div>
  );
}
