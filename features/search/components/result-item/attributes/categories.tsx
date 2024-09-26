"use client";

import { useMemo } from "react";

import { group, representative } from "@/features/search/utils/group";
import { PaperMetadata } from "@/types/paper";
import Button from "@/ui/button";
import { Popover } from "@/ui/popover";
import CategoryIcon from "@/ui/icons/category";
import { Category } from "@/utils/category";

type Props = Pick<PaperMetadata, "categories">;

function Categories({ categories }: Props) {
  // 각 하위 분류에 대한 상세 설명
  const descriptions = useMemo(
    () =>
      categories.reduce<{ [category: string]: string }>(
        (result, category) => ({
          ...result,
          [category]: Category[category]?.description ?? "Unclassified",
        }),
        {},
      ),
    [categories],
  );

  return (
    <div className="grid gap-2">
      {categories.map((category) => (
        <div
          key={category}
          className="flex items-center justify-between gap-12 rounded-circle bg-light-secondaryContainer px-4 py-1.5 text-light-onSecondaryContainer dark:bg-dark-secondaryContainer dark:text-dark-onSecondaryContainer"
        >
          <div className="text-nowrap text-title-medium">
            {descriptions[category]}
          </div>
          <div className="text-nowrap text-label-large">{category}</div>
        </div>
      ))}
    </div>
  );
}

// 해당 논문의 하위 분류를 표시하는 버튼 컴포넌트입니다.
export default function SearchResultAttributeCategories({ categories }: Props) {
  // 상위 분류를 기준으로 그룹화
  const categoryGroup = useMemo(() => group(categories), [categories]);

  // 특정 규칙에 따라 간략화된 분류
  const title = useMemo(() => representative(categoryGroup), [categoryGroup]);

  // 하위 분류의 개수
  const amount = useMemo(
    () =>
      categories.length
        ? categories.length > 1
          ? `${categories.length} Categories`
          : "Category"
        : "Categories Unclassified",
    [categories.length],
  );

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          ui_color="secondary"
          ui_variant="light"
          className="flex items-center gap-4"
        >
          <CategoryIcon ui_size="small" /> {title}
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div className="text-title-large">{amount}</div>
          </div>
          <div className="flex max-h-[25vh] flex-col gap-6 overflow-y-auto scrollbar">
            {!!categories.length &&
              Object.entries(categoryGroup).map(([groupName, categoryIds]) => (
                <div key={groupName} className="flex flex-col gap-2">
                  <div className="text-body-large">{groupName}</div>
                  <Categories categories={categoryIds} />
                </div>
              ))}
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
