"use client";

import { useCallback, useState } from "react";

import { NavigationModule } from "@/ui/navigation";
import SearchField from "@/ui/search-field";
import SearchIcon from "@/ui/icons/search";
import FieldContainer from "@/ui/container/field-container";
import useSearchRequest from "@/features/search/hooks/query/use-search-request";
import { defaultQueryValue } from "@/features/search/stores/query";
import DefaultFilterInfo from "./default-filter-info";

function Content() {
  const [queryText, setQueryText] = useState("");
  const router = useSearchRequest();

  // 검색을 요청합니다. (검색 페이지로 이동합니다.)
  const requestSearch = useCallback(() => {
    if (!queryText) return;
    router.request({ ...defaultQueryValue, query: queryText });
  }, [router, queryText]);

  return (
    <div className="flex flex-col gap-8">
      <SearchField
        ui_size="medium"
        ui_color="tertiary"
        value={queryText}
        autoFocus
        onChange={(e) => setQueryText(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            requestSearch();
          }
        }}
      />
      <FieldContainer title="DEFAULT OPTIONS">
        <DefaultFilterInfo />
      </FieldContainer>
    </div>
  );
}

export const SearchNavigation: NavigationModule = {
  type: "dropdown",
  key: "search",
  content: <Content />,
  title: (
    <div className="flex items-center gap-2">
      <SearchIcon ui_size="small" />
      <div className="text-label-large">Search</div>
    </div>
  ),
};
