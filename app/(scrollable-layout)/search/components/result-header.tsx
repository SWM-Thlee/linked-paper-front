"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import useIsClient from "@/hooks/use-is-client";
import { Search } from "@/features/search/types";
import useSearchUpdate from "@/features/search/hooks/query/use-search-update";
import useSearchQueryFilter from "@/features/search/hooks/query/use-search-query-filter";
import useSearchQueryInfo from "@/features/search/hooks/query/use-search-query-info";
import CategoryChip from "@/features/search/components/chip/category";
import JournalChip from "@/features/search/components/chip/journal";
import DateChip from "@/features/search/components/chip/date";
import SearchField from "@/ui/search-field";
import LabelButton from "@/ui/label-button";
import FilterIcon from "@/ui/icons/filter";
import Select, { SelectComponentItem } from "@/ui/select";
import CheckIcon from "@/ui/icons/check";
import { Popover } from "@/ui/popover";
import InfoIcon from "@/ui/icons/info";
import Button from "@/ui/button";
import CloseIcon from "@/ui/icons/close";
import WarningIcon from "@/ui/icons/warning";
import { Analytics } from "@/features/analytics/types";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import { searchFilterForAnalytics } from "@/features/analytics/utils/filter";
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
  const hasData = hasCategory || hasJournal || hasDate;

  return hasData ? (
    <div className="flex flex-wrap items-center gap-2">
      {hasCategory && <CategoryChip value={categoryIDs} />}
      {hasJournal && <JournalChip value={nameOfJournals} />}
      {hasDate && <DateChip value={dateRange} />}
    </div>
  ) : null;
}

function FilterChips() {
  const filter = useSearchQueryFilter();
  const isClient = useIsClient();

  if (!isClient) return null;

  return filter ? <Attributes attributes={filter.attributes} /> : null;
}

function Sorting({
  status,
  onStatusChange,
}: {
  status: Search.Query.Sorting;
  onStatusChange: (newStatus: Search.Query.Sorting) => void;
}) {
  const items = useMemo<SelectComponentItem[]>(
    () =>
      Object.values(Search.Query.Sorting).map((sorting) => ({
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
  status: Search.Query.Size;
  onStatusChange: (newStatus: Search.Query.Size) => void;
}) {
  const [open, setOpen] = useState(false);

  const setStatus = useCallback(
    (newStatus: Search.Query.Size) => {
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
          {Search.Query.Size.map((size) => (
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
  const { log } = useAnalytics();
  const { update } = useSearchUpdate();
  const { requiredQuery, stale } = useSearchQueryInfo();
  const filter = useSearchQueryFilter();
  const [text, setText] = useState("");

  useEffect(() => {
    if (!stale) setText(requiredQuery.query);
  }, [stale, requiredQuery.query]);

  /* User Event: 검색 결과의 크기 */
  const onModifyResultSize = useCallback(
    (size: Search.Query.Size) => update({ ...requiredQuery, size }),
    [update, requiredQuery],
  );

  /* User Event: 유사도 제한 */
  const onModifyLimitation = useCallback(
    (similarity_limit: boolean) =>
      update({ ...requiredQuery, similarity_limit }),
    [update, requiredQuery],
  );

  /* User Event: 정렬 옵션 */
  const onModifySorting = useCallback(
    (sorting: Search.Query.Sorting) => {
      log(Analytics.Event.CHANGE_FILTER_SORTING, { sorting });
      update({ ...requiredQuery, sorting });
    },
    [update, requiredQuery, log],
  );

  /* User Event: 검색어를 바꾼 뒤 검색 재요청 */
  const onUpdateQuery = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!(text && event.key === "Enter")) return;
      event.preventDefault();

      log(Analytics.Event.SEARCH_QUERY_RESULT, {
        query: text,
        ...searchFilterForAnalytics(filter),
      });
      update({ ...requiredQuery, query: text });
    },
    [update, requiredQuery, log, filter, text],
  );

  return (
    <div className="flex flex-col gap-6 rounded-t-6 bg-light-surfaceBright/15 p-8 dark:bg-dark-surfaceBright/15">
      <FilterChips />
      <SearchField
        value={text}
        onKeyUp={onUpdateQuery}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="grid grid-cols-[1fr_auto]">
        <div className="flex items-center gap-2">
          <ResultSize
            status={requiredQuery.size}
            onStatusChange={onModifyResultSize}
          />
          <SimilarityLimitation
            status={requiredQuery.similarity_limit}
            onStatusChange={onModifyLimitation}
          />
          <FilterSettings>
            <LabelButton ui_color="secondary" ui_variant="bordered">
              <FilterIcon ui_size="small" /> Configure Filter...
            </LabelButton>
          </FilterSettings>
        </div>
        <div className="flex flex-col justify-end">
          <Sorting
            status={requiredQuery.sorting}
            onStatusChange={onModifySorting}
          />
        </div>
      </div>
    </div>
  );
}
