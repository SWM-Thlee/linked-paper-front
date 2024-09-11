import { useContext } from "react";
import { SearchQueryFilterContext } from "../../components/query-filter-provider/context";

export default function useSearchQueryFilter() {
  return useContext(SearchQueryFilterContext);
}
