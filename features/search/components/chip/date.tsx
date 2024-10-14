"use client";

import { useMemo } from "react";

import LabelButton from "@/ui/label-button";
import DateIcon from "@/ui/icons/date";
import { convertStringToDate } from "@/utils/date";

type Props = {
  dateRange: { min?: string; max?: string };
  children?: (titleOfChip: string) => React.ReactNode;
};

export function DateChip({ dateRange: { min, max }, children }: Props) {
  const [startDate, endDate] = useMemo(
    () => [convertStringToDate(min), convertStringToDate(max)],
    [min, max],
  );

  // TODO: Date의 검증 방식을 좀 더 고려해볼 것
  const titleOfChip = useMemo(() => {
    if (!startDate && !endDate) return "All Dates";
    if (!startDate && endDate) return `~ ${max}`;
    if (startDate && !endDate) return `${min} ~`;

    return `${min} ~ ${max}`;
  }, [startDate, endDate, min, max]);

  return (
    children?.(titleOfChip) ?? (
      <LabelButton>
        <DateIcon ui_size="small" /> {titleOfChip}
      </LabelButton>
    )
  );
}
