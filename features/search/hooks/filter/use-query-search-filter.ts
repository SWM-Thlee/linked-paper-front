import { useCallback } from "react";
import { useDeepCompareMemo } from "use-deep-compare";
import { useAtomValue } from "jotai";

import useFilters from "@/features/filter/hooks/use-filters";
import { queryFilterIdAtom } from "@/features/search/stores/query";
import { Search } from "../../types";

export default function useQuerySearchFilter() {
  const { filters, dispatch, remove: removeFilter } = useFilters();
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

    const result = targetFilter.length === 1 ? targetFilter[0] : undefined;

    if (result) {
      const validation = Search.Filter.Query.safeParse(result);

      if (!validation.success) {
        throw new Error(
          "Error from Query Search Filter: Invalid Query Filter.",
        );
      }

      return validation.data;
    }

    return undefined;
  }, [filters]);

  const remove = useCallback(() => {
    if (!filter) return;

    removeFilter(filter.id);
  }, [filter, removeFilter]);

  return { id: queryFilterId, filter, dispatch, remove };
}
