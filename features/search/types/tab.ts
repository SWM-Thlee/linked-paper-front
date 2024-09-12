export const TAB_CATEGORY = {
  ID: "FilterCategoryEditor",
  TITLE: "Category",
  DESCRIPTION:
    "Choose the category of paper you want to narrow down when searching for papers.",
} as const;

export const TAB_DATE = {
  ID: "FilterDateEditor",
  TITLE: "Date",
  DESCRIPTION:
    "Specify a (published) date range of papers you want to narrow down when searching for.",
} as const;

export const TAB_JOURNAL = {
  ID: "FilterJournalEditor",
  TITLE: "Journal",
  DESCRIPTION:
    "Choose the journal of paper you want to narrow down when searching for papers.",
} as const;

export const TAB_PREVIEW = {
  ID: "FilterEditorPreview",
} as const;

export const TAB_SEARCH_QUERY = {
  ID: "SearchQuery",
  TITLE: "Search Query",
  DESCRIPTION:
    "You can set the filter to be used for search queries. When the changes are applied, they are immediately applied to the search results.",
} as const;

export const TAB_DEFAULT_SEARCH_FILTER = {
  ID: "DefaultSearchFilter",
  TITLE: "Default Filter",
  DESCRIPTION:
    "Default Filter lets users pre-set search criteria to streamline their search and get more relevant results from the start.",
} as const;
