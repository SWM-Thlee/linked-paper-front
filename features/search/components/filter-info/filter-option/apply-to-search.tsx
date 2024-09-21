"use client";

import { useCallback } from "react";
import { produce } from "immer";

import { Search } from "@/features/search/types";
import Button from "@/ui/button";
import { FilterDataID } from "@/features/filter/types/filter";
import { FilterStore } from "@/features/filter/types/store";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import { EditStatus } from "@/features/search/types/edit";
import SearchIcon from "@/ui/icons/search";
import useSearchFilters from "@/features/search/hooks/filter/use-search-filters";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import useSearchQueryFilter from "@/features/search/hooks/query/use-search-query-filter";
import { Tag } from "@/features/filter/types/tag";

type Props = {
  dataID: FilterDataID<Search.Type>;
  store: FilterStore;
};

export default function ApplyToSearchOption({ dataID, store }: Props) {
  const { filter, status } = useSearchFilterEditor({
    store,
    dataID,
  });

  const { filter: searchQueryEditor } = useSearchFilters({
    store: FilterStore.TEMPORARY,
    track: { tag: [Tag.QUERY, Tag.EDIT] },
  });

  const query = useSearchQueryFilter();
  const dispatch = useSearchFilterDispatcher({
    store: FilterStore.TEMPORARY,
  });

  const onClick = useCallback(() => {
    if (!(filter && query)) return;

    dispatch(
      produce(query, (draft) => {
        draft.attributes = filter.attributes;
      }),
    );
  }, [dispatch, filter, query]);

  return !searchQueryEditor && status === EditStatus.NOT_EDITING ? (
    <Button
      className="flex items-center justify-between gap-2 text-nowrap"
      onClick={onClick}
    >
      <SearchIcon />
      Apply to Search
    </Button>
  ) : null;
}
