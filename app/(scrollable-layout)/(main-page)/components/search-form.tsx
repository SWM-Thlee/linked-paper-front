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
import { Analytics } from "@/features/analytics/types";
import { searchFilterForAnalytics } from "@/features/analytics/utils/filter";
import useAnalytics from "@/features/analytics/hooks/use-analytics";

export default function SearchForm() {
  const { log } = useAnalytics();
  const router = useSearchRequest();
  const [text, setText] = useState("");

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
    <>
      <SearchField
        value={text}
        onChange={onChangeText}
        onKeyUp={onKeyEnter}
        defaultPlaceholder={searchPlaceholder}
      />
      <div className="flex items-center justify-center gap-4">
        <LabelButton ui_size="large" onClick={onRequestQuery}>
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
