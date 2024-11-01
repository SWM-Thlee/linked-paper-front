"use client";

import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { matches } from "@/features/search/utils/matcher";
import Button from "@/ui/button";
import SearchField from "@/ui/search-field";
import JournalIcon from "@/ui/icons/journal";
import LabelButton from "@/ui/label-button";
import { Popover } from "@/ui/popover";
import { toArray } from "@/utils/array";
import CopyIcon from "@/ui/icons/copy";
import { copyToClipboard } from "@/utils/clipboard";

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

  const copy = useCallback(
    (text: string) =>
      copyToClipboard(text, (success) => {
        if (success) {
          toast.success(`Copy: ${text}`);
        } else {
          toast.error(`Failed to Copy: ${text}`);
        }
      }),
    [],
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
            <ul className="flex max-h-[20rem] list-disc flex-col overflow-y-auto scrollbar">
              {matchedResult.map((journal) => (
                <Button
                  key={journal}
                  ui_variant="ghost"
                  ui_size="small"
                  ui_color="secondary"
                  className="group/journal flex w-full items-center justify-between gap-2 text-left text-label-large"
                  onClick={() => copy(journal)}
                >
                  <li className="ml-2 max-w-[15rem]">{journal}</li>
                  <CopyIcon
                    ui_size="small"
                    className="opacity-0 transition-opacity group-hover/journal:opacity-100"
                  />
                </Button>
              ))}
            </ul>
          </div>
        </Popover.Content>
      )}
    </Popover.Root>
  );
}
