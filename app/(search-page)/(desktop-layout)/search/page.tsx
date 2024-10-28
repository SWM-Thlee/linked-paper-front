import { Suspense } from "react";
import { Metadata } from "next";

import { Search } from "@/features/search/types";
import { createSearchMetadata } from "@/features/seo/metadata/search";
import ScrollToTop from "@/components/scroll-to-top";
import PageContainer from "@/components/layout/page-container";
import ScrollLockOnce from "@/components/layout/scroll-lock-once";
import QueryResolver from "@/features/search/components/query-resolver";
import Header from "../../components/result-header";
import Contents from "../../components/result-contents";
import {
  EndlessFooter,
  InitialLoading,
} from "../../components/result-skeleton/defaults";
import SearchToolbar from "../../components/search-toolbar";

/* 특정 검색 페이지에 대한 메타데이터를 생성합니다. */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Search.Query.Params;
}): Promise<Metadata> {
  return createSearchMetadata({ searchParams });
}

// TODO: Fallback Component 추가하기
export default function Page() {
  return (
    <PageContainer>
      <Suspense>
        <QueryResolver>
          <Header />
          <Suspense
            fallback={
              <ScrollLockOnce>
                <InitialLoading />
                <EndlessFooter />
              </ScrollLockOnce>
            }
          >
            <Contents />
          </Suspense>
          <ScrollToTop />
          <SearchToolbar />
        </QueryResolver>
      </Suspense>
    </PageContainer>
  );
}
