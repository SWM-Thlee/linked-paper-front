"use client";

import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import useSearchRequest from "@/features/search/hooks/query/use-search-request";
import SearchField, { SearchProps } from "@/ui/search-field";
import { Analytics } from "@/features/analytics/types";
import { searchFilterForAnalytics } from "@/features/analytics/utils/filter";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import useCompletion from "@/components/completion/hooks/use-completion";
import { Search } from "@/features/search/types";

export default function SearchForm({
  ui_color,
  ui_size,
  className,
  defaultPlaceholder,
}: SearchProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { log } = useAnalytics();
  const router = useSearchRequest();

  const [text, setText] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onTriggerText = useCallback((textToTrigger: string) => {
    setText(textToTrigger);

    if (ref.current) {
      const element = ref.current;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        element.scrollLeft = textToTrigger.length * 999;
      }, 100);
    }
  }, []);

  /* 검색 필드에 자동으로 쿼리가 입력되도록 설정합니다. */
  const { onTrigger } = useCompletion(onTriggerText);

  /* User Event: 검색 요청 */
  const onRequestQuery = useCallback(() => {
    if (!text) return;

    log(Analytics.Event.SEARCH_QUERY_MAIN, {
      query: text,
      ...searchFilterForAnalytics(router.defaultFilter),
    });

    router.request({ ...Search.Query.defaultInfo, query: text });
  }, [router, text, log]);

  const searchPlaceholder = useMemo(
    () =>
      defaultPlaceholder ||
      "describe what you’re looking for, not just keywords.",
    [defaultPlaceholder],
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

  /* 자동 완성 트리거 시 자동으로 검색 필드에 포커스를 줍니다. */
  useEffect(() => {
    onTrigger(() => ref.current?.focus());
  }, [onTrigger]);

  return (
    <SearchField
      ui_color={ui_color}
      ui_size={ui_size}
      className={className}
      ref={ref}
      value={text}
      onChange={onChangeText}
      onKeyUp={onKeyEnter}
      defaultPlaceholder={searchPlaceholder}
      onSubmitButton={onRequestQuery}
    />
  );
}
