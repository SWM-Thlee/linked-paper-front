import { Search } from "@/features/search/types";
import { SearchFilter, SearchQuery } from "./scheme";

const Type = {
  CHANGE_FILTER_SORTING: "change_filter_sorting",
  SEARCH_QUERY_MAIN: "search_query_main",
  SEARCH_QUERY_NAV: "search_query_nav",
  SEARCH_QUERY_RESULT: "search_query_result",
} as const;

export type Type = (typeof Type)[keyof typeof Type];
export const {
  CHANGE_FILTER_SORTING,
  SEARCH_QUERY_MAIN,
  SEARCH_QUERY_NAV,
  SEARCH_QUERY_RESULT,
} = Type;

type PayloadTypes = {
  [Type.CHANGE_FILTER_SORTING]: {
    sorting: Search.Query.Sorting;
  };
  [Type.SEARCH_QUERY_MAIN]: SearchQuery & SearchFilter;
  [Type.SEARCH_QUERY_NAV]: SearchQuery & SearchFilter;
  [Type.SEARCH_QUERY_RESULT]: SearchQuery & SearchFilter;
};

export type Payload<T extends Type> = PayloadTypes[T];
