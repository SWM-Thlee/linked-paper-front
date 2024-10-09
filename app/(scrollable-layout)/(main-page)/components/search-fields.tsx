"use client";

import { useCallback, useState } from "react";
import Link from "next/link";

import SearchField from "@/ui/search-field";
import { defaultQueryValue } from "@/features/search/stores/query";
import useSearchRequest from "@/features/search/hooks/query/use-search-request";
import LabelButton from "@/ui/label-button";
import SearchIcon from "@/ui/icons/search";
import FeedbackIcon from "@/ui/icons/feedback";
import { generateMailFeedbackRequest } from "@/features/feedback/utils/mail";

export default function SearchFields() {
  const [queryText, setQueryText] = useState("");
  const router = useSearchRequest();

  // 검색을 요청합니다. (검색 페이지로 이동합니다.)
  const requestSearch = useCallback(() => {
    if (!queryText) return;
    router.request({ ...defaultQueryValue, query: queryText });
  }, [router, queryText]);

  return (
    <>
      <SearchField
        value={queryText}
        autoFocus
        onChange={(e) => setQueryText(e.target.value)}
        onKeyUp={(e) => {
          e.preventDefault();
          if (e.key === "Enter") {
            requestSearch();
          }
        }}
      />
      <div className="flex items-center justify-center gap-4">
        <LabelButton ui_size="large" onClick={requestSearch}>
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
