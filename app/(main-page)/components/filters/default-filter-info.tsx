"use client";

import useIsClient from "@/hooks/use-is-client";
import FilterIcon from "@/ui/icons/filter";
import LabelButton from "@/ui/label-button";

import CategoryChip from "@/features/search/components/chip/category";
import JournalChip from "@/features/search/components/chip/journal";
import DateChip from "@/features/search/components/chip/date";

import { Search } from "@/features/search/types";
import useDefaultSearchFilter from "@/features/search/hooks/filter/use-default-search-filter";
import FilterSettings from "./filter-settings";

function Attributes({
  attributes: { category, journal, date },
}: {
  attributes: Search.Filter.Attributes;
}) {
  const hasCategory = category.length > 0;
  const hasJournal = journal.length > 0;
  const hasDate = date.min || date.max;

  return (
    <>
      {hasCategory && <CategoryChip value={category} />}
      {hasJournal && <JournalChip value={journal} />}
      {hasDate && <DateChip value={date} />}
    </>
  );
}

export default function DefaultFilterInfo() {
  const isClient = useIsClient();
  const { filter } = useDefaultSearchFilter();

  // Filter 정보는 Client에 존재하므로, Server 단에서는 Fallback을 띄운다.
  if (!isClient)
    return (
      <div className="flex items-center gap-4">
        <LabelButton
          ui_color="secondary"
          ui_variant="light"
          ui_size="small"
          className="animate-pulse"
        >
          <FilterIcon ui_size="small" /> <span>Loading Filters...</span>
        </LabelButton>
      </div>
    );

  return (
    <div className="flex animate-fadeIn flex-wrap items-center gap-4">
      <Attributes attributes={filter.attributes} />
      <FilterSettings>
        <LabelButton ui_color="secondary" ui_size="small">
          <FilterIcon ui_size="small" /> <span>Configure Filter...</span>
        </LabelButton>
      </FilterSettings>
    </div>
  );
}
