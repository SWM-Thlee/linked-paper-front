"use client";

import { Search } from "@/features/search/types";
import { FilterStore } from "@/features/filter/types/store";
import { FilterDataID } from "@/features/filter/types/filter";
import { TAG_EDITOR } from "@/features/filter/utils/editor";
import { TAG_SNAPSHOT } from "@/features/filter/utils/snapshot";
import useIsClient from "@/hooks/use-is-client";
import useSearchFilters from "../../hooks/filter/use-search-filters";
import SearchFilterEditor from "./tabs/editor-group/component";

function isSearchDataID(
  dataID: string | number | boolean,
): dataID is FilterDataID<Search.Type> {
  return typeof dataID === "string" && dataID.startsWith(`${Search.Type}-`);
}

function isStore(store: string | number | boolean): store is FilterStore {
  return store === FilterStore.PERSIST || store === FilterStore.TEMPORARY;
}

// Settings 컴포넌트에서 편집 중인 검색 필터를 보여주기 위해 사용됩니다.
export default function SearchFilterEditorContainer() {
  const { filters } = useSearchFilters({
    store: FilterStore.TEMPORARY,
    track: { tag: [TAG_EDITOR] },
  });

  if (!useIsClient()) return null;

  return Object.entries(filters).map(([editorID, editor]) => {
    const dataID = editor.tags[TAG_SNAPSHOT].target;
    const { store } = editor.tags[TAG_SNAPSHOT];

    // 편집의 대상이 되는 Filter를 가져옵니다.
    return (
      isSearchDataID(dataID) &&
      isStore(store) && (
        <SearchFilterEditor key={editorID} store={store} dataID={dataID} />
      )
    );
  });
}
