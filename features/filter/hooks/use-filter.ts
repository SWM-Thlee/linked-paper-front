import { useDeepCompareMemo } from "use-deep-compare";

import { useCallback } from "react";
import useFilters from "@/features/filter/hooks/use-filters";

export default function useFilter(filterId: string) {
  const { filters, dispatch, remove: removeFilter } = useFilters();

  const filter = useDeepCompareMemo(() => {
    const targetFilter = filters.filter(({ id }) => id === filterId);

    if (targetFilter.length > 1) {
      throw new Error("Error from Filter: There should be only one filter.");
    }

    if (targetFilter.length === 1) {
      return targetFilter[0];
    }

    return undefined;
  }, [filters]);

  const remove = useCallback(() => {
    if (!filter?.id) return;

    removeFilter(filter.id);
  }, [filter?.id, removeFilter]);

  return { filter, dispatch, remove };
}
