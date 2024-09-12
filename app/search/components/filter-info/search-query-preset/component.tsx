"use client";

import { Search } from "@/features/search/types";
import { CustomizedFilterInfo } from "@/features/filter/components/info";
import { SearchFilterPresetInfo } from "@/features/search/components/filter-info/preset";
import ApplyToSearch from "./options/apply-to-search";

export default CustomizedFilterInfo<Search.Type>({
  extend: SearchFilterPresetInfo,

  // 기존 Options에 Apply-To-Search를 추가한 형태입니다.
  options(filter, store) {
    return (
      <>
        <ApplyToSearch store={store} dataID={filter.dataID} />
        {SearchFilterPresetInfo.attributes.options?.(filter, store)}
      </>
    );
  },
});
