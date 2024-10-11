export type Type = (typeof Type)[keyof typeof Type];
export const Type = {
  INFO: "info",
  TIP: "tip",
  QUESTION: "question",
  SUCCESS: "success",
  WARNING: "warning",
  FAILURE: "failure",
  BUG: "bug",
  SUGGESTION: "suggestion",
  QUOTE: "quote",
} as const;

export interface Data {
  type: Type;
  title: string;
  description: string;
}
