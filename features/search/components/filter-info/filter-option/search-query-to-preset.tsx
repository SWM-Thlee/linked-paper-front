"use client";

import { useCallback } from "react";
import { produce } from "immer";

import { FilterStore } from "@/features/filter/types/store";
import Button from "@/ui/button";
import AddIcon from "@/ui/icons/add";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import { Search } from "@/features/search/types";
import { revertQuery } from "@/features/filter/utils/converter/query";
import { toPreset } from "@/features/filter/utils/converter/preset";
import useSearchQueryFilter from "@/features/search/hooks/query/use-search-query-filter";

export function SearchQueryToPresetOption() {
  // Preset은 Persistent Store에 저장되어야 합니다.
  const dispatch = useSearchFilterDispatcher({ store: FilterStore.PERSIST });

  // Search Query Filter는 "/search" Page 내에서만 존재합니다.
  const query = useSearchQueryFilter();

  const onClick = useCallback(() => {
    if (!query)
      throw new Error(
        "Error from Converting Search Query To Preset: Target filter is not found",
      );

    // Convert Query to Preset
    const filter = toPreset<Search.Type>({
      data: revertQuery<Search.Type>({ data: query }),
    });

    dispatch(
      produce(filter, (draft) => {
        // Default Name
        draft.name = "Preset From Search Query";
      }),
    );
  }, [dispatch, query]);

  return query ? (
    <Button
      ui_color="tertiary"
      className="flex items-center justify-between gap-2 text-nowrap"
      onClick={onClick}
    >
      <AddIcon />
      Add Query to Preset
    </Button>
  ) : null;
}
