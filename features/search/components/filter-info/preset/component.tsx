"use client";

import { Search } from "@/features/search/types";
import { CustomizedFilterInfo } from "@/features/filter/components/info";
import EditFilterOption from "./options/edit-filter";
import RemoveFilterOption from "./options/remove-filter";
import { DefaultSearchFilterInfo } from "../default-info";

export default CustomizedFilterInfo<Search.Type>({
  extend: DefaultSearchFilterInfo,
  options(filter, store) {
    return (
      <>
        <EditFilterOption store={store} dataID={filter.dataID} />
        <RemoveFilterOption store={store} dataID={filter.dataID} />
      </>
    );
  },
});
