"use client";

import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDeepCompareMemo } from "use-deep-compare";

import useCategories, {
  CategoryGroup,
} from "@/features/paper/hooks/use-categories";
import { matcher } from "@/features/search/utils/matcher";
import { Category } from "@/features/paper/utils/category";
import CategoryIcon from "@/ui/icons/category";
import SearchField from "@/ui/search-field";
import LabelButton from "@/ui/label-button";
import { Popover } from "@/ui/popover";
import FieldContainer from "@/ui/container/field-container";
import Button from "@/ui/button";
import { toArray } from "@/utils/array";
import CopyIcon from "@/ui/icons/copy";
import { copyToClipboard } from "@/utils/clipboard";

export interface CategoryChipProps extends React.ComponentPropsWithRef<"div"> {
  value?: string | string[];
}

export default function CategoryChip({
  value,
  ...titleProps
}: CategoryChipProps) {
  const { getGroups, getRepresentative } = useCategories();
  const [matchText, setMatchText] = useState("");

  const search = useMemo(
    () =>
      matcher({ include: [matchText], ignoreCase: true, ignoreSpace: true }),
    [matchText],
  );

  const categoryIDs = useDeepCompareMemo(() => toArray(value), [value]);

  const groupsOfCategories = useMemo(
    () => getGroups(categoryIDs),
    [categoryIDs, getGroups],
  );

  const title = useMemo(
    () => getRepresentative(groupsOfCategories) ?? "None",
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

  const copy = useCallback(
    (text: string) =>
      copyToClipboard(text, (success) => {
        if (success) {
          toast.success(`Copy: ${text}`);
        } else {
          toast.error(`Failed to Copy: ${text}`);
        }
      }),
    [],
  );

  // Category의 개수가 10개를 초과할 경우 검색 필드를 보이게 합니다.
  const visibleSearch = categoryIDs.length > 10;
  const hasMatchedResult = matchedResultSize > 0;

  return (
    <Popover.Root>
      <Popover.Trigger>
        <LabelButton ui_color="secondary" ui_variant="light">
          <CategoryIcon ui_size="small" />
          <div {...titleProps}>{title}</div>
        </LabelButton>
      </Popover.Trigger>
      {(hasMatchedResult || visibleSearch) && (
        <Popover.Content>
          <div className="flex flex-col gap-2">
            {visibleSearch && (
              <SearchField
                value={matchText}
                onChange={(e) => setMatchText(e.target.value)}
                ui_size="medium"
                ui_color="secondary"
                defaultPlaceholder="Find Categories..."
                disableSubmit
              />
            )}
            <div className="flex max-h-[20rem] flex-col gap-2 overflow-y-auto scrollbar">
              {Object.entries(matchedResult).map(([subject, categories]) => (
                <FieldContainer key={subject} field={subject} ui_size="medium">
                  <ul className="flex list-disc flex-col">
                    {Object.entries(categories).map(([categoryID, info]) => (
                      <div key={categoryID} className="flex items-center">
                        <Button
                          ui_variant="ghost"
                          ui_size="small"
                          ui_color="secondary"
                          className="group/category flex w-full flex-1 items-center justify-between gap-4 text-left"
                          onClick={() => copy(info.description)}
                        >
                          <li className="ml-2 max-w-[15rem] flex-1">
                            {info.description}
                          </li>
                          <CopyIcon
                            ui_size="small"
                            className="opacity-0 transition-opacity group-hover/category:opacity-100"
                          />
                        </Button>
                        <Button
                          ui_variant="ghost"
                          ui_size="small"
                          ui_color="tertiary"
                          className="group/categoryId flex items-center justify-between gap-2 text-nowrap text-label-large"
                          onClick={() => copy(categoryID)}
                        >
                          <CopyIcon
                            ui_size="small"
                            className="opacity-0 transition-opacity group-hover/categoryId:opacity-100"
                          />
                          <div>{categoryID}</div>
                        </Button>
                      </div>
                    ))}
                  </ul>
                </FieldContainer>
              ))}
            </div>
          </div>
        </Popover.Content>
      )}
    </Popover.Root>
  );
}
