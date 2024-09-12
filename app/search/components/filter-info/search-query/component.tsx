"use client";

import { Search } from "@/features/search/types";
import { CustomizedFilterInfo } from "@/features/filter/components/info";
import EditFilterOption from "@/features/search/components/filter-info/preset/options/edit-filter";
import { DefaultSearchFilterInfo } from "@/features/search/components/filter-info/default-info";
import AddToPresetsOption from "./options/add-to-presets";

export default CustomizedFilterInfo<Search.Type>({
  extend: DefaultSearchFilterInfo,
  title() {
    return "Current Settings";
  },
  options(filter, store) {
    return (
      <>
        <EditFilterOption store={store} dataID={filter.dataID} />
        <AddToPresetsOption />
      </>
    );
  },
});
