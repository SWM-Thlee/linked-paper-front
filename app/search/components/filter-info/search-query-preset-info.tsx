"use client";

import { Search } from "@/features/search/types";
import { CustomizedFilterInfo } from "@/features/filter/components/info";
import ApplyToSearchOption from "@/features/search/components/filter-info/filter-option/apply-to-search";
import { DefaultPresetSearchFilterInfo } from "@/features/search/components/filter-info/default-preset-info";

export const SearchQueryPresetFilterInfo = CustomizedFilterInfo<Search.Type>({
  extend: DefaultPresetSearchFilterInfo,

  options(filter, store) {
    return (
      <>
        <ApplyToSearchOption store={store} dataID={filter.dataID} />
        {DefaultPresetSearchFilterInfo.attributes.options?.(filter, store)}
      </>
    );
  },
});
