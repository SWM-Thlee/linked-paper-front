"use client";

import { useCallback, useState } from "react";
import { useDeepCompareMemo } from "use-deep-compare";
import toast from "react-hot-toast";

import { copyToClipboard } from "@/utils/clipboard";
import { toArray } from "@/utils/array";
import { Popover } from "@/ui/popover";
import AuthorIcon from "@/ui/icons/author";
import LabelButton from "@/ui/label-button";
import Button from "@/ui/button";
import SearchField from "@/ui/search-field";
import CopyIcon from "@/ui/icons/copy";
import { matches } from "../../utils/matcher";

export interface AuthorChipProps extends React.ComponentPropsWithRef<"div"> {
  value?: string | string[];
}

export default function AuthorChip({ value, ...titleProps }: AuthorChipProps) {
  const [matchText, setMatchText] = useState("");
  const authors = useDeepCompareMemo(() => toArray(value), [value]);

  const matchedResult = useDeepCompareMemo(
    () =>
      authors.filter((author) =>
        matches({
          target: author,
          include: [matchText],
          ignoreCase: true,
          ignoreSpace: true,
        }),
      ),
    [authors, matchText],
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

  // Author가 10명을 초과할 경우 검색 필드를 보이게 합니다.
  const visibleSearch = authors.length > 10;
  const hasAuthors = authors.length > 0;

  return (
    <Popover.Root>
      <Popover.Trigger>
        <LabelButton ui_size="small" ui_color="secondary" ui_variant="light">
          <AuthorIcon ui_size="small" />
          <div {...titleProps}>{authors[0] ?? "None"}</div>
        </LabelButton>
      </Popover.Trigger>
      {hasAuthors && (
        <Popover.Content>
          <div className="flex flex-col gap-2">
            {visibleSearch && (
              <SearchField
                value={matchText}
                onChange={(e) => setMatchText(e.target.value)}
                ui_size="medium"
                ui_color="secondary"
                defaultPlaceholder="Find Authors..."
                disableSubmit
              />
            )}
            <ul className="flex max-h-[20rem] list-disc flex-col overflow-y-auto scrollbar">
              {matchedResult.map((author) => (
                <Button
                  ui_color="secondary"
                  ui_size="small"
                  ui_variant="ghost"
                  className="group/author flex w-full items-center justify-between gap-2 text-left text-label-large"
                  onClick={() => copy(author)}
                  key={author}
                >
                  <li className="ml-2 max-w-[15rem]">{author}</li>
                  <CopyIcon
                    ui_size="small"
                    className="opacity-0 transition-opacity group-hover/author:opacity-100"
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
