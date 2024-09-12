"use client";

import React from "react";
import { SearchResultItem } from "@/features/search/components/result-item";
import useSearchQuery from "@/features/search/hooks/use-search-query";
import SearchSimilarityWarning from "./similarity-warning";

export default function SearchResults() {
  const { data } = useSearchQuery();

  return (
    <>
      <div className="flex flex-col bg-light-surfaceBright/15 p-8 dark:bg-dark-surfaceBright/15">
        <div className="flex flex-col gap-8">
          {data.map((result) => (
            <React.Fragment key={result.id}>
              <SearchResultItem {...result} />
              <hr className="border-light-outlineVariant dark:border-dark-outlineVariant" />
            </React.Fragment>
          ))}
        </div>
      </div>
      <SearchSimilarityWarning />
    </>
  );
}
