"use client";

import { logEvent } from "firebase/analytics";
import { analytics } from "@/config/firebase";

// example event
export const searchEvent = (searchTerm: string) => {
  if (analytics) {
    logEvent(analytics, "search", { search_term: searchTerm });
  }
};

export const pageViewEvent = (pathname: string) => {
  if (analytics) {
    logEvent(analytics, "page_view", { page_path: pathname });
  }
};
