"use client";

import { useCallback } from "react";

import { Search } from "@/features/search/types";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import createSearchFilter from "@/features/search/utils/filter/initial";
import Button from "@/ui/button";
import AddIcon from "@/ui/icons/add";
import { Filter } from "../types";
import { toPreset } from "../utils/converter/preset";

export default function AddPreset() {
  const dispatch = useSearchFilterDispatcher({ store: Filter.Store.PERSIST });

  const onClick = useCallback(
    () =>
      dispatch(
        toPreset<Search.Filter.Type>({
          data: createSearchFilter({ tags: {}, name: "Unnamed Preset" }),
        }),
      ),
    [dispatch],
  );

  return (
    <Button
      onClick={onClick}
      ui_size="small"
      ui_variant="light"
      className="flex items-center gap-4 text-nowrap"
    >
      <AddIcon /> <span>New...</span>
    </Button>
  );
}
