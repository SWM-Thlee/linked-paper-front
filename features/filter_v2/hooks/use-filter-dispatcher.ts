import { useCallback } from "react";
import { useSetAtom } from "jotai";

import { filterAtom } from "../stores/filter";
import { FilterFeature, FilterScheme } from "../types/registered-filter";

export default function useFilterDispatcher() {
  const dispatch = useSetAtom(filterAtom);

  return useCallback(
    <T extends FilterFeature>(data: FilterScheme<T>) => {
      dispatch((prev) =>
        prev.filter((filter) => filter.id !== data.id).concat(data),
      );
    },
    [dispatch],
  );
}
