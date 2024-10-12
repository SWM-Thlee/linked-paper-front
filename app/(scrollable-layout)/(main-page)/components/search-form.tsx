"use client";

import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import Link from "next/link";

import useSearchRequest from "@/features/search/hooks/query/use-search-request";
import { generateMailFeedbackRequest } from "@/features/feedback/utils/mail";
import { defaultQueryValue } from "@/features/search/stores/query";
import SearchField from "@/ui/search-field";
import LabelButton from "@/ui/label-button";
import SearchIcon from "@/ui/icons/search";
import FeedbackIcon from "@/ui/icons/feedback";

export default function SearchForm() {
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
    <>
      <SearchField
        value={queryText}
        onChange={onChange}
        onKeyUp={onKeyUp}
        defaultPlaceholder={searchPlaceholder}
      />
      <div className="flex items-center justify-center gap-4">
        <LabelButton ui_size="large" onClick={request}>
          <SearchIcon ui_size="small" />
          Search
        </LabelButton>
        <Link href={generateMailFeedbackRequest()}>
          <LabelButton ui_size="large" ui_color="secondary">
            <FeedbackIcon ui_size="small" />
            Send Feedback
          </LabelButton>
        </Link>
      </div>
    </>
  );
}