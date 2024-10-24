"use client";

import { useMemo, useState } from "react";

import { Filter } from "@/features/filter/types";
import { Search } from "@/features/search/types";
import { DefaultSearchFilterInfo } from "@/features/search/components/filter-info/default-info";
import { DefaultPresetSearchFilterInfo } from "@/features/search/components/filter-info/default-preset-info";
import useTabID from "@/ui/settings/hooks/use-tab-id";
import useSearchFilters from "@/features/search/hooks/filter/use-search-filters";
import FilterIcon from "@/ui/icons/filter";
import { Settings } from "@/ui/settings";
import SearchField from "@/ui/search-field";
import { matcher } from "@/features/search/utils/matcher";
import AddPreset from "@/features/filter/components/add-preset";
import RemoveAll from "@/features/filter/components/remove-all";
import DefaultFilterNotFound from "@/app/(scrollable-layout)/search/components/filter-settings/default-filter-not-found";
import PresetFilterNotFound from "@/app/(scrollable-layout)/search/components/filter-settings/preset-filter-not-found";

export default function DefaultSearchFilter() {
  /* Tab */
  const tabID = useTabID(Search.Settings.DEFAULT_SEARCH_FILTER.ID);

  /* Default Filter */
  const { filter } = useSearchFilters({
    store: Filter.Store.PERSIST,
    track: { tag: [Filter.Identify.Tag.DEFAULT] },
  });

  /* Presets */
  const { filters, length } = useSearchFilters({
    store: Filter.Store.PERSIST,
    track: { tag: [Filter.Identify.Tag.PRESET, [Filter.Identify.Tag.EDIT]] },
  });

  const hasFilter = length > 0 || !!filter;

  /* Search Presets */
  const [text, setText] = useState("");

  const search = useMemo(
    () => matcher({ include: [text], ignoreCase: true, ignoreSpace: true }),
    [text],
  );

  /* 생성 날짜가 가까운 Preset부터 위에 위치합니다. */
  const presets = useMemo(
    () =>
      Object.entries(filters)
        .filter(([, data]) => search(data.name))
        .toSorted(
          ([, leftData], [, rightData]) =>
            (rightData.tags[Filter.Identify.Tag.PRESET].createdAt as number) -
            (leftData.tags[Filter.Identify.Tag.PRESET].createdAt as number),
        ),
    [search, filters],
  );

  return (
    <Settings.Tab.Root
      name={Search.Settings.DEFAULT_SEARCH_FILTER.ID}
      id={tabID}
      title={Search.Settings.DEFAULT_SEARCH_FILTER.TITLE}
      description={Search.Settings.DEFAULT_SEARCH_FILTER.DESCRIPTION}
      defaultTab
    >
      <Settings.Tab.Title>
        <div className="flex items-center gap-4">
          <FilterIcon ui_size="small" />{" "}
          {Search.Settings.DEFAULT_SEARCH_FILTER.TITLE}
        </div>
      </Settings.Tab.Title>
      <Settings.Tab.Content>
        <div className="mt-8 flex flex-col gap-16">
          {hasFilter && (
            <div className="animate-fadeIn">
              {filter ? (
                <DefaultSearchFilterInfo
                  data={filter}
                  store={Filter.Store.PERSIST}
                />
              ) : (
                <DefaultFilterNotFound />
              )}
            </div>
          )}
          <div className="flex flex-col gap-8">
            {hasFilter && (
              <div className="flex items-center justify-between gap-6">
                <div className="select-none text-title-large">Presets</div>
                <div className="flex items-center gap-2">
                  <AddPreset />
                  <RemoveAll />
                </div>
              </div>
            )}
            {hasFilter ? (
              <div className="flex flex-col gap-4">
                <SearchField
                  ui_color="tertiary"
                  ui_size="medium"
                  disableSubmit
                  defaultPlaceholder="find presets by name."
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
                <div className="flex flex-col gap-8">
                  {presets.map(([dataID, data]) => (
                    <div key={dataID} className="animate-fadeIn">
                      <DefaultPresetSearchFilterInfo
                        store={Filter.Store.PERSIST}
                        data={data}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <PresetFilterNotFound />
            )}
          </div>
        </div>
      </Settings.Tab.Content>
    </Settings.Tab.Root>
  );
}
