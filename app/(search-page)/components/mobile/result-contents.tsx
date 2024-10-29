"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { Analytics } from "@/features/analytics/types";
import ViewTrigger from "@/components/view-trigger";
import { queryOptions } from "@/features/search/server/queries";
import useSearchQueryInfo from "@/features/search/hooks/query/use-search-query-info";
import useScrollLock from "@/hooks/use-scroll-lock";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import {
  EndOfPage,
  InitialLoading,
  NextLoading,
  Spliter,
} from "./result-skeleton/defaults";
import {
  InitialFailed,
  NextFailed,
  SimilarityWarning,
} from "./result-skeleton/failures";
import SearchResultItem from "./result-item";

function ResultSection({
  isLoading,
  isFailed,
  onRefetch,
  children,
}: {
  isLoading: boolean;
  isFailed: boolean;
  onRefetch: () => void;
  children?: React.ReactNode;
}) {
  if (isLoading) return <InitialLoading />;
  if (isFailed) return <InitialFailed onRefetch={onRefetch} />;

  return (
    <div className="flex flex-col gap-6 bg-light-surfaceBright/15 px-6 pt-6 dark:bg-dark-surfaceBright/15">
      {children}
    </div>
  );
}

function FooterSection({
  isEndOfPage,
  isFailed,
  hasSimilarityLimit,
  onRefetch,
}: {
  isEndOfPage: boolean;
  hasSimilarityLimit: boolean;
  isFailed: boolean;
  onRefetch: () => void;
}) {
  if (isFailed) return <NextFailed onRefetch={onRefetch} />;
  if (isEndOfPage)
    return hasSimilarityLimit ? <SimilarityWarning /> : <EndOfPage />;

  return <NextLoading />;
}

export default function MobileSearchResultContents() {
  const { log } = useAnalytics();
  const [checked, setChecked] = useState(false);

  const { query } = useSearchQueryInfo();
  const {
    data: { pages, fail },
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery(queryOptions.result(query));
  const setScrollLock = useScrollLock("SearchResult");

  // 쿼리 상태
  const isInitial = pages.length === 0;
  const isFailed = fail;

  const isInitialFailed = isInitial && isFailed;
  const isNextFailed = !isInitial && isFailed;

  const isInitialLoading = isInitial && isFetchingNextPage;

  // 페이지가 로드된 이후
  const hasSimilarityLimit = query.similarity_limit;
  const isEndOfPage = !hasNextPage;

  useEffect(() => {
    setScrollLock(isInitial);
  }, [isInitial, setScrollLock]);

  useEffect(() => {
    return () => setScrollLock(false);
  }, [setScrollLock]);

  /* User Event: 검색 결과 페이지에 진입합니다. (초기 진입) */
  useEffect(() => {
    if (checked) return;

    setChecked(true);
    log(Analytics.Event.SEARCH_RESULTS_VIEW, {
      query: query.query,
      filter_category: query.filter_category,
      filter_date_start: query.filter_start_date,
      filter_date_end: query.filter_end_date,
      filter_journal: query.filter_journal,
    });
  }, [query, log, checked]);

  /* User Event: 다음 검색 결과를 불러옵니다. */
  const onRequestNextResult = useCallback(async () => {
    const info = {
      query: query.query,
      filter_category: query.filter_category,
      filter_date_start: query.filter_start_date,
      filter_date_end: query.filter_end_date,
      filter_journal: query.filter_journal,
    };

    const { data } = await fetchNextPage();

    if (data?.fail) return;

    const size = data?.pageParams.length;

    if (!size || size === 0) return;

    log(Analytics.Event.RESULTS_NEXT_PAGE, {
      ...info,
      index: data?.pageParams[size - 1],
    });
  }, [fetchNextPage, query, log]);

  return (
    <>
      <ResultSection
        isLoading={isInitialLoading}
        isFailed={isInitialFailed}
        onRefetch={onRequestNextResult}
      >
        {pages.map(({ data, index }) => (
          <Fragment key={index}>
            {data.map(({ id, ...props }) => (
              <Fragment key={id}>
                <Spliter />
                <SearchResultItem id={id} {...props} />
              </Fragment>
            ))}
          </Fragment>
        ))}
      </ResultSection>

      {/* 스크롤 위치를 감지하여 다음 검색 결과 요청을 보냅니다. */}
      <ViewTrigger
        trigger={!isFetchingNextPage && !isFailed && hasNextPage}
        restore={!isFailed && !isFetchingNextPage}
        onTrigger={onRequestNextResult}
      />

      <FooterSection
        isEndOfPage={isEndOfPage}
        hasSimilarityLimit={hasSimilarityLimit}
        isFailed={!isFetchingNextPage && isNextFailed}
        onRefetch={onRequestNextResult}
      />
    </>
  );
}
