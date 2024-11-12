"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Search } from "@/features/search/types";
import useSearchUpdate from "@/features/search/hooks/query/use-search-update";
import useSearchQueryInfo from "@/features/search/hooks/query/use-search-query-info";
import useQuerySearchFilter from "@/features/search/hooks/filter/use-query-search-filter";
import CategoryChip from "@/features/search/components/chip/category";
import JournalChip from "@/features/search/components/chip/journal";
import DateChip from "@/features/search/components/chip/date";
import SearchField from "@/ui/search-field";
import LabelButton from "@/ui/label-button";
import FilterIcon from "@/ui/icons/filter";
import Select, { SelectComponentItem } from "@/ui/select";
import { Analytics } from "@/features/analytics/types";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import { searchFilterForAnalytics } from "@/features/analytics/utils/filter";
import { queryToFilter } from "@/features/search/utils/query";
import FilterSettings from "./filters/filter-settings";

function Attributes({
  attributes: { category, journal, date },
}: {
  attributes: Search.Filter.Attributes;
}) {
  const hasCategory = category.length > 0;
  const hasJournal = journal.length > 0;
  const hasDate = date.min || date.max;

  return (
    <div className="flex flex-wrap items-center gap-4">
      {hasCategory && <CategoryChip value={category} />}
      {hasJournal && <JournalChip value={journal} />}
      {hasDate && <DateChip value={date} />}
    </div>
  );
}

function FilterChips() {
  const { filter } = useQuerySearchFilter();
  const { query } = useSearchQueryInfo();

  return (
    <Attributes
      attributes={
        filter
          ? filter.attributes
          : // Server Render 시, Query에서 Filter를 불러옵니다.
            queryToFilter({ ...query, id: "" }).attributes
      }
    />
  );
}

function Sorting({
  status,
  onStatusChange,
}: {
  status: Search.Query.Sorting;
  onStatusChange: (newStatus: Search.Query.Sorting) => void;
}) {
  const items = useMemo<SelectComponentItem[]>(
    () =>
      Object.values(Search.Query.Sorting.options).map((sorting) => ({
        id: sorting,
        value: sorting,
      })),
    [],
  );

  return (
    <Select
      ui_variant="bordered"
      ui_size="small"
      ui_color="tertiary"
      value={status}
      onValueChange={onStatusChange}
      items={items}
    />
  );
}

export default function SearchResultHeader() {
  const { log } = useAnalytics();
  const { update } = useSearchUpdate();
  const { requiredQuery, stale } = useSearchQueryInfo();
  const { filter } = useQuerySearchFilter();
  const [text, setText] = useState(requiredQuery.query);

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

  return (
    <div className="flex flex-col gap-6 rounded-t-6 bg-light-surfaceBright/15 p-8 dark:bg-dark-surfaceBright/15">
      <FilterChips />
      <SearchField
        value={text}
        onKeyUp={onUpdateQuery}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="grid grid-cols-[1fr_auto]">
        <div className="flex items-center gap-2">
          <FilterSettings>
            <LabelButton ui_color="secondary" ui_variant="bordered">
              <FilterIcon ui_size="small" /> <span>Configure Filter...</span>
            </LabelButton>
          </FilterSettings>
        </div>
        <div className="flex flex-col justify-end">
          <Sorting
            status={requiredQuery.sorting}
            onStatusChange={onModifySorting}
          />
        </div>
      </div>
    </div>
  );
}
