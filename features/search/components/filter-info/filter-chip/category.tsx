"use client";

import { useMemo, useState } from "react";

import { FilterData } from "@/features/filter/types/filter";
import { Search } from "@/features/search/types";
import { matcher } from "@/features/search/utils/matcher";
import useCategories, { CategoryGroup } from "@/hooks/use-categories";
import SearchField from "@/ui/search";
import CategoryIcon from "@/ui/icons/category";
import LabelButton from "@/ui/label-button";
import { Popover } from "@/ui/popover";
import { Category } from "@/utils/category";
import FieldContainer from "@/ui/container/field-container";
import Button from "@/ui/button";
import ArrowDownIcon from "@/ui/icons/arrow-down";

type Props = {
  data: FilterData<Search.Type>["attributes"]["category"];
};

/**
 * 특정 Search Filter의 Category 정보를 보여줍니다.
 */
export function CategoryChip({ data: { value } }: Props) {
  const { getGroups, getRepresentative } = useCategories();
  const [matchText, setMatchText] = useState("");

  const search = useMemo(
    () =>
      matcher({ include: [matchText], ignoreCase: true, ignoreSpace: true }),
    [matchText],
  );

  const idOfCategories = useMemo(
    () =>
      Object.values(value ?? {}).map(
        ({ itemValue: { categoryID } }) => categoryID,
      ),
    [value],
  );

  const groupsOfCategories = useMemo(
    () => getGroups(idOfCategories),
    [idOfCategories, getGroups],
  );

  const titleOfChip = useMemo(
    () => getRepresentative(groupsOfCategories) ?? "Not Selected",
    [groupsOfCategories, getRepresentative],
  );

  const matchedResult = useMemo(
    () =>
      Object.entries(groupsOfCategories).reduce<CategoryGroup>(
        (result, [subject, categories]) => {
          const matchedCategories = Object.entries(categories).reduce<Category>(
            (resultCategories, [categoryID, info]) => {
              if (
                search(categoryID) ||
                search(info.subject) ||
                search(info.description)
              )
                return { ...resultCategories, [categoryID]: info };

              return resultCategories;
            },
            {},
          );

          const hasResult = Object.keys(matchedCategories).length > 0;

          return hasResult
            ? { ...result, [subject]: matchedCategories }
            : result;
        },
        {},
      ),
    [groupsOfCategories, search],
  );

  const matchedResultSize = useMemo(
    () =>
      Object.entries(matchedResult).reduce(
        (total, [, category]) => total + Object.keys(category).length,
        0,
      ),
    [matchedResult],
  );

  const titleOfDetails =
    matchedResultSize > 0
      ? `${matchedResultSize} Categor${matchedResultSize > 1 ? "ies" : "y"}`
      : "Not Found";

  // Category의 개수가 10개를 초과할 경우 검색 필드를 보이게 합니다.
  const visibleSearch = idOfCategories.length > 10;
  const hasMatchedResult = matchedResultSize > 0;

  return (
    <Popover.Root>
      <Popover.Trigger>
        <LabelButton ui_color="secondary" ui_size="medium">
          <CategoryIcon ui_size="small" /> {titleOfChip}
          <ArrowDownIcon ui_size="small" />
        </LabelButton>
      </Popover.Trigger>
      <Popover.Content className="w-[25rem]" ui_size="large">
        <div className="flex flex-col gap-4">
          <div className="flex select-none flex-col gap-2 text-title-medium">
            <CategoryIcon ui_size="medium" />
            {titleOfDetails}
          </div>
          {visibleSearch && (
            <SearchField
              value={matchText}
              onChange={(e) => setMatchText(e.target.value)}
              ui_size="medium"
              ui_color="secondary"
              defaultPlaceholder="Find Categories..."
            />
          )}
          {hasMatchedResult && (
            <div className="flex max-h-[20rem] flex-col gap-4 overflow-y-auto scrollbar">
              {Object.entries(matchedResult).map(([subject, categories]) => (
                <FieldContainer key={subject} title={subject} ui_size="medium">
                  <div className="flex flex-col gap-2">
                    {Object.entries(categories).map(([categoryID, info]) => (
                      <Button
                        key={categoryID}
                        ui_variant="light"
                        ui_size="small"
                        ui_color="secondary"
                        className="flex justify-between gap-2"
                      >
                        <div className="text-left">{info.description}</div>

                        <div className="text-nowrap text-label-large">
                          {categoryID}
                        </div>
                      </Button>
                    ))}
                  </div>
                </FieldContainer>
              ))}
            </div>
          )}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
