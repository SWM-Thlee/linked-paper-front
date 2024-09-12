"use client";

import Select from "@/ui/select";
import { SearchSorting as Sorting } from "../../../../features/search/types/query";

const items = Object.keys(Sorting).map((sorting) => ({
  value: sorting,
  id: sorting,
}));

export default function SearchSorting() {
  // 전역 상태 관리 필요
  return (
    <Select
      ui_color="tertiary"
      ui_variant="bordered"
      defaultValue="recency"
      items={items}
    />
  );
}
