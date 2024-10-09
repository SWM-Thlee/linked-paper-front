import { convertDateToString, convertStringToDate } from "@/utils/date";
import { RawSearchQueryInfo, SearchSorting } from "../types/query";

function convertToInt(attr: string | null) {
  const attrToNumber = parseInt(attr ?? "", 10);
  return Number.isNaN(attrToNumber) ? undefined : attrToNumber;
}

function convertToBoolean(attr: string | null) {
  if (attr?.toLowerCase() === "true" || attr?.toLowerCase() === "false")
    return Boolean(attr);

  return undefined;
}

export const DEFAULT_SEARCH_QUERY: {
  [key in keyof RawSearchQueryInfo]: RawSearchQueryInfo[key];
} = {
  index: 0,
  sorting: SearchSorting.SIMILARITY,
  size: 20,
  similarity_limit: false,
};

export const SearchQueryConverter: {
  [key in keyof RawSearchQueryInfo]-?: (
    value:
      | (NonNullable<RawSearchQueryInfo[key]> extends (infer U)[]
          ? U[]
          : string)
      | null,
  ) => RawSearchQueryInfo[key];
} = {
  // 1. Passes Directly
  query(query) {
    return query ?? undefined;
  },

  // 2. If Invalid: Converts to Default Value
  index(index) {
    return convertToInt(index) ?? DEFAULT_SEARCH_QUERY.index;
  },
  size(size) {
    return convertToInt(size) ?? DEFAULT_SEARCH_QUERY.size;
  },
  sorting(sorting) {
    return (
      (sorting &&
        SearchSorting[sorting.toUpperCase() as Uppercase<SearchSorting>]) ??
      DEFAULT_SEARCH_QUERY.sorting
    );
  },
  similarity_limit(similarity_limit) {
    return (
      convertToBoolean(similarity_limit) ??
      DEFAULT_SEARCH_QUERY.similarity_limit
    );
  },
  filter_start_date(filter_start_date) {
    const startDate = convertDateToString(
      convertStringToDate(filter_start_date ?? undefined),
    );

    return startDate ?? DEFAULT_SEARCH_QUERY.filter_start_date;
  },
  filter_end_date(filter_end_date) {
    const endDate = convertDateToString(
      convertStringToDate(filter_end_date ?? undefined),
    );

    return endDate ?? DEFAULT_SEARCH_QUERY.filter_end_date;
  },

  // 3. If Invalid: Passes Directly
  filter_category(filter_category) {
    return filter_category ?? undefined;
  },

  filter_journal(filter_journal) {
    return filter_journal ?? undefined;
  },
};
