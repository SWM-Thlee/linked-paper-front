import { useDeepCompareMemo } from "use-deep-compare";

import useFilters from "@/features/filter_v2/hooks/use-filters";
import { Search } from "../../types";

export default function useSearchFilters(
  ...features: Search.Filter_V2.Feature[]
) {
  const { filters, dispatch } = useFilters();

  const targetFilters = useDeepCompareMemo(
    () => filters.filter(({ feature }) => features.includes(feature)),
    [filters],
  );

  return { filters: targetFilters, dispatch };
}
