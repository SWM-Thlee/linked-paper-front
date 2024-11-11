"use client";

import { useCallback, useMemo } from "react";
import { produce } from "immer";

import { searchFilterForAnalytics } from "@/features/analytics/utils/filter";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import useFilters from "@/features/filter/hooks/use-filters";
import useCategories from "@/features/paper/hooks/use-categories";
import useTabID from "@/ui/settings/hooks/use-tab-id";
import useTabDirectionObserver from "@/ui/settings/hooks/use-tab-direction-observer";

import { Search } from "@/features/search/types";
import { convertStringToDate } from "@/utils/date";
import Settings from "@/ui/settings";
import Button from "@/ui/button";
import JournalIcon from "@/ui/icons/journal";
import AddIcon from "@/ui/icons/add";
import CategoryIcon from "@/ui/icons/category";
import DateIcon from "@/ui/icons/date";
import CloseIcon from "@/ui/icons/close";
import SettingsIcon from "@/ui/icons/settings";
import { Analytics } from "@/features/analytics/types";
import TextField from "@/ui/text-field";
import useBidirectionalState from "@/hooks/use-bidirectional-state";
import JournalSection from "./attributes/journal";
import CategorySection from "./attributes/category";
import DateSection from "./attributes/date";
import {
  CATEGORY_SECTION_ID,
  DATE_SECTION_ID,
  FILTER_SETTINGS_ID,
  JOURNAL_SECTION_ID,
} from "./section-id";

export type FilterSettingsTabProps = {
  defaultTab?: boolean;
  filter: Search.Filter.Scheme;
  fixedTitle?: string;
  tabOption?: React.ReactNode;
  children?: React.ReactNode;
};

