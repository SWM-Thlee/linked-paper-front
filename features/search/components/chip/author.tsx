"use client";

import { useState } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import { toArray } from "@/utils/array";
import { Popover } from "@/ui/popover";
import AuthorIcon from "@/ui/icons/author";
import LabelButton from "@/ui/label-button";
import Button from "@/ui/button";
import SearchField from "@/ui/search-field";
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
            <ul className="flex max-h-[20rem] w-[20rem] list-disc flex-col overflow-y-auto scrollbar">
              {matchedResult.map((author) => (
                <Button
                  ui_color="secondary"
                  ui_size="small"
                  ui_variant="ghost"
                  className="w-full text-nowrap text-left text-label-large"
                  key={author}
                >
                  <li className="ml-2">{author}</li>
                </Button>
              ))}
            </ul>
          </div>
        </Popover.Content>
      )}
    </Popover.Root>
  );
}
