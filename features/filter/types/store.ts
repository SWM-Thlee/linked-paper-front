const FilterStore = {
  PERSIST: "PERSIST",
  TEMPORARY: "TEMPORARY",
} as const;

export type Type = (typeof FilterStore)[keyof typeof FilterStore];
export const { PERSIST, TEMPORARY } = FilterStore;