export default function FilterSettingsTab({
  filter,
  children,
  defaultTab = false,
  tabOption,
  fixedTitle,
}: FilterSettingsTabProps) {
  /* Tab */
  const tabID = useTabID(filter.id);
  const { dispatch } = useFilters();
  const { getInfo } = useCategories();
  const { log } = useAnalytics();

  useTabDirectionObserver("SearchFilter", tabID, filter.id);

  const dateRange = useMemo(() => {
    const { min, max } = filter.attributes.date;
    const startDate = convertStringToDate(min);
    const endDate = convertStringToDate(max);

    if (!startDate && !endDate) return "All Dates";
    if (!startDate && endDate) return `~ ${max}`;
    if (startDate && !endDate) return `${min} ~`;

    return `${min} ~ ${max}`;
  }, [filter.attributes.date]);

  const onRemoveJournal = useCallback(
    (journal: string) => {
      const newFilter = produce(filter, (draft) => {
        draft.attributes.journal = draft.attributes.journal.filter(
          (j) => j !== journal,
        );
      });

      dispatch(newFilter);
      log(Analytics.Event.CREATE_FILTER, searchFilterForAnalytics(newFilter));
    },
    [dispatch, filter, log],
  );

  const onRemoveCategory = useCallback(
    (category: string) => {
      const newFilter = produce(filter, (draft) => {
        draft.attributes.category = draft.attributes.category.filter(
          (j) => j !== category,
        );
      });

      dispatch(newFilter);
      log(Analytics.Event.CREATE_FILTER, searchFilterForAnalytics(newFilter));
    },
    [dispatch, filter, log],
  );

  const [text, setText] = useBidirectionalState(
    filter.name,
    filter.name,
    (data) =>
      dispatch(
        produce(filter, (draft) => {
          draft.name = data;
        }),
      ),
  );

  return (
    <Settings.Tab.Root id={tabID} defaultTab={defaultTab}>
      <Settings.Tab.Title extra={tabOption}>
        <div className="line-clamp-2 text-ellipsis break-all text-left">
          {fixedTitle ??
            (filter.name.length > 0 ? filter.name : "Untitled Filter")}
        </div>
      </Settings.Tab.Title>
      <Settings.Tab.Content>
        <div
          className="w-full shrink-0 animate-fadeIn snap-start overflow-y-auto p-5 scrollbar-none"
          id={FILTER_SETTINGS_ID}
        >
          <div className="relative flex flex-col gap-8 ring-light-outlineVariant dark:ring-dark-outlineVariant">
            {/* Filter Settings */}
            <div className="sticky top-0 flex h-[3rem] items-center gap-4 rounded-2 bg-light-secondaryContainer/75 p-2 text-light-onSecondaryContainer dark:bg-dark-secondaryContainer/75 dark:text-dark-onSecondaryContainer">
              <SettingsIcon className="ml-1" />
              {!fixedTitle ? (
                <TextField
                  ui_size="small"
                  ui_color="secondary"
                  value={text}
                  placeholder="Untitled Filter"
                  onChange={(event) => setText(event.target.value)}
                />
              ) : (
                <span className="text-label-large">Filter Settings</span>
              )}
            </div>
            {children}
            {/* Filter Attributes */}
            <div className="flex flex-col gap-3 px-1">
              <div className="flex items-center gap-2">
                <JournalIcon ui_size="small" />
                <span className="text-label-small">SOURCE</span>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  ui_variant="bordered"
                  ui_color="tertiary"
                  className="flex animate-fadeIn items-center justify-between gap-4 px-4"
                  onClick={() => {
                    setTimeout(() => {
                      document
                        .getElementById(JOURNAL_SECTION_ID)
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }, 100);
                  }}
                >
                  <div className="text-label-large">Add New Source...</div>
                  <AddIcon />
                </Button>
                {filter.attributes.journal.map((journal) => (
                  <Button
                    ui_color="secondary"
                    className="flex animate-fadeIn items-center justify-between gap-4 px-4"
                    key={journal}
                    onClick={() => onRemoveJournal(journal)}
                  >
                    <div className="text-label-large">{journal}</div>
                    <CloseIcon />
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 px-1">
              <div className="flex items-center gap-2">
                <CategoryIcon ui_size="small" />
                <span className="text-label-small">CATEGORY</span>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  ui_variant="bordered"
                  ui_color="tertiary"
                  className="flex animate-fadeIn items-center justify-between gap-4 px-4"
                  onClick={() => {
                    setTimeout(() => {
                      document
                        .getElementById(CATEGORY_SECTION_ID)
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }, 100);
                  }}
                >
                  <div className="text-label-large">Add New Category...</div>
                  <AddIcon />
                </Button>
                {filter.attributes.category.map((category) => (
                  <Button
                    ui_color="secondary"
                    className="group/category flex animate-fadeIn items-center justify-between gap-4 px-4"
                    key={category}
                    onClick={() => onRemoveCategory(category)}
                  >
                    <div className="flex flex-1 items-center justify-between gap-4">
                      <div className="text-left text-label-large">
                        {getInfo(category)?.description ?? "Unknown"}
                      </div>
                      <div className="text-label-large group-hover/category:hidden">
                        {category}
                      </div>
                      <CloseIcon className="hidden group-hover/category:block" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 px-1">
              <div className="flex items-center gap-2">
                <DateIcon ui_size="small" />
                <span className="text-label-small">DATE</span>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  ui_color="secondary"
                  className="flex animate-fadeIn items-center justify-between gap-4 px-4"
                  onClick={() => {
                    setTimeout(() => {
                      document.getElementById(DATE_SECTION_ID)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 100);
                  }}
                >
                  <div className="flex items-center gap-2 text-label-large">
                    {dateRange}
                  </div>
                  <SettingsIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full shrink-0 snap-start overflow-y-auto p-5 scrollbar-none">
          <JournalSection data={filter} />
        </div>
        <div className="w-full shrink-0 snap-start overflow-y-auto p-5 scrollbar-none">
          <CategorySection data={filter} />
        </div>
        <div className="w-full shrink-0 snap-start overflow-y-auto p-5 scrollbar-none">
          <DateSection data={filter} />
        </div>
      </Settings.Tab.Content>
    </Settings.Tab.Root>
  );
}
