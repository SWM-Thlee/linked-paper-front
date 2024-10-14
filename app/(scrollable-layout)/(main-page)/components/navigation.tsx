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
  const router = useSearchRequest();
  const [text, setText] = useState("");

  /* User Event: 검색 요청 */
  const onRequestQuery = useCallback(() => {
    if (!text) return;

    router.request({ ...defaultQueryValue, query: text });
  }, [router, text]);

  const searchPlaceholder = useMemo(
    () => "describe what you’re looking for, not just keywords.",
    [],
  );

  const onChangeText = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }, []);

  const onKeyEnter = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;

      event.preventDefault();
      onRequestQuery();
    },
    [onRequestQuery],
  );

  return (
    <div className="flex flex-col gap-8">
      <SearchField
        ui_size="medium"
        value={text}
        autoFocus
        onChange={onChangeText}
        onKeyUp={onKeyEnter}
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
