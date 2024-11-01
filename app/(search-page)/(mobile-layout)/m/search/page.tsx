import { Suspense } from "react";
import { Metadata } from "next";

import { Search } from "@/features/search/types";
import { createSearchMetadata } from "@/features/seo/metadata/search";
import ScrollToTop from "@/components/scroll-to-top";
import ScrollLockOnce from "@/components/layout/scroll-lock-once";
import QueryResolver from "@/features/search/components/query-resolver";
import MobilePageContainer from "@/components/layout/mobile-page-container";
import MobileSearchResultHeader from "@/app/(search-page)/components/mobile/result-header";
import MobileSearchResultContents from "@/app/(search-page)/components/mobile/result-contents";
import {
  EndlessFooter,
  InitialLoading,
} from "@/app/(search-page)/components/mobile/result-skeleton/defaults";

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
    <MobilePageContainer>
      <Suspense>
        <QueryResolver>
          <MobileSearchResultHeader />
          <Suspense
            fallback={
              <ScrollLockOnce>
                <InitialLoading />
                <EndlessFooter />
              </ScrollLockOnce>
            }
          >
            <MobileSearchResultContents />
          </Suspense>
          <ScrollToTop
            ui_size="small"
            ui_color="secondary"
            ui_position="bottom"
          />
        </QueryResolver>
      </Suspense>
    </MobilePageContainer>
  );
}
