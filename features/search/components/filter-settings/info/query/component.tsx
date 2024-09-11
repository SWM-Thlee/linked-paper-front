"use client";

import { Search } from "@/features/search/types";
import { CustomizedFilterInfo } from "@/features/filter/components/info";
import {
  SearchFilterAttributeContent,
  SearchFilterAttributeKey,
} from "../common/attribute";
import EditFilterOption from "../preset/options/edit-filter";
import AddToPresetsOption from "./options/add-to-presets";

export default CustomizedFilterInfo<Search.Type>({
  // Journal, Category, Date 순서로 정렬됩니다.
  order: ["journal", "category", "date"],
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
  attributeKey: SearchFilterAttributeKey,
  attributeContent: SearchFilterAttributeContent,
});
