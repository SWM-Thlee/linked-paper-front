"use client";

import { useMemo } from "react";

import useCategories from "@/hooks/use-categories";
import { Popover } from "@/ui/popover";
import CategoryIcon from "@/ui/icons/category";
import { PaperMetadata } from "@/types/paper";
import FieldContainer from "@/ui/container/field-container";
import LabelButton from "@/ui/label-button";

type Props = Pick<PaperMetadata, "categories">;

// 해당 논문의 하위 분류를 표시합니다.
export default function SearchResultAttributeCategories({ categories }: Props) {
  const { getGroups, getRepresentative } = useCategories();

  const groupsOfCategories = useMemo(
    () => getGroups(categories),
    [categories, getGroups],
  );

  const titleOfAttribute = useMemo(
    () => getRepresentative(groupsOfCategories),
    [groupsOfCategories, getRepresentative],
  );

  const titleOfDetails = useMemo(
    () =>
      categories.length
        ? categories.length > 1
          ? `${categories.length} Categories`
          : "Category"
        : "Categories Unclassified",
    [categories.length],
  );

  // TODO: UI Renweal
  return (
    <Popover.Root>
      <Popover.Trigger>
        <LabelButton ui_color="secondary" ui_size="small" ui_variant="light">
          <CategoryIcon ui_size="small" /> {titleOfAttribute}
        </LabelButton>
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div className="text-title-large">{titleOfDetails}</div>
          </div>
          <div className="flex max-h-[25vh] flex-col gap-6 overflow-y-auto scrollbar">
            {!!categories.length &&
              Object.entries(groupsOfCategories).map(
                ([subject, categoriesOfSubject]) => (
                  <FieldContainer key={subject} title={subject}>
                    {Object.entries(categoriesOfSubject).map(
                      ([categoryID, info]) => (
                        <div
                          key={categoryID}
                          className="flex items-center justify-between gap-12 rounded-circle bg-light-secondaryContainer px-4 py-1.5 text-light-onSecondaryContainer dark:bg-dark-secondaryContainer dark:text-dark-onSecondaryContainer"
                        >
                          <div className="text-nowrap text-title-medium">
                            {info.description}
                          </div>
                          <div className="text-nowrap text-label-large">
                            {categoryID}
                          </div>
                        </div>
                      ),
                    )}
                  </FieldContainer>
                ),
              )}
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
