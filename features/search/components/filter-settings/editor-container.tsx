"use client";

import { Search } from "@/features/search/types";
import { Filter } from "@/features/filter/types";
import useIsClient from "@/hooks/use-is-client";
import useSearchFilters from "../../hooks/filter/use-search-filters";
import { SearchFilterEditor } from "./filter-editor";

function isSearchDataID(
  dataID: string | number | boolean,
): dataID is Search.Filter.DataID {
  return (
    typeof dataID === "string" && dataID.startsWith(`${Search.Filter.Type}-`)
  );
}

function isStore(store: string | number | boolean): store is Filter.Store.Type {
  return store === Filter.Store.PERSIST || store === Filter.Store.TEMPORARY;
}

type Props = {
  /** Editor를 보여줄 Filter를 선별합니다. */
  track?: Filter.Identify.Strategy<Search.Filter.Type>;
};

// Settings 컴포넌트에서 편집 중인 검색 필터를 보여주기 위해 사용됩니다.
// TODO: Search 이외로 확장 가능?
export default function SearchFilterEditorContainer({
  track: extraTrackInfo,
}: Props) {
  const { filters } = useSearchFilters({
    store: Filter.Store.TEMPORARY,
    track: {
      ...extraTrackInfo,
      tag: [Filter.Identify.Tag.EDIT, ...(extraTrackInfo?.tag ?? [])],
    },
  });

  if (!useIsClient()) return null;

  return Object.entries(filters).map(([editorID, editor]) => {
    const { store, target } = editor.tags[Filter.Identify.Tag.EDIT];

    // 편집의 대상이 되는 Filter를 가져옵니다.
    return (
      isSearchDataID(target) &&
      isStore(store) && (
        <SearchFilterEditor key={editorID} store={store} dataID={target} />
      )
    );
  });
}
