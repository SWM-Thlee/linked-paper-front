"use client";

import { Search } from "@/features/search/types";
import { FilterStore } from "@/features/filter/types/store";
import { FilterDataID } from "@/features/filter/types/filter";
import useIsClient from "@/hooks/use-is-client";
import { FilterTrackingStrategy } from "@/features/filter/types/track";
import { Tag } from "@/features/filter/types/tag";
import useSearchFilters from "../../hooks/filter/use-search-filters";
import { SearchFilterEditor } from "./filter-editor";

function isSearchDataID(
  dataID: string | number | boolean,
): dataID is FilterDataID<Search.Type> {
  return typeof dataID === "string" && dataID.startsWith(`${Search.Type}-`);
}

function isStore(store: string | number | boolean): store is FilterStore {
  return store === FilterStore.PERSIST || store === FilterStore.TEMPORARY;
}

type Props = {
  /** Editor를 보여줄 Filter를 선별합니다. */
  track?: FilterTrackingStrategy<Search.Type>;
};

// Settings 컴포넌트에서 편집 중인 검색 필터를 보여주기 위해 사용됩니다.
// TODO: Search 이외로 확장 가능?
export default function SearchFilterEditorContainer({
  track: extraTrackInfo,
}: Props) {
  const { filters } = useSearchFilters({
    store: FilterStore.TEMPORARY,
    track: {
      ...extraTrackInfo,
      tag: [Tag.EDIT, ...(extraTrackInfo?.tag ?? [])],
    },
  });

  if (!useIsClient()) return null;

  return Object.entries(filters).map(([editorID, editor]) => {
    const { store, target } = editor.tags[Tag.EDIT];

    // 편집의 대상이 되는 Filter를 가져옵니다.
    return (
      isSearchDataID(target) &&
      isStore(store) && (
        <SearchFilterEditor key={editorID} store={store} dataID={target} />
      )
    );
  });
}
