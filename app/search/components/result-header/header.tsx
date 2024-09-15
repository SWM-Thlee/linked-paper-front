"use client";

import { useState } from "react";

import useSearchInfoFromQuery from "@/features/search/hooks/query/use-search-info-from-query";
import { CategoryChip } from "@/features/search/components/filter-info/filter-chip/category";
import { JournalChip } from "@/features/search/components/filter-info/filter-chip/journal";
import { DateChip } from "@/features/search/components/filter-info/filter-chip/date";
import useSearchQueryFilter from "@/features/search/hooks/filter/use-search-query-filter";
import SearchField from "@/ui/search";
import LabelButton from "@/ui/label-button";
import FilterIcon from "@/ui/icons/filter";
import useIsClient from "@/hooks/use-is-client";
import { FilterData } from "@/features/filter/types/filter";
import { Search } from "@/features/search/types";
import { FilterSettings } from "../filter-settings";
import SearchSorting from "./sorting";

function Attributes({
  attributes: { category, journal, date },
}: {
  attributes: FilterData<Search.Type>["attributes"];
}) {
  const isCategorySelected = Object.keys(category.value ?? {}).length > 0;
  const isJournalSelected = Object.keys(journal.value ?? {}).length > 0;
  const isDateSelected = date.value?.min || date.value?.max;

  return (
    <>
      {isCategorySelected && <CategoryChip data={category} />}
      {isJournalSelected && <JournalChip data={journal} />}
      {isDateSelected && <DateChip data={date} />}
    </>
  );
}

function FilterChips() {
  const query = useSearchQueryFilter();
  const isClient = useIsClient();

  if (!isClient)
    return (
      <div className="flex items-center gap-4">
        <LabelButton
          ui_color="secondary"
          ui_variant="light"
          ui_size="medium"
          className="animate-pulse"
        >
          <FilterIcon ui_size="small" /> Loading Filters...
        </LabelButton>
      </div>
    );

  return (
    <div className="flex items-center gap-2">
      {query?.filter && <Attributes attributes={query.filter.attributes} />}
      <FilterSettings>
        <LabelButton
          ui_color="secondary"
          ui_variant="bordered"
          ui_size="medium"
        >
          <FilterIcon ui_size="small" /> Configure Filter...
        </LabelButton>
      </FilterSettings>
    </div>
  );
}

export default function SearchResultHeader() {
  const { info } = useSearchInfoFromQuery();
  const [text, setText] = useState(info.query);

  return (
    <div className="flex flex-col gap-8 rounded-t-6 bg-light-surfaceBright/15 p-8 dark:bg-dark-surfaceBright/15">
      <FilterChips />
      <SearchField value={text} onChange={(e) => setText(e.target.value)} />
      <div className="flex items-center justify-between">
        <LabelButton>Result Size: 20</LabelButton>
        <SearchSorting />
      </div>
    </div>
  );
}
