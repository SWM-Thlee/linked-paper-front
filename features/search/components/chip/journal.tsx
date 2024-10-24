"use client";

import { useMemo, useState } from "react";

import { matches } from "@/features/search/utils/matcher";
import Button from "@/ui/button";
import SearchField from "@/ui/search-field";
import JournalIcon from "@/ui/icons/journal";
import LabelButton from "@/ui/label-button";
import { Popover } from "@/ui/popover";
import { toArray } from "@/utils/array";

export interface JournalChipProps extends React.ComponentPropsWithRef<"div"> {
  value?: string | string[];
}

export default function JournalChip({
  value,
  ...titleProps
}: JournalChipProps) {
  const [matchText, setMatchText] = useState("");
  const nameOfJournals = useMemo(() => toArray(value), [value]);

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

  const title = nameOfJournals[0] ?? "None";

  // Journal의 개수가 10개를 초과할 경우 검색 필드를 보이게 합니다.
  const visibleSearch = nameOfJournals.length > 10;
  const hasMatchedResult = matchedResult.length > 0;

  return (
    <Popover.Root>
      <Popover.Trigger>
        <LabelButton ui_color="secondary" ui_variant="light">
          <JournalIcon ui_size="small" />
          <div {...titleProps}>{title}</div>
        </LabelButton>
      </Popover.Trigger>
      {(hasMatchedResult || visibleSearch) && (
        <Popover.Content className="w-[25rem]">
          <div className="flex flex-col gap-2">
            {visibleSearch && (
              <SearchField
                value={matchText}
                onChange={(e) => setMatchText(e.target.value)}
                ui_size="medium"
                ui_color="secondary"
                defaultPlaceholder="Find Sources..."
                disableSubmit
              />
            )}
            <ul className="flex max-h-[20rem] w-[25rem] list-disc flex-col overflow-y-auto scrollbar">
              {matchedResult.map((journal) => (
                <Button
                  key={journal}
                  ui_variant="ghost"
                  ui_size="small"
                  ui_color="secondary"
                  className="w-full text-left text-label-large"
                >
                  <li className="ml-2">{journal}</li>
                </Button>
              ))}
            </ul>
          </div>
        </Popover.Content>
      )}
    </Popover.Root>
  );
}
