"use client";

import { useMemo } from "react";

import { Search } from "@/features/search/types";
import Button from "@/ui/button";
import JournalIcon from "@/ui/icons/journal";
import useJournals from "@/hooks/use-journals";
import { ContentContainer, KeyContainer } from "./common";

export function JournalKey() {
  return (
    <KeyContainer>
      <JournalIcon /> Journal
    </KeyContainer>
  );
}

export function JournalContent({
  value,
}: Search.Data["attributes"]["journal"]) {
  const { journals } = useJournals();

  const info = useMemo(
    () =>
      Object.entries(value ?? []).map(
        ([
          itemID,
          {
            info: [name],
          },
        ]) => [itemID, name],
      ),
    [value],
  );

  return (
    <ContentContainer>
      {value && Object.keys(value).length ? (
        info.map(([itemID, name]) => {
          const available = journals.includes(name);

          return (
            <Button
              ui_color={available ? "primary" : "secondary"}
              ui_variant="light"
              ui_size="small"
              key={itemID}
            >
              {name}
            </Button>
          );
        })
      ) : (
        <Button ui_variant="light" ui_color="tertiary" ui_size="small">
          All Journals
        </Button>
      )}
    </ContentContainer>
  );
}
