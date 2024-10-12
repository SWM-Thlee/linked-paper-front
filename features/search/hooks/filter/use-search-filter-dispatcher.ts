import { Search } from "@/features/search/types";
import { Filter } from "@/features/filter/types";
import useFilterDispatcher from "@/features/filter/hooks/use-filter-dispatcher";

export default function useSearchFilterDispatcher({
  store = Filter.Store.PERSIST,
}: {
  store?: Filter.Store.Type;
}) {
  return useFilterDispatcher<Search.Filter.Type>({
    featureID: Search.Filter.Type,
    store,
  });
}
