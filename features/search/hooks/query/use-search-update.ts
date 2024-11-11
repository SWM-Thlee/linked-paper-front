import { useCallback } from "react";
import { useAtomValue } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import isEqual from "react-fast-compare";

import { Search } from "../../types";
import { toQueryString } from "../../utils/query";
import { queryAtom } from "../../stores/query";

export default function useSearchUpdate() {
  const router = useRouter();

  /** Search Query Updating on "Search Page" */
  const currentRoute = usePathname();
  const query = useAtomValue(queryAtom);

  const isInSearchPage = useCallback(() => {
    return currentRoute === "/search";
  }, [currentRoute]);

  const update = useCallback(
    (
      info?: Search.Query.Info | Search.Query.Required | Search.Query.Filter,
    ) => {
      if (currentRoute !== "/search") {
        throw new Error(
          "Error from Updating Search Query: Updating Query must be occurred in Search Page.",
        );
      }

      const newQuery = { ...query, ...info };
      const queryString = toQueryString(newQuery);

      if (isEqual(query, newQuery)) return;

      router.replace(`/search?${queryString}`);
    },
    [router, currentRoute, query],
  );

  return { update, isInSearchPage };
}
