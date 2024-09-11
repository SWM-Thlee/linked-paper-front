import { FilterData } from "@/features/filter/types/filter";
import { createContext } from "react";
import { Search } from "../../types";
import { SearchQueryFilterInitialData } from "../../utils/filter/search-query";

export type SearchQueryFilterContext = {
  filter: FilterData<Search.Type> | null;
  info: SearchQueryFilterInitialData;
};
export const SearchQueryFilterContext =
  createContext<SearchQueryFilterContext | null>(null);
