"use client";

import { useCallback, useMemo } from "react";

import { Settings } from "@/ui/settings";
import useTabID from "@/ui/settings/hooks/use-tab-id";
import SearchIcon from "@/ui/icons/search";
import useSearchFilters from "@/features/search/hooks/filter/use-search-filters";
import { TAG_EDITOR } from "@/features/filter/utils/editor";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import createSearchFilter from "@/features/search/utils/filter/initial";
import Button from "@/ui/button";
import AddIcon from "@/ui/icons/add";
import DeleteIcon from "@/ui/icons/delete";
import { FilterStore } from "@/features/filter/types/store";
import useSearchQueryFilter from "@/features/search/hooks/filter/use-search-query-filter";
import {
  markSearchFilterPreset,
  TAG_SEARCH_FILTER_PRESET,
} from "@/features/search/utils/filter/preset";
import { TAB_SEARCH_QUERY } from "@/features/search/types/tab";
import { SearchFilterPresetInfo, SearchQueryFilterInfo } from "../info";

function AddPresetButton() {
  const dispatch = useSearchFilterDispatcher({ store: FilterStore.PERSIST });

  const onClick = useCallback(() => {
    dispatch(
      markSearchFilterPreset(
        createSearchFilter({ tags: {}, name: "Unnamed Preset" }),
      ),
    );
  }, [dispatch]);

  return (
    <Button
      onClick={onClick}
      ui_size="small"
      ui_variant="light"
      className="flex items-center gap-4 text-nowrap"
    >
      <AddIcon /> New...
    </Button>
  );
}

function RemoveAllButton() {
  // Persist Store에 저장된 Preset
  const { reset: removeInPersistentStore } = useSearchFilters({
    store: FilterStore.PERSIST,
    track: { tag: [TAG_SEARCH_FILTER_PRESET] },
  });

  // Temporary Store에 저장된 Preset
  const { reset: removeInTemporaryStore } = useSearchFilters({
    store: FilterStore.TEMPORARY,
    track: { tag: [TAG_SEARCH_FILTER_PRESET] },
  });

  const removeAll = useCallback(() => {
    removeInPersistentStore();
    removeInTemporaryStore();
  }, [removeInPersistentStore, removeInTemporaryStore]);

  return (
    <Button
      onClick={removeAll}
      ui_color="tertiary"
      ui_size="small"
      ui_variant="light"
      className="flex items-center gap-4 text-nowrap"
    >
      <DeleteIcon /> Remove All
    </Button>
  );
}

function SearchFilterPresets() {
  const { filters } = useSearchFilters({
    store: FilterStore.PERSIST,
    track: { tag: [TAG_SEARCH_FILTER_PRESET, [TAG_EDITOR]] },
  });

  // 생성 날짜가 가까운 Preset부터 위에 위치합니다.
  const sorted = useMemo(
    () =>
      Object.entries(filters).toSorted(
        ([, leftData], [, rightData]) =>
          (rightData.tags[TAG_SEARCH_FILTER_PRESET].createdAt as number) -
          (leftData.tags[TAG_SEARCH_FILTER_PRESET].createdAt as number),
      ),
    [filters],
  );

  return (
    <div className="flex flex-col gap-8">
      {sorted.map(([dataID, data]) => (
        <div key={dataID} className="animate-fadeIn">
          <SearchFilterPresetInfo store={FilterStore.PERSIST} data={data} />
        </div>
      ))}
    </div>
  );
}

export default function SearchQuery() {
  const tabID = useTabID(TAB_SEARCH_QUERY.ID);
  const query = useSearchQueryFilter();

  return (
    <Settings.Tab.Root
      name={TAB_SEARCH_QUERY.ID}
      id={tabID}
      title={TAB_SEARCH_QUERY.TITLE}
      description={TAB_SEARCH_QUERY.DESCRIPTION}
      defaultTab
    >
      <Settings.Tab.Title>
        <div className="flex items-center gap-4">
          <SearchIcon ui_size="small" /> {TAB_SEARCH_QUERY.TITLE}
        </div>
      </Settings.Tab.Title>
      <Settings.Tab.Content>
        <div className="mt-8 flex flex-col gap-16">
          {query?.filter ? (
            <SearchQueryFilterInfo
              store={FilterStore.TEMPORARY}
              description="This filter was taken from a search query and has not been saved to the client."
              data={query.filter}
            />
          ) : (
            <div>Loading Search Filters...</div>
          )}
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-6">
              <div className="text-title-large">Presets</div>
              <div className="flex gap-2">
                <AddPresetButton />
                <RemoveAllButton />
              </div>
            </div>
            <SearchFilterPresets />
          </div>
        </div>
      </Settings.Tab.Content>
    </Settings.Tab.Root>
  );
}
