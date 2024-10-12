export type Sorting = (typeof Sorting)[keyof typeof Sorting];
export const Sorting = {
  RECENCY: "recency",
  SIMILARITY: "similarity",
  // *미구현* CITIATION: "citiation",
} as const;

/** 검색 결과의 크기를 나타냅니다. */
export type Size = (typeof Size)[number];
export const Size = [20, 30, 40, 50] as const;

export type RequiredInfo = {
  query: string;
  sorting: Sorting;
  size: Size;
  index: number;
  similarity_limit: boolean;
};

export type FilterInfo = {
  filter_journal?: string[];
  filter_category?: string[];
  filter_start_date?: string;
  filter_end_date?: string;
};

export type Info = RequiredInfo & FilterInfo;

/** Query String에서 바로 가져온 값을 나타냅니다. */
export type RawInfo = {
  readonly [key in keyof Info]-?:
    | (NonNullable<Info[key]> extends unknown[] ? string[] : string)
    | null;
};
