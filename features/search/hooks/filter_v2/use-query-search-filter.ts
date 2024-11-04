import { useDeepCompareMemo } from "use-deep-compare";
import { useAtomValue } from "jotai";

import useFilters from "@/features/filter_v2/hooks/use-filters";
import { queryFilterIdAtom } from "@/features/search/stores/query";

export default function useQuerySearchFilter() {
  const { filters, dispatch } = useFilters();
  const queryFilterId = useAtomValue(queryFilterIdAtom);

  const filter = useDeepCompareMemo(() => {
    const targetFilter = filters.filter(
      ({ feature, id }) => feature === "search-query" && id === queryFilterId,
    );

    if (targetFilter.length > 1) {
      throw new Error(
        "Error from Query Search Filter: There should be only one query filter.",
      );
    }

    if (targetFilter.length === 1) {
      return targetFilter[0];
    }

    return undefined;
  }, [filters]);

  return { filter, dispatch };
}
