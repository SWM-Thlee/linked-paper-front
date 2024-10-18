import { CustomizedFilterInfo } from "@/features/filter/components/info";
import { PresetSearchFilterInfo } from "@/features/search/components/filter-info/preset-info";
import { Search } from "../../types";
import EditFilterOption from "./filter-option/edit-filter";

export const DefaultSearchQueryFilterInfo =
  CustomizedFilterInfo<Search.Filter.Type>({
    extend: PresetSearchFilterInfo,
    options(filter, store) {
      return <EditFilterOption store={store} dataID={filter.dataID} />;
    },
  });
