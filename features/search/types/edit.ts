export const Status = {
  NOT_EDITING: "NOT_EDITING",
  EDITING: "EDITING",
  UNSPECIFIED: "UNSPECIFIED",
} as const;
export type Status = (typeof Status)[keyof typeof Status];
