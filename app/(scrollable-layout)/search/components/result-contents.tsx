"use client";

import { Fragment, useEffect } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import ViewTrigger from "@/components/view-trigger";
import { queryOptions } from "@/features/search/server/queries";
import useSearchQueryInfo from "@/features/search/hooks/query/use-search-query-info";
import useScrollLock from "@/hooks/use-scroll-lock";
import { SearchResultItem } from "./result-item";
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
    <div className="flex flex-col gap-8 bg-light-surfaceBright/15 px-8 pt-8 dark:bg-dark-surfaceBright/15">
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

// TODO: Z-Index 수정
// TODO: 동일한 검색 결과가 존재할 시 Duplicate 처리를 어떻게 할까?
export default function SearchResultContents() {
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

  return (
    <>
      <ResultSection
        isLoading={isInitialLoading}
        isFailed={isInitialFailed}
        onRefetch={fetchNextPage}
      >
        {pages.map(({ data: { data, index } }) => (
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
        onTrigger={fetchNextPage}
      />

      <FooterSection
        isEndOfPage={isEndOfPage}
        hasSimilarityLimit={hasSimilarityLimit}
        isFailed={!isFetchingNextPage && isNextFailed}
        onRefetch={fetchNextPage}
      />
    </>
  );
}
