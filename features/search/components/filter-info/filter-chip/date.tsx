"use client";

import { useMemo } from "react";

import { FilterData } from "@/features/filter/types/filter";
import { Search } from "@/features/search/types";
import LabelButton from "@/ui/label-button";
import DateIcon from "@/ui/icons/date";
import { convertStringToDate } from "@/utils/date";

type Props = {
  data: FilterData<Search.Type>["attributes"]["date"];
};

export function DateChip({ data: { value } }: Props) {
  const [startDate, endDate] = useMemo(
    () => [convertStringToDate(value?.min), convertStringToDate(value?.max)],
    [value?.min, value?.max],
  );

  // TODO: Date의 검증 방식을 좀 더 고려해볼 것
  const dateRange = useMemo(() => {
    if (!startDate && !endDate) return "All Dates";
    if (!startDate && endDate) return `~ ${value!.max}`;
    if (startDate && !endDate) return `${value!.min} ~`;

    return `${value!.min} ~ ${value!.max}`;
  }, [value, startDate, endDate]);

  return (
    <LabelButton ui_color="secondary" ui_size="medium">
      <DateIcon ui_size="small" /> {dateRange}
    </LabelButton>
  );
}
