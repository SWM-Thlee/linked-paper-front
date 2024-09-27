"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import Button from "@/ui/button";
import SearchField from "@/ui/search-field";
import { defaultQueryValue } from "@/features/search/stores/query";
import useSearchRequest from "@/features/search/hooks/query/use-search-request";

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
        <Button ui_size="large" onClick={requestSearch}>
          Search
        </Button>
        <Button
          ui_size="large"
          ui_color="secondary"
          onClick={() => toast("Not Implemented")}
        >
          Send Feedback
        </Button>
      </div>
    </>
  );
}
