import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import isEqual from "react-fast-compare";

import { generateFilterDataID } from "@/features/filter/utils/id";
import { Search } from "../types";

export const defaultQueryValue: Search.Query.Info = {
  query: "Linked Paper",
  index: 0,
  size: 20,
  similarity_limit: true,
  sorting: Search.Query.Sorting.SIMILARITY,
};

/** Query String과 연동되는 정보입니다. */
export const queryAtom = atom<Search.Query.Info>(defaultQueryValue);
export const queryStaleAtom = atom(false);
export const queryFilterIdAtom = atom<Search.Filter.DataID>(
  generateFilterDataID(Search.Filter.Type),
);

/** 필수 정보를 나타냅니다. */
export const requiredQueryAtom = selectAtom<
  Search.Query.Info,
  Search.Query.RequiredInfo
>(
  queryAtom,
  ({ index, query, similarity_limit, size, sorting }) => ({
    index,
    query,
    similarity_limit,
    size,
    sorting,
  }),
  isEqual,
);

/** Filter 정보를 나타냅니다. */
export const filterQueryAtom = selectAtom<
  Search.Query.Info,
  Search.Query.FilterInfo
>(
  queryAtom,
  ({
    filter_category,
    filter_end_date,
    filter_journal,
    filter_start_date,
  }) => ({
    filter_category,
    filter_end_date,
    filter_journal,
    filter_start_date,
  }),
  isEqual,
);
