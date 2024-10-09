import {
  closestTo,
  compareDesc,
  endOfYear,
  startOfMonth,
  startOfYear,
  subYears,
} from "date-fns";

import { convertDateToString } from "@/utils/date";
import { signature } from "@/utils/signature";
import { Search } from "../types";

export type DateOption = {
  id: string;
  option: string;
  resolve: (props: DateRange) => DateRange;
};

type DateRange = NonNullable<Search.Filter.Data["attributes"]["date"]["value"]>;

// 현재 시점을 기준으로 몇 년 전까지의 날짜 구간을 나타냅니다.
function LastYearModule(target: number[]): DateOption[] {
  const today = new Date();
  return target.map((diff) => ({
    id: signature(),
    option: `Last ${diff === 1 ? "year" : `${diff} years`}`,
    resolve() {
      return {
        min: convertDateToString(subYears(today, diff)),
        max: convertDateToString(today),
      };
    },
  }));
}

// 시작 지점부터 현재까지의 10년 별 날짜 구간을 나타냅니다.
function DecadesModule(start: number): DateOption[] {
  const today = new Date();
  const startYear = startOfYear(new Date(start, 1));
  const endYear = endOfYear(new Date(start + 9, 1));
  const closestYear = closestTo(startYear, [today, endYear]);

  if (compareDesc(today, startYear) > 0) return [];

  return [
    {
      id: signature(),
      option: `${start}s`,
      resolve() {
        return {
          min: convertDateToString(startYear),
          max: closestYear ? convertDateToString(closestYear) : undefined,
        };
      },
    },
    ...DecadesModule(start + 10),
  ];
}

export const DateOptions = {
  // 기본 옵션 (모든 구간, 오늘만, 10년 단위 구간)
  DEFAULT: [
    {
      id: signature(),
      option: "All dates",
      resolve() {
        return {};
      },
    },
    {
      id: signature(),
      option: "Today",
      resolve() {
        const today = convertDateToString(new Date());
        return { min: today, max: today };
      },
    },
    // 1960년대부터
    ...DecadesModule(1960),
  ],

  // 지금으로부터 몇 년 전까지의 정보를 가져옵니다.
  UNTIL: LastYearModule([1, 3, 5, 10]),

  // 시작하는 지점에 대해 설정합니다.
  START: [
    {
      id: signature(),
      option: "Earliest",
      resolve({ max }) {
        return { max };
      },
    },
    {
      id: signature(),
      option: "Today",
      resolve({ max }) {
        return { min: convertDateToString(new Date()), max };
      },
    },
    {
      id: signature(),
      option: "This month",
      resolve({ max }) {
        return { min: convertDateToString(startOfMonth(new Date())), max };
      },
    },
    {
      id: signature(),
      option: "This year",
      resolve({ max }) {
        return { min: convertDateToString(startOfYear(new Date())), max };
      },
    },
  ],

  // 끝나는 지점에 대해 설정합니다.
  END: [
    {
      id: signature(),
      option: "Latest",
      resolve({ min }) {
        return { min };
      },
    },
    {
      id: signature(),
      option: "Today",
      resolve({ min }) {
        return { min, max: convertDateToString(new Date()) };
      },
    },
    {
      id: signature(),
      option: "This month",
      resolve({ min }) {
        return { min, max: convertDateToString(startOfMonth(new Date())) };
      },
    },
    {
      id: signature(),
      option: "This year",
      resolve({ min }) {
        return { min, max: convertDateToString(startOfYear(new Date())) };
      },
    },
  ],
} as const satisfies { [feature: string]: DateOption[] };
