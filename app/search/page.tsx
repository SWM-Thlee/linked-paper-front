import SearchQueryFilterProvider from "@/features/search/components/query-filter-provider/component";
import {
  SearchResultContents,
  SearchResultSkeleton,
} from "@/features/search/components/result-contents";
import { SearchResultHeader } from "@/features/search/components/result-header";
import React from "react";

export default function Page() {
  return (
    <SearchQueryFilterProvider>
      <main className="flex min-h-[1440px] w-[1024px] flex-col">
        <SearchResultHeader />
        <React.Suspense fallback={<SearchResultSkeleton />}>
          <SearchResultContents />
        </React.Suspense>
      </main>
    </SearchQueryFilterProvider>
  );
}
