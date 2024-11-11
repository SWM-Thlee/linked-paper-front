"use client";

import { useCallback } from "react";

import Settings from "@/ui/settings";
import useGroupContainerID from "@/ui/settings/hooks/use-group-container-id";
import useDefaultSearchFilter from "@/features/search/hooks/filter/use-default-search-filter";
import useFiltersOf from "@/features/filter/hooks/use-filters-of";
import { Tooltip, TooltipProvider } from "@/ui/tooltip";
import Button from "@/ui/button";
import CloseIcon from "@/ui/icons/close";
import CheckIcon from "@/ui/icons/check";
import { converter } from "@/features/search/utils/filter/flow";
import useFilters from "@/features/filter/hooks/use-filters";
import useTabDirection from "@/ui/settings/hooks/use-tab-direction";
import { Search } from "@/features/search/types";
import AddIcon from "@/ui/icons/add";
import { createPresetSearchFilter } from "@/features/search/utils/filter/creator";
import FilterSettingsTab from "@/features/search/components/filter/filter-settings-tab";

function PresetFilterTab({
  defaultFilter,
}: {
  defaultFilter: Search.Filter.Scheme;
}) {
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
      <div className="text-label-small">PRESET FILTERS</div>
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

function PresetFilterOptions({
  preset,
  defaultFilter,
}: {
  preset: Search.Filter.Preset;
  defaultFilter: Search.Filter.Default;
}) {
  const { request } = useTabDirection();
  const { remove, dispatch } = useFilters();

  const onApplyDefault = useCallback(() => {
    dispatch(converter["search-default"]["search-preset"](defaultFilter));
    dispatch(converter["search-preset"]["search-default"](preset));

    request("SearchFilter", preset.id);
  }, [dispatch, request, preset, defaultFilter]);

  const onRemovePreset = useCallback(() => {
    remove(preset.id);
    request("SearchFilter", defaultFilter.id);
  }, [remove, preset, request, defaultFilter.id]);

  return (
    <TooltipProvider>
      <div className="flex items-center">
        <Tooltip title="Apply">
          <Button
            ui_size="small"
            ui_variant="light"
            className="rounded-r-0 p-2"
            onClick={onApplyDefault}
          >
            <CheckIcon />
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

export default function PresetFiltersTab() {
  const presetFilterGroup = useGroupContainerID("PresetFilters");

  const { filter } = useDefaultSearchFilter();
  const { filters } = useFiltersOf("search-preset");

  return (
    <Settings.Group.Root id={presetFilterGroup}>
      <Settings.Group.Title className="mb-2 mt-6 flex flex-col gap-3">
        <PresetFilterTab defaultFilter={filter} />
      </Settings.Group.Title>
      {filters.map((preset) => (
        <FilterSettingsTab
          key={preset.id}
          filter={preset}
          tabOption={
            <PresetFilterOptions preset={preset} defaultFilter={filter} />
          }
        />
      ))}
    </Settings.Group.Root>
  );
}
