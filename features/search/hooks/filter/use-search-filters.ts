import useFilters from "@/features/filter/hooks/use-filters";
import { FilterStore } from "@/features/filter/types/store";
import { FilterTrackingStrategy } from "@/features/filter/types/track";
import { Search } from "@/features/search/types";

type Props = {
  store?: FilterStore;
  track?: FilterTrackingStrategy<Search.Type>;
};

export default function useSearchFilters({
  store = FilterStore.TEMPORARY,
  track,
}: Props) {
  return useFilters<Search.Type>({ featureID: Search.Type, store, track });
}
