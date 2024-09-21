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
}: Search.Filter.Data["attributes"]["journal"]) {
  const { journals } = useJournals();

  const infoOfJournals = useMemo(
    () =>
      Object.values(value ?? []).map(
        ({ itemValue: { nameOfJournal } }) => nameOfJournal,
      ),
    [value],
  );

  return (
    <ContentContainer>
      {value && Object.keys(value).length ? (
        infoOfJournals.map((journal) => {
          const available = journals.includes(journal);

          return (
            <Button
              ui_color={available ? "primary" : "secondary"}
              ui_variant="light"
              ui_size="small"
              key={journal}
            >
              {journal}
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
