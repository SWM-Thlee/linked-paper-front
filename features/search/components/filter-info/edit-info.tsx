"use client";

import { Search } from "@/features/search/types";
import { CustomizedFilterInfo } from "@/features/filter/components/info";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import { Filter } from "@/features/filter/types";
import EditTitleOption from "./filter-option/edit-title";
import { JournalContent } from "./filter-attribute/journal";
import { CategoryContent } from "./filter-attribute/category";
import { DateContent } from "./filter-attribute/date";
import { RawSearchFilterInfo } from "./raw-info";

function CustomAttributeContent({
  attrKey,
  attrData,
  attrStore,
}: {
  attrKey: Search.Filter.Attribute;
  attrData: Search.Filter.Data;
  attrStore: Filter.Store.Type;
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
  attrData: Search.Filter.Data;
  attrStore: Filter.Store.Type;
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

export const EditSearchFilterInfo = CustomizedFilterInfo<Search.Filter.Type>({
  extend: RawSearchFilterInfo,
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
