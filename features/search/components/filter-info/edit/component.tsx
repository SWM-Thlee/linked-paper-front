"use client";

import { Search } from "@/features/search/types";
import { CustomizedFilterInfo } from "@/features/filter/components/info";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import { FilterAttributeKey, FilterData } from "@/features/filter/types/filter";
import { FilterStore } from "@/features/filter/types/store";
import EditTitleOption from "../common/option/edit-title";
import { JournalContent } from "../common/attribute/journal";
import { CategoryContent } from "../common/attribute/category";
import { DateContent } from "../common/attribute/date";
import { DefaultSearchFilterInfo } from "../default-info";

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

function CustomTitleContent({
  attrData,
  attrStore,
}: {
  attrData: FilterData<Search.Type>;
  attrStore: FilterStore;
}) {
  const { isTitleEditable } = useSearchFilterEditor({
    dataID: attrData.dataID,
    store: attrStore,
  });

  return isTitleEditable ? (
    <EditTitleOption dataID={attrData.dataID} store={attrStore} />
  ) : (
    attrData.name
  );
}

export default CustomizedFilterInfo<Search.Type>({
  extend: DefaultSearchFilterInfo,
  title(data, store) {
    return <CustomTitleContent attrData={data} attrStore={store} />;
  },
  // Preview이므로 Editing Filter의 정보를 반영해야 합니다.
  attributeContentCustom(key, data, store) {
    return (
      <CustomAttributeContent attrKey={key} attrData={data} attrStore={store} />
    );
  },
});