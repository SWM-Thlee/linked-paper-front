// 검색 시 정렬 방식을 나타냅니다.
export type SearchSorting = (typeof SearchSorting)[keyof typeof SearchSorting];
export const SearchSorting = {
  RECENCY: "recency",
  SIMILARITY: "similarity",
  CITIATION: "citiation",
} as const;

export type RawSearchQueryInfo = {
  query?: string;
  sorting?: string;
  size?: number;
  index?: number;
  similarity_limit?: boolean;
  filter_journal?: string[];
  filter_category?: string[];
  filter_start_date?: string;
  filter_end_date?: string;
};
