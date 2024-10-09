import { atom } from "jotai";

export const HeaderMode = {
  DEFAULT: "default",
  FLOATING: "floating",
} as const;

export type HeaderMode = (typeof HeaderMode)[keyof typeof HeaderMode];

export const headerModeAtom = atom<HeaderMode>(HeaderMode.DEFAULT);
