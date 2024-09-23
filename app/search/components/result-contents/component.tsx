"use client";

import React, { useCallback } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import Button from "@/ui/button";
import { queryOptions } from "@/features/search/server/queries";
import useSearchQueryInfo from "@/features/search/hooks/query/use-search-query-info";
import SearchSimilarityWarning from "./similarity-warning";
import { SearchResultItem } from "../result-item";

export default function SearchResultContents() {
  const { query, stale } = useSearchQueryInfo();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(queryOptions.result(query, !stale));

  const requestNextPage = useCallback(() => fetchNextPage(), [fetchNextPage]);

  return (
    <>
      <div className="flex flex-col bg-light-surfaceBright/15 p-8 dark:bg-dark-surfaceBright/15">
        <div className="flex flex-col gap-8">
          {data.pages.map((chunk) => (
            <React.Fragment key={chunk.index}>
              {chunk.data.map((result) => (
                <React.Fragment key={result.id}>
                  <SearchResultItem {...result} />
                  <hr className="border-light-outlineVariant dark:border-dark-outlineVariant" />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
          {hasNextPage && (
            <Button onClick={requestNextPage}>Fetch Next Page</Button>
          )}
          {isFetchingNextPage && <div>Loading</div>}
        </div>
      </div>
      <SearchSimilarityWarning />
    </>
  );
}
