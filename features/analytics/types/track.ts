export const View = {
  MAIN: "main",
  SEARCH: "search",
  CORRELATION: "correlation",
} as const;

export type View = (typeof View)[keyof typeof View];
