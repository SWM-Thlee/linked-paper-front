"use client";

import { useCallback } from "react";
import { produce } from "immer";

import { FilterStore } from "@/features/filter/types/store";
import Button from "@/ui/button";
import AddIcon from "@/ui/icons/add";
import useSearchQueryFilter from "@/features/search/hooks/filter/use-search-query-filter";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import { Search } from "@/features/search/types";
import { revertQuery } from "@/features/filter/utils/converter/query";
import { toPreset } from "@/features/filter/utils/converter/preset";

export default function AddToPresetsOption() {
  const dispatch = useSearchFilterDispatcher({ store: FilterStore.PERSIST });
  const query = useSearchQueryFilter();

  const addToPresets = useCallback(() => {
    if (!query?.filter)
      throw new Error("Error from AddToPresets: Target filter is not found");

    const filter = toPreset<Search.Type>({
      data: revertQuery<Search.Type>({ data: query.filter }),
    });

    dispatch(
      produce(filter, (draft) => {
        draft.name = "Preset From Search Query";
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
