"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Search } from "@/features/search/types";
import useSearchUpdate from "@/features/search/hooks/query/use-search-update";
import useSearchQueryInfo from "@/features/search/hooks/query/use-search-query-info";
import SearchField from "@/ui/search-field";
import Select, { SelectComponentItem } from "@/ui/select";
import { Analytics } from "@/features/analytics/types";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import { searchFilterForAnalytics } from "@/features/analytics/utils/filter";
import useQuerySearchFilter from "@/features/search/hooks/filter/use-query-search-filter";

export default function MobileSearchResultHeader() {
  const { log } = useAnalytics();
  const { update } = useSearchUpdate();
  const { requiredQuery, stale } = useSearchQueryInfo();
  const { filter } = useQuerySearchFilter();
  const [text, setText] = useState("");

  useEffect(() => {
    if (!stale) setText(requiredQuery.query);
  }, [stale, requiredQuery.query]);

  /* User Event: 정렬 옵션 */
  const onModifySorting = useCallback(
    (sorting: Search.Query.Sorting) => {
      log(Analytics.Event.CHANGE_FILTER_SORTING, { sorting });
      update({ ...requiredQuery, sorting });
    },
    [update, requiredQuery, log],
  );

  /* User Event: 검색어를 바꾼 뒤 검색 재요청 */
  const onUpdateQuery = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!(text && event.key === "Enter")) return;
      event.preventDefault();

      log(Analytics.Event.SEARCH_QUERY_RESULT, {
        query: text,
        ...(filter ? searchFilterForAnalytics(filter) : {}),
      });
      update({ ...requiredQuery, query: text });
    },
    [update, requiredQuery, log, filter, text],
  );

  const items = useMemo<SelectComponentItem[]>(
    () =>
      Object.values(Search.Query.Sorting.options).map((sorting) => ({
        id: sorting,
        value: sorting,
      })),
    [],
  );

  return (
    <div className="flex flex-col gap-6 rounded-t-4 bg-light-surfaceBright/15 p-6 dark:bg-dark-surfaceBright/15">
      <SearchField
        value={text}
        ui_size="medium"
        onKeyUp={onUpdateQuery}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-end">
        <Select
          ui_variant="bordered"
          ui_size="small"
          ui_color="tertiary"
          value={requiredQuery.sorting}
          onValueChange={onModifySorting}
          items={items}
        />
      </div>
    </div>
  );
}
