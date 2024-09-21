import { atom } from "jotai";

import { Search } from "../types";

export const defaultQueryValue: Search.Query.Info = {
  query: "Linked Paper",
  index: 0,
  size: 20,
  similarity_limit: true,
  sorting: Search.Query.Sorting.SIMILARITY,
};

/** Query String에서 가져온 Read-Only 정보입니다. */
export const queryAtom = atom<Search.Query.Info>(defaultQueryValue);

/** Query String과 연동되는 Search Query Filter를 나타냅니다. */
export const queryFilterAtom = atom<Search.Filter.Data | null>(null);

/** 검색 정보 중 필수 정보를 나타냅니다. 변경 시 자동으로 인식하여 Query String에 반영됩니다. */
export const requiredQueryAtom = atom<Search.Query.RequiredInfo | null>(null);
