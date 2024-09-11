"use client";

import { Search } from "@/features/search/types";
import { CustomizedFilterInfo } from "@/features/filter/components/info";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import { FilterAttributeKey, FilterData } from "@/features/filter/types/filter";
import { FilterStore } from "@/features/filter/types/store";
import { TAG_SEARCH_QUERY } from "@/features/search/utils/filter/search-query";
import { SearchFilterAttributeKey } from "../common/attribute";
import EditTitleOption from "../common/option/edit-title";
import { JournalContent } from "../common/attribute/journal";
import { CategoryContent } from "../common/attribute/category";
import { DateContent } from "../common/attribute/date";

function CustomAttributeContent({
  attrKey,
  attrData,
  attrStore,
}: {
  attrKey: FilterAttributeKey<Search.Type>;
  attrData: FilterData<Search.Type>;
  attrStore: FilterStore;
}) {
  const { editor } = useSearchFilterEditor({
    store: attrStore,
    dataID: attrData.dataID,
  });

  if (!editor) return null;

  switch (attrKey) {
    case "journal":
      return <JournalContent {...editor.attributes.journal} />;
    case "category":
      return <CategoryContent {...editor.attributes.category} />;
    case "date":
      return <DateContent {...editor.attributes.date} />;
    default:
      return null;
  }
}

export default CustomizedFilterInfo<Search.Type>({
  // Journal, Category, Date 순서로 정렬됩니다.
  order: ["journal", "category", "date"],
  title(data, store) {
    // Edge Case. Search Query이면 Title을 변경할 수 없습니다.
    if (data.tags[TAG_SEARCH_QUERY]) return data.name;
    return <EditTitleOption dataID={data.dataID} store={store} />;
  },
  attributeKey: SearchFilterAttributeKey,

  // Preview이므로 Editing Filter의 정보를 반영해야 합니다.
  attributeContentCustom(key, data, store) {
    return (
      <CustomAttributeContent attrKey={key} attrData={data} attrStore={store} />
    );
  },
});
