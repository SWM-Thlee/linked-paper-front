"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { produce } from "immer";
import { DayPicker } from "react-day-picker";
import { compareAsc } from "date-fns";

import Button from "@/ui/button";
import DateIcon from "@/ui/icons/date";
import { Popover } from "@/ui/popover";
import FieldContainer from "@/ui/container/field-container";
import { Search } from "@/features/search/types";
import {
  convertDateToString as convertToString,
  convertStringToDate as convertToDate,
} from "@/utils/date";
import { DateOptions } from "@/features/search/utils/date-option";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import { Analytics } from "@/features/analytics/types";
import "react-day-picker/style.css";
import useFilters from "@/features/filter/hooks/use-filters";
import { searchFilterForAnalytics } from "@/features/analytics/utils/filter";
import ArrowBackIcon from "@/ui/icons/arrow-back";
import { DATE_SECTION_ID, FILTER_SETTINGS_ID } from "../section-id";

type FilterDate = Search.Filter.Scheme["attributes"]["date"];

function StartDateEditor({
  date,
  setDate,
}: {
  date?: FilterDate;
  setDate: ({ min, max }: FilterDate) => void;
}) {
  const today = new Date();
  const startDate = useMemo(() => convertToDate(date?.min), [date?.min]);
  const endDate = useMemo(() => convertToDate(date?.max), [date?.max]);

  const displayDate = useMemo(
    () => (startDate ? date?.min : "Earliest"),
    [startDate, date?.min],
  );

  // 외부에서 날짜가 수정되어도 자동으로 Navigate되어야 한다.
  const [month, setMonth] = useState<Date | undefined>(startDate);
  useEffect(() => setMonth(startDate), [startDate]);

  // Start Date 설정 시 End Date보다 뒤에 있는 경우, End Date가 Start Date에 맞춥니다.
  const check = useCallback((checkDate: FilterDate): FilterDate => {
    // undefined 뿐만 아니라 잘못된 값이 존재하는 경우 undefined 처리됩니다.
    const checkStartDate = convertToDate(checkDate.min);
    const checkEndDate = convertToDate(checkDate.max);

    const result = {
      min: convertToString(checkStartDate),
      max: convertToString(checkEndDate),
    };

    // 하나라도 범위가 정해져 있지 않으면 넘어설 일이 없습니다.
    if (!checkStartDate || !checkEndDate) return result;

    return {
      ...result,
      max:
        compareAsc(checkStartDate, checkEndDate) > 0 ? result.min : result.max,
    };
  }, []);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button
          ui_color="secondary"
          ui_variant="bordered"
          className="flex items-center justify-between gap-2 text-nowrap text-title-medium"
        >
          <DateIcon ui_size="small" />
          {displayDate}
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            {DateOptions.START.map(({ id, option, resolve }) => (
              <Button
                className="text-label-large"
                ui_color="secondary"
                ui_size="small"
                ui_variant="light"
                key={id}
                onClick={() =>
                  setDate(
                    check(
                      resolve({
                        min: date?.min,
                        max: date?.max,
                      }),
                    ),
                  )
                }
              >
                {option}
              </Button>
            ))}
          </div>
          <DayPicker
            mode="single"
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            disabled={{ after: endDate ?? today }}
            endMonth={endDate}
            selected={startDate}
            onSelect={(start) =>
              setDate(
                check({
                  min: convertToString(start),
                  max: date?.max,
                }),
              )
            }
          />
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

function EndDateEditor({
  date,
  setDate,
}: {
  date?: FilterDate;
  setDate: ({ min, max }: FilterDate) => void;
}) {
  const today = new Date();
  const startDate = useMemo(() => convertToDate(date?.min), [date?.min]);
  const endDate = useMemo(() => convertToDate(date?.max), [date?.max]);

  const displayDate = useMemo(
    () => (endDate ? date?.max : "Latest"),
    [endDate, date?.max],
  );

  // Auto Navigation
  const [month, setMonth] = useState<Date | undefined>(endDate);
  useEffect(() => setMonth(endDate), [endDate]);

  // End Date 설정 시 Start Date보다 앞에 있는 경우, Start Date가 End Date에 맞춥니다.
  const check = useCallback((checkDate: FilterDate): FilterDate => {
    // undefined 뿐만 아니라 잘못된 값이 존재하는 경우 undefined 처리됩니다.
    const checkStartDate = convertToDate(checkDate.min);
    const checkEndDate = convertToDate(checkDate.max);

    const result = {
      min: convertToString(checkStartDate),
      max: convertToString(checkEndDate),
    };

    // 하나라도 범위가 정해져 있지 않으면 넘어설 일이 없습니다.
    if (!checkStartDate || !checkEndDate) return result;

    return {
      ...result,
      min:
        compareAsc(checkStartDate, checkEndDate) > 0 ? result.max : result.min,
    };
  }, []);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button
          ui_color="secondary"
          ui_variant="bordered"
          className="flex items-center justify-between gap-2 text-nowrap text-title-medium"
        >
          <DateIcon ui_size="small" />
          {displayDate}
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            {DateOptions.END.map(({ id, option, resolve }) => (
              <Button
                className="text-label-large"
                ui_color="secondary"
                ui_size="small"
                ui_variant="light"
                key={id}
                onClick={() =>
                  setDate(
                    check(
                      resolve({
                        min: date?.min,
                        max: date?.max,
                      }),
                    ),
                  )
                }
              >
                {option}
              </Button>
            ))}
          </div>
          <DayPicker
            mode="single"
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            disabled={{ before: startDate, after: today }}
            startMonth={startDate}
            endMonth={today}
            selected={endDate}
            onSelect={(end) =>
              setDate(
                check({
                  min: date?.min,
                  max: convertToString(end),
                }),
              )
            }
          />
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}

export default function DateSection({ data }: { data: Search.Filter.Scheme }) {
  const { log } = useAnalytics();
  const { dispatch } = useFilters();

  const { date } = data.attributes;

  // 검증 프로세스는 별도로 수행하지 않으며, 유효하지 않은 값은 undefined 취급한다.
  // 둘 다 기본 값(Earliest, Latest)으로 정한다.
  const setDate = useCallback(
    ({ min, max }: FilterDate) => {
      const newFilter = produce(data, (draft) => {
        draft.attributes.date = { min, max };
      });

      dispatch(newFilter);
      log(Analytics.Event.CREATE_FILTER, searchFilterForAnalytics(newFilter));
    },
    [dispatch, data, log],
  );

  return (
    <div className="flex scroll-m-5 flex-col gap-8" id={DATE_SECTION_ID}>
      <div className="sticky top-0 flex h-[3rem] items-center gap-4 rounded-2 bg-light-secondaryContainer/75 p-2 text-light-onSecondaryContainer dark:bg-dark-secondaryContainer/75 dark:text-dark-onSecondaryContainer">
        <button
          type="button"
          aria-label="Scroll to Filter Settings"
          onClick={() =>
            document
              .getElementById(FILTER_SETTINGS_ID)
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          <ArrowBackIcon />
        </button>
        <span className="text-label-large">Date Settings</span>
      </div>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-x-6">
          <FieldContainer field="FROM" ui_size="medium">
            <StartDateEditor date={date} setDate={setDate} />
          </FieldContainer>
          <FieldContainer field="TO" ui_size="medium">
            <EndDateEditor date={date} setDate={setDate} />
          </FieldContainer>
        </div>
        <FieldContainer field="QUICK SETTINGS" ui_variant="bordered">
          <FieldContainer field="DEFAULT" ui_size="medium">
            <div className="flex flex-wrap gap-2">
              {DateOptions.DEFAULT.map(({ id, option, resolve }) => (
                <Button
                  ui_size="small"
                  ui_color="secondary"
                  ui_variant="light"
                  className="text-nowrap text-label-large"
                  key={id}
                  onClick={() => setDate(resolve())}
                >
                  {option}
                </Button>
              ))}
            </div>
          </FieldContainer>
          <FieldContainer field="UNTIL NOW" ui_size="medium">
            <div className="flex flex-wrap gap-2">
              {DateOptions.UNTIL.map(({ id, option, resolve }) => (
                <Button
                  ui_size="small"
                  ui_color="tertiary"
                  ui_variant="light"
                  className="text-nowrap text-label-large"
                  key={id}
                  onClick={() =>
                    setDate(resolve({ min: date?.min, max: date?.max }))
                  }
                >
                  {option}
                </Button>
              ))}
            </div>
          </FieldContainer>
        </FieldContainer>
      </div>
    </div>
  );
}
