"use client";

import { useCallback } from "react";
import { produce } from "immer";

import { FilterStore } from "@/features/filter/types/store";
import Button from "@/ui/button";
import AddIcon from "@/ui/icons/add";
import useSearchQueryFilter from "@/features/search/hooks/filter/use-search-query-filter";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import { unmarkSearchQueryFilter } from "@/features/search/utils/filter/search-query";
import { generateFilterDataID } from "@/features/filter/utils/id";
import { Search } from "@/features/search/types";
import { markSearchFilterPreset } from "@/features/search/utils/filter/preset";

export default function AddToPresetsOption() {
  const dispatch = useSearchFilterDispatcher({ store: FilterStore.PERSIST });
  const query = useSearchQueryFilter();

  const addToPresets = useCallback(() => {
    if (!query?.filter)
      throw new Error("Error from AddToPresets: Target filter is not found");

    const filter = markSearchFilterPreset(
      unmarkSearchQueryFilter(query.filter),
    );

    dispatch(
      produce(filter, (draft) => {
        draft.name = "Preset From Search Query";
        draft.dataID = generateFilterDataID(Search.Type);
      }),
    );
  }, [dispatch, query?.filter]);

  return query?.filter ? (
    <Button
      ui_size="small"
      ui_color="tertiary"
      ui_variant="bordered"
      className="flex items-center gap-2 text-nowrap text-label-large"
      onClick={addToPresets}
    >
      <AddIcon />
      Preset
    </Button>
  ) : null;
}
