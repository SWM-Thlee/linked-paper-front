import { produce } from "immer";

import { toQuery } from "@/features/filter/utils/converter/query";
import createSearchFilter from "./initial";
import { Search } from "../../types";

export const DEFAULT_FILTER_NAME = "Search Query";

// yyyy-mm-dd 규격인지 확인합니다.
function isDate(data: string) {
  return /\d{4}-\d{2}-\d{2}/.test(data);
}

function isNotEmpty<T extends object>(obj?: T): obj is T {
  return obj !== undefined && Object.keys(obj).length > 0;
}

export function convertToQueryString(data: Search.Query.Info) {
  // (실질적) 빈 값들을 제외합니다.
  const entries = Object.entries(data).filter(([, value]) => {
    const isEmptyValue = value === undefined || value === null;
    const isEmptyArray =
      !isEmptyValue && Array.isArray(value) && value.length === 0;

    return !isEmptyValue && !isEmptyArray;
  });

  return entries
    .map(([key, value]) =>
      Array.isArray(value)
        ? value.map((elem) => `${key}=${elem}`).join("&")
        : `${key}=${value}`,
    )
    .join("&");
}

export function convertSearchFilterToQuery({
  attributes: { journal, category, date },
}: Search.Filter.Data): Search.Query.FilterInfo {
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

export type ConvertingSearchQueryToFilterProps = Search.Query.FilterInfo & {
  queryDataID: Search.Filter.DataID;
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
  const filter = toQuery<Search.Filter.Type>({
    data: createSearchFilter({
      name: DEFAULT_FILTER_NAME,
      tags: {},
    }),
    queryDataID,
  });

  return produce(filter, (draft) => {
    // 1. Category
    draft.attributes.category = Search.Filter.Category(_category ?? []);

    // 2. Journal
    draft.attributes.journal = Search.Filter.Journal(_journal ?? []);

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
