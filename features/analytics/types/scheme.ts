export type SearchFilter = {
  filter_journal?: string[];
  filter_date_start?: string;
  filter_date_end?: string;
  filter_category?: string[];
};

export type SearchQuery = {
  query: string;
};
