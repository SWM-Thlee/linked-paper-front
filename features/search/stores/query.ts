import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import isEqual from "react-fast-compare";
import { v4 as uuidv4 } from "uuid";

import { Search } from "../types";

/** Query String과 연동되는 정보입니다. */
export const queryAtom = atom<Search.Query.Info>(Search.Query.defaultInfo);
export const queryStaleAtom = atom(false);
export const queryFilterIdAtom = atom<string>(uuidv4());

/** 필수 정보를 나타냅니다. */
export const requiredQueryAtom = selectAtom<
  Search.Query.Info,
  Search.Query.Required
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
  Search.Query.Filter
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
