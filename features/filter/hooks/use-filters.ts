import { useCallback } from "react";
import { useAtom } from "jotai";

import { filterAtom } from "../stores/filter";
import { FilterFeature, FilterScheme } from "../types/registered-filter";

export default function useFilters() {
  const [filters, setFilters] = useAtom(filterAtom);

  const dispatch = useCallback(
    (data: FilterScheme<FilterFeature>) => {
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
      prev.filter((filter) => !filters.find((f) => f.id === filter.id)),
    );
  }, [filters, setFilters]);

  return { filters, dispatch, remove, removeAll };
}
