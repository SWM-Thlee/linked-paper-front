import { produce } from "immer";

import { FilterData } from "@/features/filter/types/filter";
import { RawSearchQueryInfo } from "../../types/query";
import createSearchFilter from "./initial";
import { Search } from "../../types";

export const TAG_SEARCH_QUERY = "SEARCH_QUERY";
export const DEFAULT_FILTER_NAME = "Search Query";
export interface SearchFilterQuery {}

export type SearchQueryFilterInitialData = Pick<
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

export function convertFilterToQuery({
  attributes: { journal, category, date },
}: FilterData<Search.Type>): SearchQueryFilterInitialData {
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

/**
 * Search Query를 기반으로 Filter 정보를 생성합니다.
 */
export function createSearchQueryFilter({
  filter_start_date,
  filter_end_date,
  filter_category,
  filter_journal,
}: SearchQueryFilterInitialData) {
  const filter = createSearchFilter({
    name: DEFAULT_FILTER_NAME,
    tags: { [TAG_SEARCH_QUERY]: {} },
  });

  return produce(filter, (draft) => {
    // 1. Category
    draft.attributes.category = produce(
      draft.attributes.category,
      (categoryDraft) => {
        if (!categoryDraft.value) categoryDraft.value = {};

        if (filter_category) {
          filter_category.forEach((categoryID) => {
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

        if (filter_journal) {
          filter_journal.forEach((journal) => {
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

      if (filter_start_date && isDate(filter_start_date)) {
        dateDraft.value!.min = filter_start_date;
      }

      if (filter_end_date && isDate(filter_end_date)) {
        dateDraft.value!.max = filter_end_date;
      }
    });
  });
}

/**
 *  특정 Search Filter의 Query 마크를 지웁니다. 이는 Search Query를 다른 용도로 이용할 때 사용됩니다.
 */
export function unmarkSearchQueryFilter(data: FilterData<Search.Type>) {
  if (!data.tags[TAG_SEARCH_QUERY])
    throw new Error(
      "Error from UnmarkSearchQueryFilter: Target filter is not marked",
    );

  return produce(data, (draft) => {
    delete draft.tags[TAG_SEARCH_QUERY];
  });
}
