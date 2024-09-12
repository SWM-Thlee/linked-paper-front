"use client";

import { useMemo } from "react";

import { Search } from "@/features/search/types";
import Button from "@/ui/button";
import DateIcon from "@/ui/icons/date";
import { convertStringToDate } from "@/utils/date";
import { ContentContainer, KeyContainer } from "./common";

export function DateKey() {
  return (
    <KeyContainer>
      <DateIcon /> Date
    </KeyContainer>
  );
}

export function DateContent({ value }: Search.Data["attributes"]["date"]) {
  const dateRange = useMemo(() => {
    const startDate = convertStringToDate(value?.min);
    const endDate = convertStringToDate(value?.max);

    if (!startDate && !endDate) return "All Dates";
    if (!startDate && endDate) return `~ ${value!.max}`;
    if (startDate && !endDate) return `${value!.min} ~`;

    return `${value!.min} ~ ${value!.max}`;
  }, [value]);

  return (
    <ContentContainer>
      <Button ui_variant="light" ui_color="tertiary" ui_size="small">
        {dateRange}
      </Button>
    </ContentContainer>
  );
}
