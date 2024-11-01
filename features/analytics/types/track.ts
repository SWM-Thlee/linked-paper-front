import { Signature } from "@/utils/signature";

export type UserId = `user:${Signature}`;

export const View = {
  MAIN: "main",
  SEARCH: "search",
  CORRELATION: "correlation",
} as const;

export type View = (typeof View)[keyof typeof View];
