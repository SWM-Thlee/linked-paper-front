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

export default function Page() {
  return (
    <QueryResolver>
      <PageContainer>
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
      </PageContainer>
    </QueryResolver>
  );
}
