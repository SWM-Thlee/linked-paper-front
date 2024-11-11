"use client";

import { useCallback, useMemo, useState } from "react";
import { produce } from "immer";

import SearchField from "@/ui/search-field";
import CheckBox from "@/ui/check-box";
import useCategories from "@/features/paper/hooks/use-categories";
import { matcher } from "@/features/search/utils/matcher";
import { Search } from "@/features/search/types";
import { Category, Subject } from "@/features/paper/utils/cs-category";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import { Analytics } from "@/features/analytics/types";
import useFilters from "@/features/filter/hooks/use-filters";
import { searchFilterForAnalytics } from "@/features/analytics/utils/filter";
import CheckIcon from "@/ui/icons/check";
import CloseIcon from "@/ui/icons/close";
import ArrowBackIcon from "@/ui/icons/arrow-back";
import LabelButton from "@/ui/label-button";
import { CATEGORY_SECTION_ID, FILTER_SETTINGS_ID } from "../section-id";

export default function CategorySection({
  data,
}: {
  data: Search.Filter.Scheme;
}) {
  const { log } = useAnalytics();
  const { dispatch } = useFilters();
  const { getCategories, getSubjects } = useCategories({
    category: Category,
    subject: Subject,
  });

  const [text, setText] = useState("");
  const [checkedOnly, setCheckedOnly] = useState(false);

  const search = useMemo(
    () => matcher({ include: [text], ignoreCase: true, ignoreSpace: true }),
    [text],
  );

  const {
    attributes: { category: selectedCategories },
  } = data;

  const result = useMemo(
    () =>
      getSubjects().reduce<Subject>((subjectResult, subject) => {
        const filteredCategories = Object.entries(
          getCategories(subject),
        ).reduce<Subject[string]>(
          (categoryResult, [categoryID, description]) => {
            if (search(categoryID) || search(description) || search(subject))
              return { ...categoryResult, [categoryID]: description };

            return categoryResult;
          },
          {},
        );

        return Object.keys(filteredCategories).length
          ? { ...subjectResult, [subject]: filteredCategories }
          : subjectResult;
      }, {}),
    [getCategories, getSubjects, search],
  );

  const selection = useMemo(() => {
    return Object.entries(result).reduce<Subject>(
      (subjectResult, [subject, category]) => {
        const filteredCategories = Object.entries(category).reduce<
          Subject[string]
        >((categoryResult, [categoryID, description]) => {
          if (!checkedOnly || selectedCategories.includes(categoryID))
            return { ...categoryResult, [categoryID]: description };

          return categoryResult;
        }, {});

        return Object.keys(filteredCategories).length
          ? {
              ...subjectResult,
              [subject]: filteredCategories,
            }
          : subjectResult;
      },
      {},
    );
  }, [checkedOnly, result, selectedCategories]);

  const selectAll = useCallback(() => {
    const newFilter = produce(data, (draft) => {
      draft.attributes.category = getSubjects().reduce<string[]>(
        (subjectResult, subject) => [
          ...subjectResult,
          ...Object.keys(getCategories(subject)),
        ],
        [],
      );
    });

    dispatch(newFilter);
    log(Analytics.Event.CREATE_FILTER, searchFilterForAnalytics(newFilter));
  }, [dispatch, data, log, getSubjects, getCategories]);

  const select = useCallback(
    (category: string) => {
      const newFilter = produce(data, (draft) => {
        draft.attributes.category = draft.attributes.category
          .filter((c) => c !== category)
          .concat(category);
      });

      dispatch(newFilter);
      log(Analytics.Event.CREATE_FILTER, searchFilterForAnalytics(newFilter));
    },
    [dispatch, data, log],
  );

  const unselect = useCallback(
    (category: string) => {
      const newFilter = produce(data, (draft) => {
        draft.attributes.category = draft.attributes.category.filter(
          (j) => j !== category,
        );
      });

      dispatch(newFilter);
      log(Analytics.Event.CREATE_FILTER, searchFilterForAnalytics(newFilter));
    },
    [dispatch, data, log],
  );

  const unselectAll = useCallback(() => {
    const newFilter = produce(data, (draft) => {
      draft.attributes.category = [];
    });

    dispatch(newFilter);
    log(Analytics.Event.CREATE_FILTER, searchFilterForAnalytics(newFilter));
  }, [dispatch, data, log]);

  return (
    <div className="flex scroll-m-5 flex-col gap-8" id={CATEGORY_SECTION_ID}>
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
        <span className="text-label-large">Category Settings</span>
      </div>
      <div className="flex flex-col gap-4">
        <SearchField
          value={text}
          onChange={(e) => setText(e.target.value)}
          ui_color="tertiary"
          ui_size="small"
          disableSubmit
        />
        <div className="flex items-center justify-end gap-2">
          <LabelButton
            ui_variant={checkedOnly ? "default" : "bordered"}
            ui_color="tertiary"
            ui_size="small"
            onClick={() => setCheckedOnly((prev) => !prev)}
            className="flex items-center gap-2"
          >
            {checkedOnly ? <CheckIcon /> : <CloseIcon />}
            <span>View Selected</span>
          </LabelButton>
          <LabelButton
            ui_color="secondary"
            ui_variant="light"
            ui_size="small"
            onClick={selectAll}
          >
            Select All
          </LabelButton>
          <LabelButton
            ui_color="secondary"
            ui_variant="light"
            ui_size="small"
            onClick={unselectAll}
          >
            Unselect All
          </LabelButton>
        </div>
      </div>
      <div className="flex min-h-[50vh] flex-col gap-4 rounded-2 p-4 ring-2 ring-inset ring-light-outlineVariant scrollbar dark:ring-dark-outlineVariant">
        {Object.entries(selection).map(([subject, category]) => (
          <div key={subject} className="flex flex-col gap-2">
            <div className="text-label-large">{subject.toUpperCase()}</div>
            {Object.entries(category).map(([categoryID, description]) => (
              <div key={categoryID} className="flex items-center gap-4">
                <CheckBox
                  checked={selectedCategories.includes(categoryID)}
                  onCheckedChange={(checked) =>
                    checked !== false
                      ? select(categoryID)
                      : unselect(categoryID)
                  }
                />
                <div className="flex flex-1 items-center justify-between gap-16">
                  <div className="text-title-medium">{description}</div>
                  <div className="text-label-large">{categoryID}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
