"use client";

import { useMemo } from "react";

import { Search } from "@/features/search/types";
import useCategories from "@/hooks/use-categories";
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

export function CategoryContent({
  value,
}: Search.Data["attributes"]["category"]) {
  const { index } = useCategories();

  const info = useMemo(
    () =>
      Object.entries(value ?? []).map(
        ([
          itemID,
          {
            info: [id],
          },
        ]) => [itemID, id],
      ),
    [value],
  );

  return (
    <ContentContainer>
      {value && Object.keys(value).length ? (
        info.map(([itemID, id]) => {
          const journalInfo = index(id);

          return (
            <Button
              ui_variant="light"
              ui_color={journalInfo ? "primary" : "secondary"}
              ui_size="small"
              key={itemID}
            >
              <div className="flex items-center justify-between gap-6">
                <div className="break-keep text-left">
                  {index(id)?.description ?? "Unspecified"}
                </div>
                <div className="text-nowrap text-right text-label-large">
                  {id}
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
