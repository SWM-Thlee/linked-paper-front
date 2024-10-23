"use client";

import { useMemo } from "react";

import LabelButton from "@/ui/label-button";
import DateIcon from "@/ui/icons/date";
import { convertStringToDate } from "@/utils/date";

export interface DateChipProps extends React.ComponentPropsWithRef<"div"> {
  value: { min?: string; max?: string };
}

export default function DateChip({
  value: { min, max },
  ...titleProps
}: DateChipProps) {
  const [startDate, endDate] = useMemo(
    () => [convertStringToDate(min), convertStringToDate(max)],
    [min, max],
  );

  // TODO: Date의 검증 방식을 좀 더 고려해볼 것
  const title = useMemo(() => {
    if (!startDate && !endDate) return "All Dates";
    if (!startDate && endDate) return `~ ${max}`;
    if (startDate && !endDate) return `${min} ~`;

    return `${min} ~ ${max}`;
  }, [startDate, endDate, min, max]);

  return (
    <LabelButton>
      <DateIcon ui_size="small" /> <div {...titleProps}>{title}</div>
    </LabelButton>
  );
}
