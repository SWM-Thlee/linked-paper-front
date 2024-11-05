import { useCallback } from "react";
import { useAtom } from "jotai";
import { useDeepCompareMemo } from "use-deep-compare";

import { filterAtom } from "../stores/filter";
import { FilterFeature, FilterScheme } from "../types/registered-filter";

export default function useFilters(...features: FilterFeature[]) {
  const [filters, setFilters] = useAtom(filterAtom);

  const filtersInFeature = useDeepCompareMemo(
    () => filters.filter((filter) => features.includes(filter.feature)),
    [filters, features],
  );

  const dispatch = useCallback(
    <T extends FilterFeature>(data: FilterScheme<T>) => {
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
