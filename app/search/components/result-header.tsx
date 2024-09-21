"use client";

import { useCallback, useMemo, useState } from "react";

import { CategoryChip } from "@/features/search/components/filter-info/filter-chip/category";
import { JournalChip } from "@/features/search/components/filter-info/filter-chip/journal";
import { DateChip } from "@/features/search/components/filter-info/filter-chip/date";
import SearchField from "@/ui/search-field";
import LabelButton from "@/ui/label-button";
import FilterIcon from "@/ui/icons/filter";
import useIsClient from "@/hooks/use-is-client";
import { FilterData } from "@/features/filter/types/filter";
import { Search, SearchQuery } from "@/features/search/types";
import Select, { SelectComponentItem } from "@/ui/select";
import CheckIcon from "@/ui/icons/check";
import { Popover } from "@/ui/popover";
import InfoIcon from "@/ui/icons/info";
import Button from "@/ui/button";
import CloseIcon from "@/ui/icons/close";
import WarningIcon from "@/ui/icons/warning";
import useSearchQueryInfo from "@/features/search/hooks/query/use-search-query-info";
import useSearchQueryFilter from "@/features/search/hooks/query/use-search-query-filter";
import { FilterSettings } from "./filter-settings";

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
      {query && <Attributes attributes={query.attributes} />}
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

function Sorting({
  status,
  onStatusChange,
}: {
  status: SearchQuery.Sorting;
  onStatusChange: (newStatus: SearchQuery.Sorting) => void;
}) {
  const items = useMemo<SelectComponentItem[]>(
    () =>
      Object.values(SearchQuery.Sorting).map((sorting) => ({
        id: sorting,
        value: sorting,
      })),
    [],
  );

  return (
    <Select
      ui_variant="bordered"
      ui_size="small"
      ui_color="tertiary"
      value={status}
      onValueChange={onStatusChange}
      items={items}
    />
  );
}

function ResultSize({
  status,
  onStatusChange,
}: {
  status: SearchQuery.Size;
  onStatusChange: (newStatus: SearchQuery.Size) => void;
}) {
  const [open, setOpen] = useState(false);

  const setStatus = useCallback(
    (newStatus: SearchQuery.Size) => {
      setOpen(false);
      onStatusChange(newStatus);
    },
    [onStatusChange],
  );

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <LabelButton ui_color="secondary">{status} Results</LabelButton>
      </Popover.Trigger>
      <Popover.Content
        ui_size="large"
        className="flex max-w-[30rem] flex-col gap-6"
      >
        <InfoIcon />
        <div className="text-title-medium">Select Result Size (Per Load)</div>
        <p className="text-body-medium">
          Determine the number of results to import each time new search results
          are requested. The larger the number of results, the longer it may
          take to import.
        </p>
        <div className="flex items-center gap-1">
          {SearchQuery.Size.map((size) => (
            <LabelButton
              ui_color={status === size ? "primary" : "secondary"}
              ui_size="small"
              className="flex items-center gap-2"
              key={size}
              onClick={() => setStatus(size)}
            >
              {status === size && <CheckIcon ui_size="small" />}
              {size}
            </LabelButton>
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

function SimilarityLimitation({
  status,
  onStatusChange,
}: {
  status: boolean;
  onStatusChange: (newStatus: boolean) => void;
}) {
  const [open, setOpen] = useState(false);

  const setStatus = useCallback(
    (newStatus: boolean) => {
      onStatusChange(newStatus);
      setOpen(false);
    },
    [onStatusChange],
  );

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <LabelButton
          ui_color={status ? "tertiary" : "secondary"}
          ui_variant={status ? "default" : "bordered"}
        >
          {status ? (
            <CheckIcon ui_size="small" />
          ) : (
            <CloseIcon ui_size="small" />
          )}
          Similarity Limitation
        </LabelButton>
      </Popover.Trigger>
      <Popover.Content
        ui_size="large"
        className="flex max-w-[30rem] flex-col gap-6"
      >
        {status ? (
          <>
            <InfoIcon />
            <div className="text-title-medium">
              What is Similarity Limitation?
            </div>
            <p className="text-body-medium">
              For a better search experience, all search options only show
              results above a certain similarity. If you want to see the
              original search results, you can disable the similarity limitation
              through the button below.
            </p>
            <Button
              ui_size="small"
              ui_color="secondary"
              className="flex items-center justify-center gap-2 text-label-large"
              onClick={() => setStatus(false)}
            >
              <CloseIcon ui_size="small" /> Disable Limitation
            </Button>
          </>
        ) : (
          <>
            <WarningIcon />
            <div className="text-title-medium">
              Similarity Limitation Is Disabled
            </div>
            <p className="text-body-medium">
              Showing all search results without similarity limitation can
              increase the proportion of results that are far from your
              intentions. For a better search experience, it is recommended to
              enable similarity limitation.
            </p>
            <Button
              ui_size="small"
              className="flex items-center justify-center gap-2 text-label-large"
              onClick={() => setStatus(true)}
            >
              <CheckIcon ui_size="small" /> Enable Limitation
            </Button>
          </>
        )}
      </Popover.Content>
    </Popover.Root>
  );
}

export default function SearchResultHeader() {
  const { info, requiredQuery, setRequiredQuery } = useSearchQueryInfo();

  // Search Text
  const [text, setText] = useState(info.query);

  // Search Result Size
  const setSize = useCallback(
    (size: SearchQuery.Size) => {
      if (info.size === size) return;
      setRequiredQuery({ ...requiredQuery, size });
    },
    [info.size, requiredQuery, setRequiredQuery],
  );

  // Similarity Limitation
  const setLimit = useCallback(
    (similarity_limit: boolean) => {
      if (info.similarity_limit === similarity_limit) return;
      setRequiredQuery({ ...requiredQuery, similarity_limit });
    },
    [info.similarity_limit, requiredQuery, setRequiredQuery],
  );

  // Search Sorting
  const setSorting = useCallback(
    (sorting: SearchQuery.Sorting) => {
      if (info.sorting === sorting) return;
      setRequiredQuery({ ...requiredQuery, sorting });
    },
    [info.sorting, requiredQuery, setRequiredQuery],
  );

  return (
    <div className="flex flex-col gap-8 rounded-t-6 bg-light-surfaceBright/15 p-8 dark:bg-dark-surfaceBright/15">
      <FilterChips />
      <SearchField
        value={text}
        onKeyUp={(e) => {
          if (!text) return;
          if (e.key === "Enter") {
            setRequiredQuery({ ...requiredQuery, query: text });
          }
        }}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ResultSize status={info.size} onStatusChange={setSize} />
          <SimilarityLimitation
            status={info.similarity_limit}
            onStatusChange={setLimit}
          />
        </div>
        <Sorting status={info.sorting} onStatusChange={setSorting} />
      </div>
    </div>
  );
}
