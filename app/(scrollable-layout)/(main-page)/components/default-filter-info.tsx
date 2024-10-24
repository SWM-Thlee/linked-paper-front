"use client";

import { useMemo } from "react";

import useSearchFilters from "@/features/search/hooks/filter/use-search-filters";
import useIsClient from "@/hooks/use-is-client";
import AddIcon from "@/ui/icons/add";
import FilterIcon from "@/ui/icons/filter";
import LabelButton from "@/ui/label-button";

import FieldContainer from "@/ui/container/field-container";
import CategoryChip from "@/features/search/components/chip/category";
import JournalChip from "@/features/search/components/chip/journal";
import DateChip from "@/features/search/components/chip/date";

import { Search } from "@/features/search/types";
import { Filter } from "@/features/filter/types";
import { FilterSettings } from "./filter-settings";

function Attributes({
  attributes: { category, journal, date },
}: {
  attributes: Search.Filter.Data["attributes"];
}) {
  const categoryIDs = useMemo(
    () =>
      Object.values(category.value ?? {}).map(
        ({ itemValue }) => itemValue.categoryID,
      ),
    [category.value],
  );

  const nameOfJournals = useMemo(
    () =>
      Object.values(journal.value ?? {}).map(
        ({ itemValue }) => itemValue.nameOfJournal,
      ),
    [journal.value],
  );

  const dateRange = useMemo(
    () => ({ min: date.value?.min, max: date.value?.max }),
    [date.value],
  );

  const hasCategory = categoryIDs.length > 0;
  const hasJournal = nameOfJournals.length > 0;
  const hasDate = dateRange.min || dateRange.max;

  return (
    <>
      {hasCategory && <CategoryChip value={categoryIDs} />}
      {hasJournal && <JournalChip value={nameOfJournals} />}
      {hasDate && <DateChip value={dateRange} />}
    </>
  );
}

export default function DefaultFilterInfo() {
  const isClient = useIsClient();

  const { filter } = useSearchFilters({
    store: Filter.Store.PERSIST,
    track: { tag: [Filter.Identify.Tag.DEFAULT] },
  });

  // Filter 정보는 Client에 존재하므로, Server 단에서는 Fallback을 띄운다.
  if (!isClient)
    return (
      <FieldContainer title="Default Filter Options">
        <div className="flex items-center gap-4">
          <LabelButton
            ui_color="secondary"
            ui_variant="light"
            ui_size="small"
            className="animate-pulse"
          >
            <FilterIcon ui_size="small" /> Loading Filters...
          </LabelButton>
        </div>
      </FieldContainer>
    );

  return (
    <div className="flex animate-fadeIn flex-wrap items-center gap-4">
      {filter && <Attributes attributes={filter.attributes} />}
      <FilterSettings>
        <LabelButton ui_color="secondary" ui_size="small">
          {filter ? (
            <>
              <FilterIcon ui_size="small" /> Configure Filter...
            </>
          ) : (
            <>
              <AddIcon ui_size="small" /> Add Filter...
            </>
          )}
        </LabelButton>
      </FilterSettings>
    </div>
  );
}
