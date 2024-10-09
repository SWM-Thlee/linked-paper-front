"use client";

import { useCallback, useMemo } from "react";

import { Settings } from "@/ui/settings";
import useTabID from "@/ui/settings/hooks/use-tab-id";
import SearchIcon from "@/ui/icons/search";
import useSearchFilters from "@/features/search/hooks/filter/use-search-filters";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import createSearchFilter from "@/features/search/utils/filter/initial";
import Button from "@/ui/button";
import AddIcon from "@/ui/icons/add";
import DeleteIcon from "@/ui/icons/delete";
import TipIcon from "@/ui/icons/tip";
import { toPreset } from "@/features/filter/utils/converter/preset";
import { Filter } from "@/features/filter/types";
import { Search } from "@/features/search/types";
import useSearchQueryFilter from "@/features/search/hooks/query/use-search-query-filter";
import { SearchQueryPresetFilterInfo } from "../filter-info/search-query-preset-info";
import { SearchQueryFilterInfo } from "../filter-info/search-query-info";
import { SearchQueryDefaultFilterInfo } from "../filter-info/search-query-default-info";

function AddPresetButton() {
  const dispatch = useSearchFilterDispatcher({ store: Filter.Store.PERSIST });

  const onClick = useCallback(() => {
    dispatch(
      toPreset<Search.Filter.Type>({
        data: createSearchFilter({ tags: {}, name: "Unnamed Preset" }),
      }),
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
    store: Filter.Store.PERSIST,
    track: { tag: [Filter.Identify.Tag.PRESET] },
  });

  // Temporary Store에 저장된 Preset
  const { reset: removeInTemporaryStore } = useSearchFilters({
    store: Filter.Store.TEMPORARY,
    track: { tag: [Filter.Identify.Tag.PRESET] },
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
    store: Filter.Store.PERSIST,
    track: { tag: [Filter.Identify.Tag.PRESET, [Filter.Identify.Tag.EDIT]] },
  });

  // 생성 날짜가 가까운 Preset부터 위에 위치합니다.
  const sorted = useMemo(
    () =>
      Object.entries(filters).toSorted(
        ([, leftData], [, rightData]) =>
          (rightData.tags[Filter.Identify.Tag.PRESET].createdAt as number) -
          (leftData.tags[Filter.Identify.Tag.PRESET].createdAt as number),
      ),
    [filters],
  );

  return (
    <div className="flex flex-col gap-8">
      {sorted.map(([dataID, data]) => (
        <div key={dataID} className="animate-fadeIn">
          <SearchQueryPresetFilterInfo
            store={Filter.Store.PERSIST}
            data={data}
          />
        </div>
      ))}
    </div>
  );
}

function DefaultFilterNotFound() {
  return (
    <div className="flex flex-col gap-6 rounded-4 p-6 text-body-large ring-2 ring-inset ring-light-outlineVariant dark:ring-dark-outlineVariant">
      <TipIcon ui_size="large" />
      <div className="text-title-large">Default Filter is Not Set</div>
      <p>
        Save time by setting up a Default Filter for faster, more accurate
        search results.
      </p>
    </div>
  );
}

function DefaultFilterSection() {
  const { filter } = useSearchFilters({
    store: Filter.Store.PERSIST,
    track: { tag: [Filter.Identify.Tag.DEFAULT] },
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="text-title-large">Default Filter</div>
      <div className="animate-fadeIn">
        {filter ? (
          <SearchQueryDefaultFilterInfo
            data={filter}
            store={Filter.Store.PERSIST}
          />
        ) : (
          <DefaultFilterNotFound />
        )}
      </div>
    </div>
  );
}

export default function SearchQuery() {
  const tabID = useTabID(Search.Settings.SEARCH_QUERY.ID);
  const filter = useSearchQueryFilter();

  return (
    <Settings.Tab.Root
      name={Search.Settings.SEARCH_QUERY.ID}
      id={tabID}
      title={Search.Settings.SEARCH_QUERY.TITLE}
      description={Search.Settings.SEARCH_QUERY.DESCRIPTION}
      defaultTab
    >
      <Settings.Tab.Title>
        <div className="flex items-center gap-4">
          <SearchIcon ui_size="small" /> {Search.Settings.SEARCH_QUERY.TITLE}
        </div>
      </Settings.Tab.Title>
      <Settings.Tab.Content>
        <div className="mt-8 flex flex-col gap-16">
          {filter && (
            <SearchQueryFilterInfo
              store={Filter.Store.TEMPORARY}
              description="This filter was taken from a search query and has not been saved to the client."
              data={filter}
            />
          )}
          <DefaultFilterSection />
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
