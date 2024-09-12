import { produce } from "immer";

import { FilterData, FilterDataID } from "@/features/filter/types/filter";
import { toQuery } from "@/features/filter/utils/converter/query";
import { RawSearchQueryInfo } from "../../types/query";
import createSearchFilter from "./initial";
import { Search } from "../../types";

export const DEFAULT_FILTER_NAME = "Search Query";

export type SearchQueryFilterData = Pick<
  RawSearchQueryInfo,
  "filter_category" | "filter_end_date" | "filter_start_date" | "filter_journal"
>;

// yyyy-mm-dd 규격인지 확인합니다.
function isDate(data: string) {
  return /\d{4}-\d{2}-\d{2}/.test(data);
}

function isNotEmpty<T extends object>(obj?: T): obj is T {
  return obj !== undefined && Object.keys(obj).length > 0;
}

export function fromSearchFilterToQuery({
  attributes: { journal, category, date },
}: FilterData<Search.Type>): SearchQueryFilterData {
  return {
    filter_journal: isNotEmpty(journal.value)
      ? Object.values(journal.value).map(({ info: [id] }) => id)
      : undefined,
    filter_category: isNotEmpty(category.value)
      ? Object.values(category.value).map(({ info: [id] }) => id)
      : undefined,
    filter_start_date: date.value?.min,
    filter_end_date: date.value?.max,
  };
}

export type ConvertingSearchQueryToFilterProps = SearchQueryFilterData & {
  queryDataID: FilterDataID<Search.Type>;
};

/**
 * Search Query를 기반으로 Filter 정보를 생성합니다.
 */
export function fromSearchQueryToFilter({
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
    draft.attributes.category = produce(
      draft.attributes.category,
      (categoryDraft) => {
        if (!categoryDraft.value) categoryDraft.value = {};

        if (_category) {
          _category.forEach((categoryID) => {
            categoryDraft.value![categoryID] = {
              itemID: categoryID,
              info: [categoryID],
            };
          });
        }
      },
    );

    // 2. Journal
    draft.attributes.journal = produce(
      draft.attributes.journal,
      (journalDraft) => {
        if (!journalDraft.value) journalDraft.value = {};

        if (_journal) {
          _journal.forEach((journal) => {
            journalDraft.value![journal] = {
              itemID: journal,
              info: [journal],
            };
          });
        }
      },
    );

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
