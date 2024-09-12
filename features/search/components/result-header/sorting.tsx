"use client";

import Select from "@/ui/select";
import { SearchSortingType } from "../../types/query";

const sortings: SearchSortingType[] = ["similarity", "recency", "citiation"];
const items = sortings.map((sorting) => ({ value: sorting, id: sorting }));

export default function SearchSorting() {
  // 전역 상태 관리 필요
  return (
    <Select
      _color="tertiary"
      _variant="bordered"
      defaultValue="recency"
      items={items}
    />
  );
}
