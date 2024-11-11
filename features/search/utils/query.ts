import { Search } from "../types";
import { createQuerySearchFilter } from "./filter/creator";

export const DEFAULT_FILTER_NAME = "Search Query";

export function toQueryString(data: Search.Query.Info) {
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

export function filterToQuery({
  journal,
  category,
  date,
}: Search.Filter.Scheme["attributes"]): Search.Query.Filter {
  return {
    filter_journal: journal.length > 0 ? journal : undefined,
    filter_category: category.length > 0 ? category : undefined,
    filter_start_date: date.min,
    filter_end_date: date.max,
  };
}

/**
 * Search Query를 기반으로 Filter 정보를 생성합니다.
 */
export function queryToFilter({
  filter_start_date: min,
  filter_end_date: max,
  filter_category: category,
  filter_journal: journal,
  id,
}: Search.Query.Filter & {
  id: string;
}): Search.Filter.Query {
  return {
    ...createQuerySearchFilter({
      date: { min: min ?? undefined, max: max ?? undefined },
      category: category ?? undefined,
      journal: journal ?? undefined,
    }),
    id,
  };
}
