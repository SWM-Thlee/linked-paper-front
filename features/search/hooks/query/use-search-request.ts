import { useCallback } from "react";
import { useAtomValue } from "jotai";
import { usePathname, useRouter } from "next/navigation";

import { Filter } from "@/features/filter/types";
import { Search } from "../../types";
import {
  convertSearchFilterToQuery,
  convertToQueryString,
} from "../../utils/filter/query";
import { queryFilterAtom, requiredQueryAtom } from "../../stores/query";
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

  /** Search Query Updating on "Search Page" */
  const currentRoute = usePathname();
  const requiredInfo = useAtomValue(requiredQueryAtom);
  const filterInfo = useAtomValue(queryFilterAtom);

  const canUpdate = useCallback(() => {
    const isInSearchPage = currentRoute === "/search";
    const isInitialized = requiredInfo && filterInfo;

    return isInSearchPage && isInitialized;
  }, [currentRoute, requiredInfo, filterInfo]);

  const update = useCallback(
    (
      info?:
        | Search.Query.Info
        | Search.Query.RequiredInfo
        | Search.Query.FilterInfo,
    ) => {
      if (currentRoute !== "/search") {
        throw new Error(
          "Error from Updating Search Query: Updating Query must be occurred in Search Page.",
        );
      }

      if (!(requiredInfo && filterInfo)) {
        throw new Error(
          "Error from Updating Search Query: Info is not initialized yet.",
        );
      }

      const queryFromFilter = convertSearchFilterToQuery(filterInfo);

      const queryString = convertToQueryString({
        ...requiredInfo,
        ...queryFromFilter,
        ...info,
      });
      router.replace(`/search?${queryString}`);
    },
    [router, currentRoute, filterInfo, requiredInfo],
  );

  return { request, update, canUpdate };
}
