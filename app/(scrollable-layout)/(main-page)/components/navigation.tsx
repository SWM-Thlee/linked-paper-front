"use client";

import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from "react";

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

  /* 검색을 요청합니다. (검색 페이지로 이동합니다.) */
  const request = useCallback(() => {
    if (!queryText) return;
    router.request({ ...defaultQueryValue, query: queryText });
  }, [router, queryText]);

  const searchPlaceholder = useMemo(
    () => "describe what you’re looking for, not just keywords.",
    [],
  );

  /* Event Handlers */
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQueryText(event.target.value);
  }, []);

  const onKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (event.key === "Enter") request();
    },
    [request],
  );

  return (
    <div className="flex flex-col gap-8">
      <SearchField
        ui_size="medium"
        value={queryText}
        autoFocus
        onChange={onChange}
        onKeyUp={onKeyUp}
        defaultPlaceholder={searchPlaceholder}
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