import PageContainer from "@/components/page-container";
import AnnouncementProvider from "@/features/announcement/components/announcement-provider";
import DefaultFilterInfo from "./components/default-filter-info";
import SearchFields from "./components/search-fields";

export default function Home() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-8 rounded-6 bg-light-surfaceBright/15 p-8 dark:bg-dark-surfaceBright/15">
        <AnnouncementProvider />
        <div className="mt-16 flex flex-col gap-8">
          <DefaultFilterInfo />
          <SearchFields />
        </div>
      </div>
    </PageContainer>
  );
}
