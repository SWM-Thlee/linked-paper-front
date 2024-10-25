export const Type = {
  FEEDBACK: "feedback",
  BUG: "bug",
  FEATURE_REQUEST: "feature_request",
  IMPROVEMENT: "improvement",
} as const;

export type Type = (typeof Type)[keyof typeof Type];

export const Subject = {
  ALL: "all",
  SEARCH: "search",
  GRAPH: "graph",
  FILTER: "filter",
  PAPER: "paper",
} as const;

export type Subject = (typeof Subject)[keyof typeof Subject];
