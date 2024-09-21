export type Sorting = (typeof Sorting)[keyof typeof Sorting];
export const Sorting = {
  RECENCY: "recency",
  SIMILARITY: "similarity",
  CITIATION: "citiation",
} as const;

export type Size = (typeof Size)[number];
export const Size = [20, 40, 60, 80, 100] as const;

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

export type RawInfo = {
  readonly [key in keyof Info]-?:
    | (NonNullable<Info[key]> extends string[] ? string[] : string)
    | null;
};
