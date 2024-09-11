"use client";

import { Search } from "@/features/search/types";
import { CustomizedFilterInfo } from "@/features/filter/components/info";
import {
  SearchFilterAttributeContent,
  SearchFilterAttributeKey,
} from "../common/attribute";
import EditFilterOption from "./options/edit-filter";
import RemoveFilterOption from "./options/remove-filter";
import ApplyToSearch from "./options/apply-to-search";

export default CustomizedFilterInfo<Search.Type>({
  // Journal, Category, Date 순서로 정렬됩니다.
  order: ["journal", "category", "date"],
  options(filter, store) {
    return (
      <>
        <ApplyToSearch store={store} dataID={filter.dataID} />
        <EditFilterOption store={store} dataID={filter.dataID} />
        <RemoveFilterOption store={store} dataID={filter.dataID} />
      </>
    );
  },
  attributeKey: SearchFilterAttributeKey,
  attributeContent: SearchFilterAttributeContent,
});
