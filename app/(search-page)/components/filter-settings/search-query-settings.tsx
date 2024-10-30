"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { produce } from "immer";
import isEqual from "react-fast-compare";

import { Settings } from "@/ui/settings";
import useTabID from "@/ui/settings/hooks/use-tab-id";
import SearchIcon from "@/ui/icons/search";
import SearchField from "@/ui/search-field";
import useSearchFilters from "@/features/search/hooks/filter/use-search-filters";
import useSearchQueryFilter from "@/features/search/hooks/query/use-search-query-filter";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import { Analytics } from "@/features/analytics/types";
import { Filter } from "@/features/filter/types";
import { Search } from "@/features/search/types";
import AddPreset from "@/features/filter/components/add-preset";
import RemoveAll from "@/features/filter/components/remove-all";
import { matcher } from "@/features/search/utils/matcher";
import { DefaultSearchQueryFilterInfo } from "@/features/search/components/filter-info/default-query-info";
import { SearchQueryFilterInfo } from "@/features/search/components/filter-info/query-info";
import Button from "@/ui/button";
import InfoIcon from "@/ui/icons/info";
import { toDefault } from "@/features/filter/utils/converter/default";
import { toPreset } from "@/features/filter/utils/converter/preset";
import { revertQuery } from "@/features/filter/utils/converter/query";
import { RawSearchFilterInfo } from "@/features/search/components/filter-info/raw-info";
import { searchFilterForAnalytics } from "@/features/analytics/utils/filter";
import PresetFilterNotFound from "./preset-filter-not-found";
import { SearchQueryPresetFilterInfo } from "../filter-info/search-query-preset-info";

