import { signature } from "@/utils/signature";
import { atomWithStorage } from "jotai/utils";
import { Analytics } from "../types";

export const PERSIST_KEY = "LINKED_PAPER_ANALYTICS_USER_ID";
export const userIdAtom = atomWithStorage<Analytics.Track.UserId>(
  PERSIST_KEY,
  `user:${signature()}`,
);
