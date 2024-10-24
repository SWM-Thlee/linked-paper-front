import { Suspense } from "react";

import Completion from "@/components/completion/component";
import PageContainer from "@/components/layout/page-container";
import AnnouncementProvider from "@/features/announcement/components/announcement-provider";
import Suggestions from "@/features/suggestion/components/suggestions";
import SuggestionsSkeleton from "@/features/suggestion/components/suggestions-skeleton";
import DefaultFilterInfo from "./components/default-filter-info";
import SearchForm from "./components/search-form";

export default function Home() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-32 rounded-6 bg-light-surfaceBright/15 p-8 dark:bg-dark-surfaceBright/15">
        <AnnouncementProvider />
        <div className="flex flex-col gap-8">
          <Completion>
            <DefaultFilterInfo />
            <SearchForm />
            <Suspense fallback={<SuggestionsSkeleton />}>
              <Suggestions />
            </Suspense>
          </Completion>
        </div>
      </div>
    </PageContainer>
  );
}
