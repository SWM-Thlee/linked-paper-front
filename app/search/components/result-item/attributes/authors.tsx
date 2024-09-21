"use client";

import { useMemo } from "react";

import { PaperMetadata } from "@/types/paper";
import { Popover } from "@/ui/popover";
import AuthorIcon from "@/ui/icons/author";
import LabelButton from "@/ui/label-button";

type Props = Pick<PaperMetadata, "authors">;

export default function SearchResultAttributeAuthors({ authors }: Props) {
  const title = useMemo(
    () =>
      authors.length
        ? authors.length > 1
          ? `${authors.length} Authors`
          : "Author"
        : "Authors Unknown",
    [authors],
  );

  return (
    <Popover.Root>
      <Popover.Trigger>
        <LabelButton ui_size="small" ui_color="secondary" ui_variant="light">
          <AuthorIcon ui_size="small" />
          {!authors.length ? "Unknown" : authors[0]}
        </LabelButton>
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex flex-col gap-4 p-4">
          <div className="text-title-large">{title}</div>
          {!!authors.length && (
            <div className="flex max-h-[25vh] flex-col gap-2 overflow-y-auto scrollbar">
              {authors.map((author) => (
                <div className="text-body-large" key={author}>
                  {author}
                </div>
              ))}
            </div>
          )}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
