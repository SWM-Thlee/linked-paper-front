import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { Search } from "../../types";
import { filterToQuery, toQueryString } from "../../utils/query";
import useDefaultSearchFilter from "../filter/use-default-search-filter";

export default function useSearchRequest() {
  const router = useRouter();

  /** Search Request on "Any Page" */
  const { filter: defaultFilter } = useDefaultSearchFilter();

  const request = useCallback(
    (info: Search.Query.Required, filter?: Search.Filter.Scheme) => {
      const targetFilter = filter ?? defaultFilter;

      const queryString = toQueryString({
        ...(targetFilter ? filterToQuery(targetFilter.attributes) : null),
        ...info,
      });

      router.push(`/search?${queryString}`);
    },
    [router, defaultFilter],
  );

  return { defaultFilter, request };
}
