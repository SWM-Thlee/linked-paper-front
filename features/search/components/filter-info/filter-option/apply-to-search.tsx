"use client";

import { useCallback } from "react";
import { produce } from "immer";

import { Search } from "@/features/search/types";
import { Filter } from "@/features/filter/types";
import SearchIcon from "@/ui/icons/search";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import useSearchFilters from "@/features/search/hooks/filter/use-search-filters";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import useSearchQueryFilter from "@/features/search/hooks/query/use-search-query-filter";
import IconButton from "@/ui/icon-button";
import { Tooltip } from "@/ui/tooltip";
import { toPreset } from "@/features/filter/utils/converter/preset";
import { toDefault } from "@/features/filter/utils/converter/default";

type Props = {
  dataID: Search.Filter.DataID;
  store: Filter.Store.Type;
};

// C1. Default Filter가 존재하는 경우, 기존 Default Filter를 Preset으로 되돌린 후 위의 과정을 수행합니다.
// C2. Default Filter가 존재하지 않는 경우, Default Filter로 설정됨과 동시에 Search Query Filter에도 적용됩니다.
export default function ApplyToSearchOption({ dataID, store }: Props) {
  /* Target Filter */
  const { filter, status } = useSearchFilterEditor({
    store,
    dataID,
  });

  /* Default Filter */
  const { filter: defaultFilter } = useSearchFilters({
    store: Filter.Store.PERSIST,
    track: { tag: [Filter.Identify.Tag.DEFAULT] },
  });

  const { filter: editingDefaultFilter } = useSearchFilters({
    store: Filter.Store.TEMPORARY,
    track: { tag: [Filter.Identify.Tag.DEFAULT, Filter.Identify.Tag.EDIT] },
  });

  const dispatchPersist = useSearchFilterDispatcher({
    store: Filter.Store.PERSIST,
  });

  /* Search Query Filter */
  const { filter: searchQueryEditor } = useSearchFilters({
    store: Filter.Store.TEMPORARY,
    track: { tag: [Filter.Identify.Tag.QUERY, Filter.Identify.Tag.EDIT] },
  });

  const query = useSearchQueryFilter();

  const dispatchTemporary = useSearchFilterDispatcher({
    store: Filter.Store.TEMPORARY,
  });

  const onClick = useCallback(() => {
    if (!(filter && query)) return;

    // Default Filter가 존재하는 경우, 기존의 Default Filter를 Preset으로 바꿉니다.
    if (defaultFilter) {
      dispatchPersist(toPreset<Search.Filter.Type>({ data: defaultFilter }));
    }

    // Preset Filter를 Default Filter로 바꿉니다.
    dispatchPersist(toDefault<Search.Filter.Type>({ data: filter }));

    // Search Query에 Filter 정보를 적용합니다.
    dispatchTemporary(
      produce(query, (draft) => {
        draft.attributes = filter.attributes;
      }),
    );
  }, [dispatchTemporary, dispatchPersist, filter, defaultFilter, query]);

  const available =
    !searchQueryEditor &&
    !editingDefaultFilter &&
    status === Search.Edit.Status.NOT_EDITING;

  return (
    available && (
      <Tooltip title="Apply to Search">
        <IconButton
          ui_size="large"
          ui_variant="bordered"
          ui_color="primary"
          onClick={onClick}
        >
          <SearchIcon ui_size="small" />
        </IconButton>
      </Tooltip>
    )
  );
}
