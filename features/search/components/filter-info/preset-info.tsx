"use client";

import { Search } from "@/features/search/types";
import { CustomizedFilterInfo } from "@/features/filter/components/info";
import EditFilterOption from "./filter-option/edit-filter";
import RemoveFilterOption from "./filter-option/remove-filter";
import { RawSearchFilterInfo } from "./raw-info";

export const PresetSearchFilterInfo = CustomizedFilterInfo<Search.Filter.Type>({
  extend: RawSearchFilterInfo,
  options(filter, store) {
    return (
      <>
        <EditFilterOption store={store} dataID={filter.dataID} />
        <RemoveFilterOption store={store} dataID={filter.dataID} />
      </>
    );
  },
});
