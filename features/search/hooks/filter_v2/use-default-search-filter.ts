import { useDeepCompareMemo } from "use-deep-compare";

import useFilters from "@/features/filter-v2/hooks/use-filters";

export default function useDefaultSearchFilter() {
  const { filters, dispatch } = useFilters();

  const filter = useDeepCompareMemo(() => {
    const targetFilter = filters.filter(
      ({ feature }) => feature === "search-default",
    );

    if (targetFilter.length > 1) {
      throw new Error(
        "Error from Default Search Filter: There should be only one default filter.",
      );
    }

    if (targetFilter.length === 1) {
      return targetFilter[0];
    }

    return undefined;
  }, [filters]);

  return { filter, dispatch };
}
