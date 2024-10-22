"use client";

import { useCallback } from "react";
import Link from "next/link";

import useAnalytics from "@/features/analytics/hooks/use-analytics";
import { Search } from "@/features/search/types";
import AuthorChip from "@/features/search/components/chip/author";
import { CategoryChip } from "@/features/search/components/chip/category";
import CategoryIcon from "@/ui/icons/category";
import LabelButton from "@/ui/label-button";
import AuthorIcon from "@/ui/icons/author";
import OthersChip from "@/features/search/components/chip/others";
import JournalIcon from "@/ui/icons/journal";
import SpliterIcon from "@/ui/icons/spliter";
import DateIcon from "@/ui/icons/date";
import OriginLinkButton from "@/features/paper/components/origin";
import PdfLinkButton from "@/features/paper/components/pdf";
import BloomIcon from "@/ui/icons/bloom";
import { Analytics } from "@/features/analytics/types";
import useSearchQueryInfo from "@/features/search/hooks/query/use-search-query-info";
import CitationIcon from "@/ui/icons/citation";
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
    journal,
    date,
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
          <AuthorChip authors={authors}>
            {(titleOfChip) => (
              <LabelButton
                ui_size="small"
                ui_color="secondary"
                ui_variant="light"
              >
                <AuthorIcon ui_size="small" />
                <div className="max-w-[10rem] overflow-hidden text-ellipsis">
                  {titleOfChip}
                </div>
              </LabelButton>
            )}
          </AuthorChip>
          <CategoryChip categoryIDs={categories}>
            {(titleOfChip) => (
              <LabelButton
                ui_size="small"
                ui_color="secondary"
                ui_variant="light"
              >
                <CategoryIcon ui_size="small" />
                <div className="max-w-[15rem] overflow-hidden text-ellipsis">
                  {titleOfChip}
                </div>
              </LabelButton>
            )}
          </CategoryChip>
          <OthersChip
            journal={journal}
            date={date}
            reference_count={reference}
            citation_count={citation}
          >
            <LabelButton
              ui_color="secondary"
              ui_size="small"
              ui_variant="light"
            >
              <JournalIcon ui_size="small" /> {journal}
              <SpliterIcon />
              <DateIcon ui_size="small" /> {date}
              <SpliterIcon />
              <CitationIcon ui_size="small" /> {citation}
            </LabelButton>
          </OthersChip>
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
