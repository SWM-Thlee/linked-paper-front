"use client";

import { Search } from "@/features/search/types";
import { CustomizedFilterInfo } from "@/features/filter/components/info";
import { PresetSearchFilterInfo } from "./preset-info";
import SetDefaultFilterOption from "./filter-option/set-default-filter";

export const DefaultPresetSearchFilterInfo =
  CustomizedFilterInfo<Search.Filter.Type>({
    extend: PresetSearchFilterInfo,
    options(filter, store) {
      return (
        <>
          <SetDefaultFilterOption dataID={filter.dataID} />
          {PresetSearchFilterInfo.attributes.options?.(filter, store)}
        </>
      );
    },
  });
