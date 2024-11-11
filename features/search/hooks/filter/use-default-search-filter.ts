import { useRef } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import useFilters from "@/features/filter/hooks/use-filters";
import { createDefaultSearchFilter } from "../../utils/filter/creator";
import { Search } from "../../types";

/** **참고**: 기본 필터가 존재하지 않는 경우 빈 Filter(Placeholder)를 보여주게 됩니다. */
export default function useDefaultSearchFilter() {
  const { filters, dispatch, remove } = useFilters();
  const placeholder = useRef(
    createDefaultSearchFilter({ name: "Default Filter" }),
  );

  const filter = useDeepCompareMemo(() => {
    const targetFilter = filters.filter(
      (target) => target.feature === "search-default",
    );

    if (targetFilter.length > 1) {
      throw new Error(
        "Error from Default Search Filter: There should be only one default filter.",
      );
    }

    const result = targetFilter.length === 1 ? targetFilter[0] : undefined;

    if (result) {
      const validation = Search.Filter.Default.safeParse(result);

      if (!validation.success) {
        throw new Error(
          "Error from Default Search Filter: Invalid Default Filter.",
        );
      }

      return validation.data;
    }

    return placeholder.current;
  }, [filters]);

  return { filter, dispatch, remove };
}
