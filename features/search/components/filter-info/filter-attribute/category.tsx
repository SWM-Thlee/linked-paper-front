"use client";

import { useMemo } from "react";

import { Search } from "@/features/search/types";
import useCategories, { CategoryUnknown } from "@/hooks/use-categories";
import Button from "@/ui/button";
import CategoryIcon from "@/ui/icons/category";
import { ContentContainer, KeyContainer } from "./common";

export function CategoryKey() {
  return (
    <KeyContainer>
      <CategoryIcon /> Category
    </KeyContainer>
  );
}

// TODO: Data 일관성 수정하기 (FilterData? Search.Data?)
type Props = Search.Data["attributes"]["category"];

export function CategoryContent({ value }: Props) {
  const { getInfo } = useCategories();

  // TODO: getInfo()의 Default Value를 통일화하자.
  const infoOfCategories = useMemo(
    () =>
      Object.values(value ?? {}).map(({ itemValue: { categoryID } }) => ({
        categoryID,
        ...(getInfo(categoryID) ?? {
          subject: CategoryUnknown,
          description: "",
        }),
      })),
    [getInfo, value],
  );

  return (
    <ContentContainer>
      {value && Object.keys(value).length ? (
        infoOfCategories.map(({ subject, categoryID, description }) => {
          return (
            <Button
              ui_variant="light"
              ui_color={subject !== CategoryUnknown ? "primary" : "secondary"}
              ui_size="small"
              key={categoryID}
            >
              <div className="flex items-center justify-between gap-6">
                <div className="break-keep text-left">
                  {description ?? "Unknown"}
                </div>
                <div className="text-nowrap text-right text-label-large">
                  {categoryID}
                </div>
              </div>
            </Button>
          );
        })
      ) : (
        <Button ui_variant="light" ui_color="tertiary" ui_size="small">
          All Categories
        </Button>
      )}
    </ContentContainer>
  );
}
