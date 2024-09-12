import { FilterData } from "@/features/filter/types/filter";
import { createContext } from "react";
import { Search } from "../../types";
import { SearchQueryFilterData } from "../../utils/filter/query";

export type SearchQueryFilterContext = {
  filter: FilterData<Search.Type> | null;
  info: SearchQueryFilterData;
};
export const SearchQueryFilterContext =
  createContext<SearchQueryFilterContext | null>(null);
