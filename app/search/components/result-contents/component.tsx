"use client";

import React from "react";

import useSearchQuery from "@/features/search/hooks/query/use-search-query";
import SearchSimilarityWarning from "./similarity-warning";
import { SearchResultItem } from "../result-item";

export default function SearchResultContents() {
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
