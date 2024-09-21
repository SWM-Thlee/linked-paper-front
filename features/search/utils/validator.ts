import { convertDateToString, convertStringToDate } from "@/utils/date";
import { SearchQuery } from "../types";

const INVALID_QUERY = Symbol.for("INVALID_SEARCH_QUERY");

/**
 * Search Query에 필수적으로 들어가는 정보 중, 아래의 옵션은 기본값이 존재하므로 **생략**이 가능합니다.
 */
export const defaultInfo = {
  index: 0,
  sorting: SearchQuery.Sorting.SIMILARITY,
  size: 20,
  similarity_limit: true,
} satisfies { [key in keyof SearchQuery.Info]?: SearchQuery.Info[key] };

export const converter: {
  [key in keyof SearchQuery.RawInfo]: (
    value: SearchQuery.RawInfo[key],
  ) => SearchQuery.Info[key] | typeof INVALID_QUERY;
} = {
  // Required
  query(query) {
    const queryExists = query !== null;
    if (!queryExists) return INVALID_QUERY;

    const queryNotEmpty = query.length > 0;
    if (!queryNotEmpty) return INVALID_QUERY;

    return query;
  },

  index(index) {
    const indexExists = index !== null;
    if (!indexExists) return defaultInfo.index;

    const indexToNumber = parseInt(index, 10);
    const indexIsNumber = !Number.isNaN(indexToNumber);
    if (!indexIsNumber) return INVALID_QUERY;

    return indexToNumber;
  },

  size(size) {
    const sizeExists = size !== null;
    if (!sizeExists) return defaultInfo.size;

    const sizeToNumber = parseInt(size, 10);
    const isSizeNumber = !Number.isNaN(sizeToNumber);
    if (!isSizeNumber) return INVALID_QUERY;

    const isSizeValid = SearchQuery.Size.includes(
      sizeToNumber as SearchQuery.Size,
    );
    if (!isSizeValid) return INVALID_QUERY;

    return sizeToNumber as SearchQuery.Size;
  },

  sorting(sorting) {
    const sortingExists = sorting !== null;
    if (!sortingExists) return defaultInfo.sorting;

    const isSortingValid = Object.values(SearchQuery.Sorting).includes(
      sorting as SearchQuery.Sorting,
    );
    if (!isSortingValid) return INVALID_QUERY;

    return sorting as SearchQuery.Sorting;
  },

  similarity_limit(similarity_limit) {
    const similarityLimitExists = similarity_limit !== null;
    if (!similarityLimitExists) return defaultInfo.similarity_limit;

    const isSimilarityLimitValid = ["true", "false"].includes(similarity_limit);
    if (!isSimilarityLimitValid) return INVALID_QUERY;

    return similarity_limit === "true";
  },

  // Optional (Filter)
  filter_start_date(filter_start_date) {
    const startDate = convertDateToString(
      convertStringToDate(filter_start_date ?? undefined),
    );

    return startDate ?? undefined;
  },
  filter_end_date(filter_end_date) {
    const endDate = convertDateToString(
      convertStringToDate(filter_end_date ?? undefined),
    );

    return endDate ?? undefined;
  },

  filter_category(filter_category) {
    return filter_category ?? undefined;
  },

  filter_journal(filter_journal) {
    return filter_journal ?? undefined;
  },
};

function isValidInfo(result: object): result is SearchQuery.Info {
  return !Object.values(result).includes(INVALID_QUERY);
}

/**
 * Search Query를 검증합니다.
 *
 * 1. 특정 옵션이 **존재하지 않는** 경우
 * - 기본값이 존재하면 해당 값으로 대체됩니다.
 * - 선택 옵션인 경우 그대로 검증이 통과됩니다.
 * - 이외의 경우 검증 오류가 발생합니다.
 *
 * 2. 특정 옵션이 **유효하지 않은** 값인 경우
 * - 필수 옵션인 경우 검증 오류가 발생합니다.
 * - 선택 옵션인 경우 무시됩니다.
 */
export function validate(info: SearchQuery.RawInfo): SearchQuery.Info | false {
  const result = {
    // Required
    query: converter.query(info.query),
    sorting: converter.sorting(info.sorting),
    size: converter.size(info.size),
    index: converter.index(info.index),
    similarity_limit: converter.similarity_limit(info.similarity_limit),

    // Filter
    filter_start_date: converter.filter_start_date(info.filter_start_date),
    filter_end_date: converter.filter_end_date(info.filter_end_date),
    filter_journal: converter.filter_journal(info.filter_journal),
    filter_category: converter.filter_category(info.filter_category),
  };

  return isValidInfo(result) ? result : false;
}
