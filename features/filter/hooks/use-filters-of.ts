import { useCallback } from "react";
import { useAtom } from "jotai";
import { useDeepCompareMemo } from "use-deep-compare";

import { filterAtom } from "../stores/filter";
import { FilterFeature, FilterScheme } from "../types/registered-filter";

function isFilterFeature<T extends FilterFeature>(
  filter: FilterScheme<FilterFeature>,
  feature: T,
): filter is FilterScheme<T> {
  return filter.feature === feature;
}

export default function useFiltersOf<T extends FilterFeature>(feature: T) {
  const [filters, setFilters] = useAtom(filterAtom);

  const filtersInFeature = useDeepCompareMemo(
    () => filters.filter((filter) => isFilterFeature(filter, feature)),
    [filters, feature],
  );

  const dispatch = useCallback(
    (data: FilterScheme<T>) => {
      setFilters((prev) =>
        prev.filter((filter) => filter.id !== data.id).concat(data),
      );
    },
    [setFilters],
  );

  const remove = useCallback(
    (id: string) => {
      setFilters((prev) => prev.filter((filter) => filter.id !== id));
    },
    [setFilters],
  );

  const removeAll = useCallback(() => {
    setFilters((prev) =>
      prev.filter(
        (filter) => !filtersInFeature.find((f) => f.id === filter.id),
      ),
    );
  }, [filtersInFeature, setFilters]);

  return { filters: filtersInFeature, dispatch, remove, removeAll };
}
