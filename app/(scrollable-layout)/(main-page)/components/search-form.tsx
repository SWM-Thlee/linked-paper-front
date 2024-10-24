"use client";

import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from "react";

import useSearchRequest from "@/features/search/hooks/query/use-search-request";
import { defaultQueryValue } from "@/features/search/stores/query";
import SearchField from "@/ui/search-field";
import { Analytics } from "@/features/analytics/types";
import { searchFilterForAnalytics } from "@/features/analytics/utils/filter";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import useCompletion from "@/components/completion/hooks/use-completion";

export default function SearchForm() {
  const { log } = useAnalytics();
  const router = useSearchRequest();
  const [text, setText] = useState("");

  /* 검색 필드에 자동으로 쿼리가 입력되도록 설정합니다. */
  useCompletion(setText);

  /* User Event: 검색 요청 */
  const onRequestQuery = useCallback(() => {
    if (!text) return;

    log(Analytics.Event.SEARCH_QUERY_MAIN, {
      query: text,
      ...searchFilterForAnalytics(router.defaultFilter),
    });

    router.request({ ...defaultQueryValue, query: text });
  }, [router, text, log]);

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
    <SearchField
      value={text}
      onChange={onChangeText}
      onKeyUp={onKeyEnter}
      defaultPlaceholder={searchPlaceholder}
      onSubmitButton={onRequestQuery}
    />
  );
}
