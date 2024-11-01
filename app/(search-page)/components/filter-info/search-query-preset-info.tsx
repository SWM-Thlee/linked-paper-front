"use client";

import { Search } from "@/features/search/types";
import { CustomizedFilterInfo } from "@/features/filter/components/info";
import ApplyToSearchOption from "@/features/search/components/filter-info/filter-option/apply-to-search";
import { PresetSearchFilterInfo } from "@/features/search/components/filter-info/preset-info";

export const SearchQueryPresetFilterInfo =
  CustomizedFilterInfo<Search.Filter.Type>({
    extend: PresetSearchFilterInfo,

    options(filter, store) {
      return (
        <>
          <ApplyToSearchOption store={store} dataID={filter.dataID} />
          {PresetSearchFilterInfo.attributes.options?.(filter, store)}
        </>
      );
    },
  });
