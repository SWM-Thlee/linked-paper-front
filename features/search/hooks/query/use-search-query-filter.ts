import { useAtomValue } from "jotai";
import { Filter } from "@/features/filter/types";
import useSearchFilters from "../filter/use-search-filters";
import { queryFilterIdAtom } from "../../stores/query";

export default function useSearchQueryFilter() {
  const { filter } = useSearchFilters({
    store: Filter.Store.TEMPORARY,
    track: { dataID: [useAtomValue(queryFilterIdAtom)] },
  });

  return filter;
}
