"use client";

import React from "react";
import { SearchResultHeader } from "@/features/search/components/result-header";
import {
  SearchResultContents,
  SearchResultSkeleton,
} from "@/features/search/components/result-contents";

export default function Page() {
  return (
    <main className="flex min-h-[1440px] w-[1024px] flex-col">
      <SearchResultHeader />
      <React.Suspense fallback={<SearchResultSkeleton />}>
        <SearchResultContents />
      </React.Suspense>
    </main>
  );
}
