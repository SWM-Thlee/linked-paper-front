export const EditStatus = {
  NOT_EDITING: "NOT_EDITING",
  EDITING: "EDITING",
  UNSPECIFIED: "UNSPECIFIED",
} as const;
export type EditStatus = (typeof EditStatus)[keyof typeof EditStatus];
