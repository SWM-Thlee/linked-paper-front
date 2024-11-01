"use client";

import { useCallback } from "react";
import { Filter } from "@/features/filter/types";
import { toPreset } from "@/features/filter/utils/converter/preset";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import { Search } from "@/features/search/types";
import createSearchFilter from "@/features/search/utils/filter/initial";
import PresetIcon from "@/ui/icons/preset";
import Button from "@/ui/button";
import AddIcon from "@/ui/icons/add";

export default function PresetFilterNotFound() {
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
    <div className="flex animate-fadeIn flex-col gap-6 py-6 text-body-large">
      <PresetIcon ui_size="large" />
      <div className="text-title-large">
        Don&apos;t set filters every time you search.
      </div>
      <p>Save time by setting up a Preset for faster search experience.</p>
      <Button
        ui_size="large"
        ui_variant="light"
        className="flex items-center justify-center gap-4"
        onClick={onClick}
      >
        <AddIcon />
        Create New Preset
      </Button>
    </div>
  );
}
