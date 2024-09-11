"use client";

import { Search } from "@/features/search/types";
import { CustomizedFilterInfo } from "@/features/filter/components/info";
import {
  SearchFilterAttributeContent,
  SearchFilterAttributeKey,
} from "./common/attribute";

export default CustomizedFilterInfo<Search.Type>({
  // Journal, Category, Date 순서로 정렬됩니다.
  order: ["journal", "category", "date"],
  attributeKey: SearchFilterAttributeKey,
  attributeContent: SearchFilterAttributeContent,
});
