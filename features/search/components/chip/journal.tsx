"use client";

import { useMemo, useState } from "react";

import { matches } from "@/features/search/utils/matcher";
import Button from "@/ui/button";
import SearchField from "@/ui/search-field";
import JournalIcon from "@/ui/icons/journal";
import LabelButton from "@/ui/label-button";
import { Popover } from "@/ui/popover";
import ArrowDownIcon from "@/ui/icons/arrow-down";

type Props = {
  nameOfJournals: string[];
  children?: (titleOfChip: string) => React.ReactNode;
};

export function JournalChip({ nameOfJournals, children }: Props) {
  const [matchText, setMatchText] = useState("");

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
        {children?.(titleOfChip) ?? (
          <LabelButton>
            <JournalIcon ui_size="small" /> {titleOfChip}
            <ArrowDownIcon ui_size="small" />
          </LabelButton>
        )}
      </Popover.Trigger>
      <Popover.Content className="w-[25rem]" ui_size="large">
        <div className="flex flex-col gap-4">
          <div className="select-none text-title-medium">{titleOfDetails}</div>
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
                  className="flex items-center gap-2 text-left"
                >
                  <JournalIcon ui_size="small" />
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
