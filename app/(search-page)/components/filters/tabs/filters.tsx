"use client";

import { useCallback } from "react";

import Settings from "@/ui/settings";
import useGroupContainerID from "@/ui/settings/hooks/use-group-container-id";
import useDefaultSearchFilter from "@/features/search/hooks/filter/use-default-search-filter";
import useFiltersOf from "@/features/filter/hooks/use-filters-of";
import { Tooltip, TooltipProvider } from "@/ui/tooltip";
import Button from "@/ui/button";
import CloseIcon from "@/ui/icons/close";
import { producer } from "@/features/search/utils/filter/flow";
import useFilters from "@/features/filter/hooks/use-filters";
import useTabDirection from "@/ui/settings/hooks/use-tab-direction";
import { Search } from "@/features/search/types";
import AddIcon from "@/ui/icons/add";
import { createPresetSearchFilter } from "@/features/search/utils/filter/creator";
import FilterSettingsTab from "@/features/search/components/filter/filter-settings-tab";
import useQuerySearchFilter from "@/features/search/hooks/filter/use-query-search-filter";
import SearchIcon from "@/ui/icons/search";

function FilterTab({ defaultFilter }: { defaultFilter: Search.Filter.Scheme }) {
  const { request } = useTabDirection();
  const { dispatch, filters, removeAll } = useFiltersOf("search-preset");

  const onCreatePreset = useCallback(() => {
    const newFilter = createPresetSearchFilter();
    dispatch(newFilter);
    request("SearchFilter", newFilter.id);
  }, [dispatch, request]);

  const onRemoveAllPreset = useCallback(() => {
    removeAll();
    request("SearchFilter", defaultFilter.id);
  }, [removeAll, request, defaultFilter.id]);

  return (
    <>
      <div className="text-label-small">FILTERS</div>
      {filters.length > 0 ? (
        <div className="grid grid-cols-2 gap-2">
          <Button
            ui_size="small"
            ui_variant="light"
            className="flex items-center justify-evenly gap-2 px-3 text-label-large"
            onClick={onCreatePreset}
          >
            <AddIcon />
            <span>Create</span>
          </Button>
          <Button
            ui_size="small"
            ui_color="secondary"
            ui_variant="light"
            className="flex items-center justify-evenly gap-2 px-3 text-label-large"
            onClick={onRemoveAllPreset}
          >
            <CloseIcon />
            <span>Remove All</span>
          </Button>
        </div>
      ) : (
        <Button
          ui_variant="bordered"
          ui_size="small"
          className="flex items-center justify-center gap-2"
          onClick={onCreatePreset}
        >
          <AddIcon />
          <span>Create New Preset...</span>
        </Button>
      )}
    </>
  );
}

function DefaultFilterOptions({
  defaultFilter,
}: {
  defaultFilter: Search.Filter.Default;
}) {
  const { request } = useTabDirection();
  const { id, dispatch: dispatchQuery } = useQuerySearchFilter();

  const onApplyToSearch = useCallback(() => {
    dispatchQuery(
      producer["search-default"]["search-query"](id, defaultFilter),
    );
    request("SearchFilter", id);
  }, [dispatchQuery, request, defaultFilter, id]);

  return (
    <TooltipProvider>
      <Tooltip title="Apply">
        <Button
          ui_size="small"
          ui_variant="light"
          className="h-full"
          onClick={onApplyToSearch}
        >
          <SearchIcon />
        </Button>
      </Tooltip>
    </TooltipProvider>
  );
}

function PresetFilterOptions({ preset }: { preset: Search.Filter.Preset }) {
  const { request } = useTabDirection();
  const { remove } = useFilters();
  const { id, dispatch: dispatchQuery } = useQuerySearchFilter();

  const onApplyToSearch = useCallback(() => {
    dispatchQuery(producer["search-preset"]["search-query"](id, preset));
    request("SearchFilter", id);
  }, [dispatchQuery, request, preset, id]);

  const onRemovePreset = useCallback(() => {
    remove(preset.id);
    request("SearchFilter", id);
  }, [remove, preset, request, id]);

  return (
    <TooltipProvider>
      <div className="flex items-center">
        <Tooltip title="Apply">
          <Button
            ui_size="small"
            ui_variant="light"
            className="rounded-r-0 p-2"
            onClick={onApplyToSearch}
          >
            <SearchIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Remove">
          <Button
            ui_size="small"
            ui_variant="light"
            ui_color="tertiary"
            className="rounded-l-0 p-2"
            onClick={onRemovePreset}
          >
            <CloseIcon />
          </Button>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export default function FiltersTab() {
  const filtersGroup = useGroupContainerID("Filters");

  const { filter } = useDefaultSearchFilter();
  const { filters } = useFiltersOf("search-preset");

  return (
    <Settings.Group.Root id={filtersGroup}>
      <Settings.Group.Title className="mb-2 mt-6 flex flex-col gap-3">
        <FilterTab defaultFilter={filter} />
      </Settings.Group.Title>
      <FilterSettingsTab
        filter={filter}
        fixedTitle={`(Default) ${filter.name}`}
        tabOption={<DefaultFilterOptions defaultFilter={filter} />}
      />
      {filters.map((preset) => (
        <FilterSettingsTab
          key={preset.id}
          filter={preset}
          tabOption={<PresetFilterOptions preset={preset} />}
        />
      ))}
    </Settings.Group.Root>
  );
}
