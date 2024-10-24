import Completion from "@/components/completion/component";
import PageContainer from "@/components/layout/page-container";
import AnnouncementProvider from "@/features/announcement/components/announcement-provider";
import DefaultFilterInfo from "./components/default-filter-info";
import SearchForm from "./components/search-form";
import Suggestions from "./components/suggestions";

export default function Home() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-32 rounded-6 bg-light-surfaceBright/15 p-8 dark:bg-dark-surfaceBright/15">
        <AnnouncementProvider />
        <div className="flex flex-col gap-8">
          <Completion>
            <SearchForm />
            <DefaultFilterInfo />
            <Suggestions />
          </Completion>
        </div>
      </div>
    </PageContainer>
  );
}
