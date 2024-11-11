"use client";

import useGroupContainerID from "@/ui/settings/hooks/use-group-container-id";
import Settings from "@/ui/settings";
import FilterSettingsTab from "@/features/search/components/filter/filter-settings-tab";
import useQuerySearchFilter from "@/features/search/hooks/filter/use-query-search-filter";

export default function QueryFilterTab() {
  const queryFilterGroup = useGroupContainerID("SearchQuery");
  const { filter } = useQuerySearchFilter();

  return (
    <Settings.Group.Root id={queryFilterGroup}>
      <Settings.Group.Title>
        <div className="text-label-small">CURRENT FILTER</div>
      </Settings.Group.Title>
      {filter && (
        <FilterSettingsTab
          filter={filter}
          defaultTab
          fixedTitle="Search Query"
        />
      )}
    </Settings.Group.Root>
  );
}
