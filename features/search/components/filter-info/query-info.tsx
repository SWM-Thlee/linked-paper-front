import { CustomizedFilterInfo } from "@/features/filter/components/info";
import { Search } from "../../types";
import { RawSearchFilterInfo } from "./raw-info";
import ConvertDefaultFilterOption from "./filter-option/convert-default-filter";

export const SearchQueryFilterInfo = CustomizedFilterInfo<Search.Filter.Type>({
  extend: RawSearchFilterInfo,
  options() {
    return <ConvertDefaultFilterOption />;
  },
});
