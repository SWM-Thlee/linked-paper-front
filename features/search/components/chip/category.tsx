"use client";

import { Fragment, useMemo, useState } from "react";

import useCategories, { CategoryGroup } from "@/hooks/use-categories";
import { matcher } from "@/features/search/utils/matcher";
import { Category } from "@/utils/category";
import CategoryIcon from "@/ui/icons/category";
import ArrowDownIcon from "@/ui/icons/arrow-down";
import SearchField from "@/ui/search-field";
import LabelButton from "@/ui/label-button";
import { Popover } from "@/ui/popover";
import FieldContainer from "@/ui/container/field-container";
import Button from "@/ui/button";

type Props = {
  categoryIDs: string[];
  children?: (titleOfChip: string) => React.ReactNode;
};

export function CategoryChip({ categoryIDs, children }: Props) {
  const { getGroups, getRepresentative } = useCategories();
  const [matchText, setMatchText] = useState("");

  const search = useMemo(
    () =>
      matcher({ include: [matchText], ignoreCase: true, ignoreSpace: true }),
    [matchText],
  );

  const groupsOfCategories = useMemo(
    () => getGroups(categoryIDs),
    [categoryIDs, getGroups],
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
            (resultCategories, [categoryID, info]) =>
              search(categoryID) ||
              search(info.subject) ||
              search(info.description)
                ? { ...resultCategories, [categoryID]: info }
                : resultCategories,
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
  const visibleSearch = categoryIDs.length > 10;
  const hasMatchedResult = matchedResultSize > 0;

  return (
    <Popover.Root>
      <Popover.Trigger>
        {children?.(titleOfChip) ?? (
          <LabelButton>
            <CategoryIcon ui_size="small" /> {titleOfChip}
            <ArrowDownIcon ui_size="small" />
          </LabelButton>
        )}
      </Popover.Trigger>
      <Popover.Content ui_size="large">
        <div className="flex flex-col gap-6">
          <div className="select-none text-title-medium">{titleOfDetails}</div>
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
                  <div className="grid grid-cols-[3fr_1fr] gap-y-2">
                    {Object.entries(categories).map(([categoryID, info]) => (
                      <Fragment key={categoryID}>
                        <Button
                          ui_variant="light"
                          ui_size="small"
                          ui_color="secondary"
                          className="flex items-center gap-2 text-nowrap rounded-r-0"
                        >
                          <CategoryIcon ui_size="small" />
                          {info.description}
                        </Button>
                        <Button
                          ui_variant="light"
                          ui_size="small"
                          ui_color="tertiary"
                          className="text-nowrap rounded-l-0 text-left text-label-large"
                        >
                          {categoryID}
                        </Button>
                      </Fragment>
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