// Case 1. Search Filter != Default Filter (X): Default Filter로 설정(Convert) 여부 추가
// Case 2. Search Filter != Default Filter (O): Mismatch 알림, Merge 여부 추가
// Case 3. Search Filter == Default Filter (O): Default Filter만 표시
export default function SearchQuery() {
  /* Analytics */
  const { log } = useAnalytics();

  /* Tab */
  const tabID = useTabID(Search.Settings.SEARCH_QUERY.ID);

  /* Search Query Filter */
  const searchQueryFilter = useSearchQueryFilter();

  /* Default Filter */
  const { filter: defaultFilter } = useSearchFilters({
    store: Filter.Store.PERSIST,
    track: { tag: [Filter.Identify.Tag.DEFAULT] },
  });

  const { filter: editingDefaultFilter } = useSearchFilters({
    store: Filter.Store.TEMPORARY,
    track: { tag: [Filter.Identify.Tag.DEFAULT, Filter.Identify.Tag.EDIT] },
  });

  const [isDefaultFilterEditing, setDefaultFilterEditing] =
    useState(!!editingDefaultFilter);

  /* Preset Filters */
  const { filters: presetFilters, length: presetSize } = useSearchFilters({
    store: Filter.Store.PERSIST,
    track: { tag: [Filter.Identify.Tag.PRESET, [Filter.Identify.Tag.EDIT]] },
  });

  const hasPreset = presetSize > 0 || !!defaultFilter;

  /* Search Presets */
  const [text, setText] = useState("");

  const search = useMemo(
    () => matcher({ include: [text], ignoreCase: true, ignoreSpace: true }),
    [text],
  );

  /* 생성 날짜가 가까운 Preset부터 위에 위치합니다. */
  const presetSearchResults = useMemo(() => {
    const entries = Object.entries(presetFilters).filter(([, data]) =>
      search(data.name),
    );

    return entries.sort(
      ([, leftData], [, rightData]) =>
        (rightData.tags[Filter.Identify.Tag.PRESET].createdAt as number) -
        (leftData.tags[Filter.Identify.Tag.PRESET].createdAt as number),
    );
  }, [search, presetFilters]);

  /* Default Filter 적용 시 Search Query에도 동일하게 적용합니다. */
  const isFilterMatched = useMemo(
    () => isEqual(searchQueryFilter?.attributes, defaultFilter?.attributes),
    [searchQueryFilter?.attributes, defaultFilter?.attributes],
  );

  const dispatchPersist = useSearchFilterDispatcher({
    store: Filter.Store.PERSIST,
  });

  const dispatchTemporary = useSearchFilterDispatcher({
    store: Filter.Store.TEMPORARY,
  });

  useEffect(() => {
    if (!editingDefaultFilter) return;
    setDefaultFilterEditing(true);
  }, [editingDefaultFilter]);

  useEffect(() => {
    if (
      !isDefaultFilterEditing ||
      editingDefaultFilter ||
      isFilterMatched ||
      !searchQueryFilter ||
      !defaultFilter
    )
      return;

    const newSearchQueryFilter = produce(searchQueryFilter, (draft) => {
      draft.attributes = defaultFilter.attributes;
    });

    log(
      Analytics.Event.FILTER_APPLY,
      searchFilterForAnalytics(newSearchQueryFilter),
    );
    dispatchTemporary(newSearchQueryFilter);

    setDefaultFilterEditing(false);
  }, [
    log,
    isFilterMatched,
    isDefaultFilterEditing,
    editingDefaultFilter,
    defaultFilter,
    dispatchTemporary,
    searchQueryFilter,
  ]);

  /* Search Query와 Default Filter가 일치하지 않을 시 어떤 쪽을 선택할 지 결정합니다. */
  const setQueryToDefault = useCallback(() => {
    if (!searchQueryFilter || !defaultFilter) return;

    const filter = toDefault<Search.Filter.Type>({
      data: toPreset<Search.Filter.Type>({
        data: revertQuery<Search.Filter.Type>({ data: searchQueryFilter }),
      }),
    });

    dispatchPersist(
      produce(filter, (draft) => {
        // Default Name
        draft.name = "Preset From Search Query";
      }),
    );

    dispatchPersist(toPreset<Search.Filter.Type>({ data: defaultFilter }));
  }, [dispatchPersist, searchQueryFilter, defaultFilter]);

  const setDefaultToQuery = useCallback(() => {
    if (!searchQueryFilter || !defaultFilter) return;

    dispatchTemporary(
      produce(searchQueryFilter, (draft) => {
        draft.attributes = defaultFilter.attributes;
      }),
    );
  }, [defaultFilter, dispatchTemporary, searchQueryFilter]);

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
          <div className="flex flex-col gap-4">
            {/* Case 1 */}
            {!isFilterMatched && !defaultFilter && searchQueryFilter && (
              <SearchQueryFilterInfo
                store={Filter.Store.TEMPORARY}
                data={searchQueryFilter}
              />
            )}
            {/* Case 2 */}
            {!isFilterMatched && defaultFilter && searchQueryFilter && (
              <>
                <div className="flex flex-col gap-6 rounded-4 bg-light-tertiaryContainer p-6 text-body-large text-light-onTertiaryContainer dark:bg-dark-tertiaryContainer dark:text-dark-onTertiaryContainer">
                  <InfoIcon ui_size="large" />
                  <div className="text-title-large">
                    Search Query and Default Filter does not match.
                  </div>
                  <div>You can choose the filter you use on search.</div>
                  <div className="flex flex-col gap-2">
                    <Button ui_color="tertiary" onClick={setQueryToDefault}>
                      Set Search Query to Default Filter
                    </Button>
                    <Button ui_color="tertiary" onClick={setDefaultToQuery}>
                      Set Default Filter to Query
                    </Button>
                  </div>
                </div>
                <RawSearchFilterInfo
                  store={Filter.Store.TEMPORARY}
                  data={searchQueryFilter}
                />
                <RawSearchFilterInfo
                  store={Filter.Store.PERSIST}
                  data={defaultFilter}
                />
              </>
            )}
            {/* Case 3 */}
            {isFilterMatched && defaultFilter && (
              <div className="animate-fadeIn">
                <DefaultSearchQueryFilterInfo
                  data={defaultFilter}
                  store={Filter.Store.PERSIST}
                />
              </div>
            )}
          </div>
          {/* Case 1, 3의 경우에만 Preset 목록을 보이게 합니다. */}
          {!(!isFilterMatched && defaultFilter && searchQueryFilter) && (
            <div className="flex flex-col gap-8">
              {hasPreset ? (
                <>
                  <div className="flex items-center justify-between gap-6">
                    <div className="select-none text-title-large">Presets</div>
                    <div className="flex items-center gap-2">
                      <AddPreset />
                      <RemoveAll />
                    </div>
                  </div>
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
                      {presetSearchResults.map(([dataID, data]) => (
                        <div key={dataID} className="animate-fadeIn">
                          <SearchQueryPresetFilterInfo
                            store={Filter.Store.PERSIST}
                            data={data}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <PresetFilterNotFound />
              )}
            </div>
          )}
        </div>
      </Settings.Tab.Content>
    </Settings.Tab.Root>
  );
}
