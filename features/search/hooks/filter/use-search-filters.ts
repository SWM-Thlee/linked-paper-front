import { Filter } from "@/features/filter/types";
import { Search } from "@/features/search/types";
import useFilters from "@/features/filter/hooks/use-filters";

type Props = {
  store?: Filter.Store.Type;
  track?: Filter.Identify.Strategy<Search.Filter.Type>;
};

export default function useSearchFilters({
  store = Filter.Store.TEMPORARY,
  track,
}: Props) {
  return useFilters<Search.Filter.Type>({
    featureID: Search.Filter.Type,
    store,
    track,
  });
}
