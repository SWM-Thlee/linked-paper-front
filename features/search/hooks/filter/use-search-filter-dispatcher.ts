import { Search } from "@/features/search/types";
import useFilterDispatcher from "@/features/filter/hooks/use-filter-dispatcher";
import { FilterStore } from "@/features/filter/types/store";

export default function useSearchFilterDispatcher({
  store = FilterStore.PERSIST,
}: {
  store?: FilterStore;
}) {
  return useFilterDispatcher<Search.Type>({
    featureID: Search.Type,
    store,
  });
}
