"use client";

import { useMemo, useState } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import { Popover } from "@/ui/popover";
import AuthorIcon from "@/ui/icons/author";
import LabelButton from "@/ui/label-button";
import Button from "@/ui/button";
import SearchField from "@/ui/search-field";
import { matches } from "../../utils/matcher";

type Props = {
  authors: string[];
  children?: (titleOfChip: string) => React.ReactNode;
};

export default function AuthorChip({ authors, children }: Props) {
  const [matchText, setMatchText] = useState("");

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
  const hasAuthors = useMemo(() => matchedResult.length > 0, [matchedResult]);
  const titleOfChip = hasAuthors ? authors[0] : "Unknown";

  return (
    <Popover.Root>
      <Popover.Trigger>
        {children?.(titleOfChip) ?? (
          <LabelButton ui_size="small">
            <AuthorIcon ui_size="small" />
            {titleOfChip}
          </LabelButton>
        )}
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex flex-col gap-6">
          {visibleSearch && (
            <SearchField
              value={matchText}
              onChange={(e) => setMatchText(e.target.value)}
              ui_size="medium"
              ui_color="secondary"
              defaultPlaceholder="Find Authors..."
            />
          )}
          {hasAuthors && (
            <ul className="flex max-h-[20rem] list-disc flex-col overflow-y-auto scrollbar">
              {matchedResult.map((author) => (
                <Button
                  ui_color="secondary"
                  ui_size="small"
                  ui_variant="ghost"
                  className="min-w-[20rem] text-nowrap text-left text-label-large"
                  key={author}
                >
                  <li className="ml-2">{author}</li>
                </Button>
              ))}
            </ul>
          )}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
