import { atomWithStorage } from "jotai/utils";

export const PERSIST_KEY = "LINKED_PAPER_FLOWER_GUIDE";
export const guideAtom = atomWithStorage(PERSIST_KEY, true);
