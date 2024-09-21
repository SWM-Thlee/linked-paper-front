import React from "react";

import SearchQueryResolver from "@/features/search/components/query-resolver";
import SearchResultHeader from "./components/result-header";
import {
  SearchResultContents,
  SearchResultSkeleton,
} from "./components/result-contents";
import { ScrollToTop } from "./components/scroll-to-top";

export default function Page() {
  return (
    <SearchQueryResolver>
      <main className="flex min-h-[1440px] w-[1024px] flex-col">
        <SearchResultHeader />
        <React.Suspense fallback={<SearchResultSkeleton />}>
          <SearchResultContents />
        </React.Suspense>
        <ScrollToTop />
      </main>
    </SearchQueryResolver>
  );
}
