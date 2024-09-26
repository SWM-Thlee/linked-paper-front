export type AnnouncementType =
  (typeof AnnouncementType)[keyof typeof AnnouncementType];
export const AnnouncementType = {
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

export interface AnnouncementData {
  type: AnnouncementType;
  title: string;
  description: string;
}
