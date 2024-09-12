"use client";

import { Search } from "@/features/search/types";
import { CustomizedFilterInfo } from "@/features/filter/components/info";
import { SearchQueryToPresetOption } from "@/features/search/components/filter-info/filter-option/search-query-to-preset";
import EditFilterOption from "@/features/search/components/filter-info/filter-option/edit-filter";
import { RawSearchFilterInfo } from "@/features/search/components/filter-info/raw-info";

export const SearchQueryFilterInfo = CustomizedFilterInfo<Search.Type>({
  extend: RawSearchFilterInfo,
  title() {
    return "Current Settings";
  },
  options(filter, store) {
    return (
      <>
        <EditFilterOption
          titleEditable={false}
          store={store}
          dataID={filter.dataID}
        />
        <SearchQueryToPresetOption />
      </>
    );
  },
});
