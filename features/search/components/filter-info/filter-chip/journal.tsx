"use client";

import { useMemo, useState } from "react";

import { Search } from "@/features/search/types";
import { matches } from "@/features/search/utils/matcher";
import Button from "@/ui/button";
import SearchField from "@/ui/search-field";
import JournalIcon from "@/ui/icons/journal";
import LabelButton from "@/ui/label-button";
import { Popover } from "@/ui/popover";
import ArrowDownIcon from "@/ui/icons/arrow-down";

type Props = {
  data: Search.Filter.Data["attributes"]["journal"];
};

/**
 * 특정 Search Filter의 Journal 정보를 보여줍니다.
 */
export function JournalChip({ data: { value: journals } }: Props) {
  const [matchText, setMatchText] = useState("");

  const nameOfJournals = useMemo(
    () =>
      Object.values(journals ?? {}).map(
        ({ itemValue }) => itemValue.nameOfJournal,
      ),
    [journals],
  );

  const matchedResult = useMemo(
    () =>
      nameOfJournals.filter((journalName) =>
        matches({
          target: journalName,
          include: [matchText],
          ignoreCase: true,
          ignoreSpace: true,
        }),
      ),
    [nameOfJournals, matchText],
  );

  const titleOfChip = nameOfJournals[0] ?? "Not Selected";
  const titleOfDetails =
    matchedResult.length > 0
      ? `${matchedResult.length} Journal${matchedResult.length > 1 ? "s" : ""}`
      : "Not Found";

  // Journal의 개수가 10개를 초과할 경우 검색 필드를 보이게 합니다.
  const visibleSearch = nameOfJournals.length > 10;
  const hasMatchedResult = matchedResult.length > 0;

  return (
    <Popover.Root>
      <Popover.Trigger>
        <LabelButton ui_color="secondary" ui_size="medium">
          <JournalIcon ui_size="small" /> {titleOfChip}
          <ArrowDownIcon ui_size="small" />
        </LabelButton>
      </Popover.Trigger>
      <Popover.Content className="w-[25rem]" ui_size="large">
        <div className="flex flex-col gap-4">
          <div className="flex select-none flex-col gap-2 text-title-medium">
            <JournalIcon ui_size="medium" />
            {titleOfDetails}
          </div>
          {visibleSearch && (
            <SearchField
              value={matchText}
              onChange={(e) => setMatchText(e.target.value)}
              ui_size="medium"
              ui_color="secondary"
              defaultPlaceholder="Find Journals..."
            />
          )}
          {hasMatchedResult && (
            <div className="flex max-h-[20rem] flex-col gap-2 overflow-y-auto scrollbar">
              {matchedResult.map((journal) => (
                <Button
                  key={journal}
                  ui_variant="light"
                  ui_size="small"
                  ui_color="secondary"
                  className="text-left"
                >
                  {journal}
                </Button>
              ))}
            </div>
          )}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
