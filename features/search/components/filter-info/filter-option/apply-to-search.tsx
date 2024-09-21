"use client";

import { useCallback } from "react";
import { produce } from "immer";

import { Search } from "@/features/search/types";
import { Filter } from "@/features/filter/types";
import Button from "@/ui/button";
import SearchIcon from "@/ui/icons/search";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import useSearchFilters from "@/features/search/hooks/filter/use-search-filters";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import useSearchQueryFilter from "@/features/search/hooks/query/use-search-query-filter";

type Props = {
  dataID: Search.Filter.DataID;
  store: Filter.Store.Type;
};

export default function ApplyToSearchOption({ dataID, store }: Props) {
  const { filter, status } = useSearchFilterEditor({
    store,
    dataID,
  });

  const { filter: searchQueryEditor } = useSearchFilters({
    store: Filter.Store.TEMPORARY,
    track: { tag: [Filter.Identify.Tag.QUERY, Filter.Identify.Tag.EDIT] },
  });

  const query = useSearchQueryFilter();
  const dispatch = useSearchFilterDispatcher({
    store: Filter.Store.TEMPORARY,
  });

  const onClick = useCallback(() => {
    if (!(filter && query)) return;

    dispatch(
      produce(query, (draft) => {
        draft.attributes = filter.attributes;
      }),
    );
  }, [dispatch, filter, query]);

  return !searchQueryEditor && status === Search.Edit.Status.NOT_EDITING ? (
    <Button
      className="flex items-center justify-between gap-2 text-nowrap"
      onClick={onClick}
    >
      <SearchIcon />
      Apply to Search
    </Button>
  ) : null;
}
