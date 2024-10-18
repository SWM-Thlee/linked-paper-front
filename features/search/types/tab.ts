export const CATEGORY = {
  ID: "FilterCategoryEditor",
  TITLE: "Category",
  DESCRIPTION:
    "Choose the category of paper you want to narrow down when searching for papers.",
} as const;

export const DATE = {
  ID: "FilterDateEditor",
  TITLE: "Date",
  DESCRIPTION:
    "Specify a (published) date range of papers you want to narrow down when searching for.",
} as const;

export const JOURNAL = {
  ID: "FilterJournalEditor",
  TITLE: "Source",
  DESCRIPTION:
    "Choose the source of paper you want to narrow down when searching for papers.",
} as const;

export const PREVIEW = {
  ID: "FilterEditorPreview",
} as const;

export const SEARCH_QUERY = {
  ID: "SearchQuery",
  TITLE: "Search Query",
  DESCRIPTION:
    "You can set the filter to be used for search queries. When the changes are applied, they are immediately applied to the search results.",
} as const;

export const DEFAULT_SEARCH_FILTER = {
  ID: "DefaultSearchFilter",
  TITLE: "Default Filter",
  DESCRIPTION:
    "Default Filter lets users pre-set search criteria to streamline their search and get more relevant results from the start.",
} as const;

export const EMPTY = {
  TITLE: "Empty Tab",
  DESCRIPTION: "Tab is not selected.",
} as const;
