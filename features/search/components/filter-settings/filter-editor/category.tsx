"use client";

import { useCallback, useContext, useMemo, useState } from "react";

import CheckIcon from "@/ui/icons/check";
import RestoreIcon from "@/ui/icons/restore";
import CategoryIcon from "@/ui/icons/category";
import { Settings } from "@/ui/settings";
import Button from "@/ui/button";
import SearchField from "@/ui/search-field";
import CheckBox from "@/ui/check-box";
import LabelButton from "@/ui/label-button";
import useTabID from "@/ui/settings/hooks/use-tab-id";
import useSettings from "@/ui/settings/hooks/use-settings-container";
import useBidirectionalState from "@/hooks/use-bidirectional-state";
import useCategories from "@/hooks/use-categories";
import { Subject } from "@/utils/category";
import { matcher } from "@/features/search/utils/matcher";
import { TAB_CATEGORY } from "@/features/search/types/tab";
import { Search } from "@/features/search/types";
import { EditorContext } from "./context";

function CategoryElement({
  categoryID,
  description,
}: {
  categoryID: string;
  description: string;
}) {
  const edit = useContext(EditorContext);
  const categories = edit?.editor?.attributes.category.value;

  const [selected, setSelected] = useBidirectionalState(
    !!categories?.[categoryID],
    !!categories?.[categoryID],
    (data) => {
      edit?.patch((draft) => {
        if (data) {
          if (!draft.attributes.category.value) {
            draft.attributes.category.value = {
              [categoryID]: {
                itemID: categoryID,
                itemValue: { categoryID },
              },
            };
          } else {
            draft.attributes.category.value[categoryID] = {
              itemID: categoryID,
              itemValue: { categoryID },
            };
          }
        } else if (draft.attributes.category.value?.[categoryID]) {
          delete draft.attributes.category.value[categoryID];
        }
      });
    },
  );

  return (
    <div key={categoryID} className="flex items-center gap-4">
      <CheckBox
        checked={selected}
        onCheckedChange={(checked) => setSelected(checked !== false)}
      />
      <div className="flex flex-1 items-center justify-between gap-16">
        <div className="text-title-medium">{description}</div>
        <div className="text-label-large">{categoryID}</div>
      </div>
    </div>
  );
}

export default function EditorCategory() {
  const tabID = useTabID(TAB_CATEGORY.ID);
  const { getCategories, getSubjects } = useCategories();

  const [text, setText] = useState("");
  const [checkedOnly, setCheckedOnly] = useState(false);

  const edit = useContext(EditorContext);
  const settings = useSettings();

  const search = useMemo(
    () => matcher({ include: [text], ignoreCase: true, ignoreSpace: true }),
    [text],
  );

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
          if (
            !checkedOnly ||
            (checkedOnly &&
              edit?.editor?.attributes.category.value?.[categoryID])
          )
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
  }, [checkedOnly, result, edit?.editor?.attributes.category.value]);

  const selectAll = useCallback(() => {
    edit?.patch((draft) => {
      draft.attributes.category.value = getSubjects().reduce(
        (subjectResult, subject) => ({
          ...subjectResult,
          ...Search.Category(Object.keys(getCategories(subject))),
        }),
        {},
      );
    });
  }, [edit, getCategories, getSubjects]);

  const unselectAll = useCallback(() => {
    edit?.patch((draft) => {
      draft.attributes.category.value = {};
    });
  }, [edit]);

  const backToPreview = useCallback(() => {
    settings.setTabID(null);
  }, [settings]);

  return (
    <Settings.Tab.Root
      name={TAB_CATEGORY.ID}
      id={tabID}
      title={TAB_CATEGORY.TITLE}
      description={TAB_CATEGORY.DESCRIPTION}
    >
      <Settings.Tab.Title>
        <div className="flex items-center gap-4">
          <CategoryIcon ui_size="small" /> Category
        </div>
      </Settings.Tab.Title>
      <Settings.Tab.Content>
        <div className="mb-16 mt-8 flex flex-col gap-8 overflow-hidden">
          <div className="flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckBox
                  checked={checkedOnly}
                  onCheckedChange={(checked) =>
                    setCheckedOnly(checked !== false)
                  }
                />
                Selected Only
              </div>
              <div className="flex gap-2">
                <Button
                  ui_color="secondary"
                  ui_variant="light"
                  ui_size="small"
                  onClick={selectAll}
                >
                  Select All
                </Button>
                <Button
                  ui_color="secondary"
                  ui_variant="light"
                  ui_size="small"
                  onClick={unselectAll}
                >
                  Unselect All
                </Button>
              </div>
            </div>
            <SearchField
              value={text}
              onChange={(e) => setText(e.target.value)}
              ui_color="tertiary"
              ui_size="medium"
            />
            <div className="flex flex-col gap-12 overflow-y-auto rounded-2 p-4 ring-2 ring-inset ring-light-outlineVariant scrollbar dark:ring-dark-outlineVariant">
              {Object.entries(selection).map(([subject, category]) => (
                <div key={subject} className="flex flex-col gap-2">
                  <div className="text-label-large">
                    {subject.toUpperCase()}
                  </div>
                  {Object.entries(category).map(([categoryID, description]) => (
                    <CategoryElement
                      key={categoryID}
                      categoryID={categoryID}
                      description={description}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Settings.Tab.Content>
      <Settings.Tab.Options>
        {edit?.isModified && (
          <>
            <LabelButton
              onClick={() => {
                edit?.apply(true);
                backToPreview();
              }}
            >
              <CheckIcon ui_size="small" />
              Save
            </LabelButton>
            <LabelButton
              ui_color="secondary"
              onClick={() => edit?.reset({ attributes: ["category"] })}
            >
              <RestoreIcon ui_size="small" />
              Set Category to Defaults
            </LabelButton>
          </>
        )}
      </Settings.Tab.Options>
    </Settings.Tab.Root>
  );
}
