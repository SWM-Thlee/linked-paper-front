import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { Filter } from "@/features/filter/types";
import { Search } from "../../types";
import {
  convertSearchFilterToQuery,
  convertToQueryString,
} from "../../utils/filter/query";
import useSearchFilters from "../filter/use-search-filters";

export default function useSearchRequest() {
  const router = useRouter();

  /** Search Request on "Any Page" */
  const { filter: defaultFilter } = useSearchFilters({
    store: Filter.Store.PERSIST,
    track: { tag: [Filter.Identify.Tag.DEFAULT] },
  });

  const request = useCallback(
    (info: Search.Query.RequiredInfo, filter?: Search.Filter.Data) => {
      if (!(defaultFilter || filter)) {
        throw new Error("Error from Requesting Search: Filter is not found.");
      }

      const queryString = convertToQueryString({
        ...convertSearchFilterToQuery((filter ?? defaultFilter)!),
        ...info,
      });

      router.push(`/search?${queryString}`);
    },
    [router, defaultFilter],
  );

  return { request };
}
