import { Suspense } from "react";

import ScrollToTop from "@/components/scroll-to-top";
import PageContainer from "@/components/page-container";
import ScrollLockOnce from "@/components/page-only/scroll-lock-once";
import QueryResolver from "@/features/search/components/query-resolver";
import Header from "./components/result-header";
import Contents from "./components/result-contents";
import {
  EndlessFooter,
  InitialLoading,
} from "./components/result-skeleton/defaults";

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
        </QueryResolver>
      </Suspense>
    </PageContainer>
  );
}
