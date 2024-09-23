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
  const hasSingleAuthor = useMemo(
    () => matchedResult.length === 1,
    [matchedResult],
  );

  const titleOfChip = hasAuthors ? authors[0] : "Unknown";
  const titleOfDetails = useMemo(() => {
    if (!hasAuthors) return "Not Found";
    if (hasSingleAuthor) return "Author";

    return `${matchedResult.length} Authors`;
  }, [matchedResult, hasAuthors, hasSingleAuthor]);

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
      <Popover.Content ui_size="large">
        <div className="flex flex-col gap-6">
          <div className="select-none text-title-medium">{titleOfDetails}</div>
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
            <div className="flex max-h-[25vh] flex-col gap-2 overflow-y-auto scrollbar">
              {matchedResult.map((author) => (
                <Button
                  ui_color="secondary"
                  ui_size="small"
                  ui_variant="light"
                  className="flex min-w-[20rem] items-center gap-2 text-left"
                  key={author}
                >
                  <AuthorIcon ui_size="small" />
                  {author}
                </Button>
              ))}
            </div>
          )}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
