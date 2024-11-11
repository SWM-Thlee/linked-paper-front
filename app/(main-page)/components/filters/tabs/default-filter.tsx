"use client";

import { useCallback } from "react";

import useTabDirection from "@/ui/settings/hooks/use-tab-direction";
import useGroupContainerID from "@/ui/settings/hooks/use-group-container-id";
import useDefaultSearchFilter from "@/features/search/hooks/filter/use-default-search-filter";
import useFilters from "@/features/filter/hooks/use-filters";
import { createDefaultSearchFilter } from "@/features/search/utils/filter/creator";
import { Search } from "@/features/search/types";
import { Tooltip, TooltipProvider } from "@/ui/tooltip";
import Button from "@/ui/button";
import CloseIcon from "@/ui/icons/close";
import Settings from "@/ui/settings";
import FilterSettingsTab from "@/features/search/components/filter/filter-settings-tab";

function DefaultFilterOptions({ filter }: { filter: Search.Filter.Default }) {
  const { request } = useTabDirection();
  const { remove, dispatch } = useFilters();

  const onRemove = useCallback(() => {
    const newFilter = createDefaultSearchFilter();

    remove(filter.id);
    dispatch(newFilter);
    request("SearchFilter", newFilter.id);
  }, [remove, filter, dispatch, request]);

  return (
    <TooltipProvider>
      <Tooltip title="Remove Default Filter">
        <Button
          ui_size="small"
          ui_variant="light"
          ui_color="tertiary"
          className="p-2"
          onClick={onRemove}
        >
          <CloseIcon />
        </Button>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function DefaultFilterTab() {
  const defaultFilterGroup = useGroupContainerID("DefaultSearchFilter");
  const { filter } = useDefaultSearchFilter();

  return (
    <Settings.Group.Root id={defaultFilterGroup}>
      <Settings.Group.Title>
        <div className="text-label-small">CURRENT FILTER</div>
      </Settings.Group.Title>
      <FilterSettingsTab
        filter={filter}
        defaultTab
        tabOption={<DefaultFilterOptions filter={filter} />}
      />
    </Settings.Group.Root>
  );
}
