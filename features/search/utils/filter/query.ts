import { produce } from "immer";

import { FilterData, FilterDataID } from "@/features/filter/types/filter";
import { toQuery } from "@/features/filter/utils/converter/query";
import createSearchFilter from "./initial";
import { Search, SearchQuery } from "../../types";

export const DEFAULT_FILTER_NAME = "Search Query";

// yyyy-mm-dd 규격인지 확인합니다.
function isDate(data: string) {
  return /\d{4}-\d{2}-\d{2}/.test(data);
}

function isNotEmpty<T extends object>(obj?: T): obj is T {
  return obj !== undefined && Object.keys(obj).length > 0;
}

export function convertToQueryString(data: SearchQuery.Info) {
  return Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) =>
      Array.isArray(value)
        ? value.map((elem) => `${key}=${elem}`).join("&")
        : `${key}=${value}`,
    )
    .join("&");
}

export function convertSearchFilterToQuery({
  attributes: { journal, category, date },
}: FilterData<Search.Type>): SearchQuery.FilterInfo {
  return {
    filter_journal: isNotEmpty(journal.value)
      ? Object.values(journal.value).map(
          ({ itemValue: { nameOfJournal } }) => nameOfJournal,
        )
      : undefined,
    filter_category: isNotEmpty(category.value)
      ? Object.values(category.value).map(
          ({ itemValue: { categoryID } }) => categoryID,
        )
      : undefined,
    filter_start_date: date.value?.min,
    filter_end_date: date.value?.max,
  };
}

export type ConvertingSearchQueryToFilterProps = SearchQuery.FilterInfo & {
  queryDataID: FilterDataID<Search.Type>;
};

/**
 * Search Query를 기반으로 Filter 정보를 생성합니다.
 */
export function convertSearchQueryToFilter({
  filter_start_date: _startDate,
  filter_end_date: _endDate,
  filter_category: _category,
  filter_journal: _journal,
  queryDataID,
}: ConvertingSearchQueryToFilterProps) {
  // Create Raw Search Query Filter
  const filter = toQuery<Search.Type>({
    data: createSearchFilter({
      name: DEFAULT_FILTER_NAME,
      tags: {},
    }),
    queryDataID,
  });

  return produce(filter, (draft) => {
    // 1. Category
    draft.attributes.category = Search.Category(_category ?? []);

    // 2. Journal
    draft.attributes.journal = Search.Journal(_journal ?? []);

    // 3. Date
    draft.attributes.date = produce(draft.attributes.date, (dateDraft) => {
      if (!dateDraft.value) dateDraft.value = {};

      if (_startDate && isDate(_startDate)) {
        dateDraft.value!.min = _startDate;
      }

      if (_endDate && isDate(_endDate)) {
        dateDraft.value!.max = _endDate;
      }
    });
  });
}
