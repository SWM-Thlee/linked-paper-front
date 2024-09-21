"use client";

import React from "react";
import { tv, VariantProps } from "@/utils/tailwind-variants";
import { sem } from "@/utils/semantic-styles";

import IconButton from "@/ui/icon-button";
import MenuIcon from "@/ui/icons/menu";
import { Popover } from "@/ui/popover";
import FieldContainer from "@/ui/container/field-container";
import { AttributeDefaultRenderer } from "./default-renderer";
import { Filter } from "../../types";

const filterInfoVariant = tv({
  slots: {
    container: sem()
      .layout([
        "grid grid-cols-[minmax(10rem,_1fr)_4fr]",
        "rounded-4",
        "overflow-hidden",
        "border-2",
      ])
      .color(["border-light-outlineVariant", "dark:border-dark-outlineVariant"])
      .build(),
    header: sem()
      .layout([
        "col-span-2",
        "flex items-center gap-2",
        "border-none",
        "px-6 py-4",
      ])
      .color([
        "bg-light-surfaceContainerHighest",
        "text-light-onSurface",
        "dark:bg-dark-surfaceContainerHighest",
        "dark:text-dark-onSurface",
      ])
      .build(),
    title: sem()
      .layout([
        "flex-1",
        "text-ellipsis",
        "text-nowrap",
        "overflow-hidden",
        "text-title-medium",
      ])
      .build(),
    attributeKey: sem()
      .layout([
        "flex flex-col justify-center",
        "gap-4",
        "border-none",
        "px-6 py-4",
        "text-label-large",
      ])
      .color([
        "bg-light-surfaceContainer",
        "text-light-onSurface",
        "dark:bg-dark-surfaceContainer",
        "dark:text-dark-onSurface",
      ])
      .build(),
    attributeContent: sem()
      .layout(["flex flex-wrap gap-4", "border-none", "p-4"])
      .color([
        "bg-light-surfaceContainerLowest",
        "text-light-onSecondaryContainer",
        "dark:bg-dark-surfaceContainerLowest",
        "dark:text-dark-onSecondaryContainer",
      ])
      .build(),
  },
});

type Props<T extends Filter.Build.FeatureID> = {
  data: Filter.Build.Data<T>;
  store: Filter.Store.Type;
  description?: string;
} & VariantProps<typeof filterInfoVariant>;

/** FilterInfo의 네 부분을 직접 Customize할 수 있습니다. */
export type CustomizedFilterInfoProps<T extends Filter.Build.FeatureID> = {
  extend?: CustomizedFilterInfo<T>;
  title?: (
    data: Filter.Build.Data<T>,
    store: Filter.Store.Type,
  ) => React.ReactNode;
  options?: (
    data: Filter.Build.Data<T>,
    store: Filter.Store.Type,
  ) => React.ReactNode;

  // Case 1. 직렬화된 데이터만을 이용하여 순수 컴포넌트를 만듭니다.
  attributeKey?: (key: Filter.Build.Attribute<T>) => React.ReactNode;
  attributeContent?: (entry: Filter.Build.AttributeEntry<T>) => React.ReactNode;

  // Case 2. 직접 Filter 정보를 이용하여 컴포넌트를 만듭니다.
  attributeKeyCustom?: (
    key: Filter.Build.Attribute<T>,
    data: Filter.Build.Data<T>,
    store: Filter.Store.Type,
  ) => React.ReactNode;
  attributeContentCustom?: (
    key: Filter.Build.Attribute<T>,
    data: Filter.Build.Data<T>,
    store: Filter.Store.Type,
  ) => React.ReactNode;

  // 순서를 고정합니다.
  order?: Filter.Build.Attribute<T>[];
};

type CustomizedFilterInfo<T extends Filter.Build.FeatureID> = {
  attributes: Omit<CustomizedFilterInfoProps<T>, "extend">;
} & ((props: Props<T>) => React.ReactNode);

/** FilterInfo 컴포넌트의 틀은 유지하되, 각 Feature에 맞춰 컴포넌트를 Customize할 수 있도록 제공합니다. */
export function CustomizedFilterInfo<T extends Filter.Build.FeatureID>({
  extend,
  title: _title,
  options: _options,
  attributeKey: _attributeKey,
  attributeContent: _attributeContent,
  attributeKeyCustom: _attributeKeyCustom,
  attributeContentCustom: _attributeContentCustom,
  order: _order,
}: CustomizedFilterInfoProps<T>): CustomizedFilterInfo<T> {
  // 기존 컴포넌트의 Attributes와 merge합니다. (= 재활용할 수 있으면 재활용합니다.)
  const attributes: Omit<CustomizedFilterInfoProps<T>, "extend"> = {
    title: _title ?? extend?.attributes.title,
    options: _options ?? extend?.attributes.options,
    attributeKey: _attributeKey ?? extend?.attributes.attributeKey,
    attributeContent: _attributeContent ?? extend?.attributes.attributeContent,
    attributeKeyCustom:
      _attributeKeyCustom ?? extend?.attributes.attributeKeyCustom,
    attributeContentCustom:
      _attributeContentCustom ?? extend?.attributes.attributeContentCustom,
    order: _order ?? extend?.attributes.order,
  };

  /* eslint-disable react/function-component-definition */
  const FilterInfo = ({ data, description, store }: Props<T>) => {
    const { container, header, title, attributeKey, attributeContent } =
      filterInfoVariant();

    const entries = (
      attributes.order
        ? attributes.order.map((key) => [
            key,
            (data.attributes as Filter.Build.Data<T>["attributes"])[key],
          ])
        : Object.entries(data.attributes)
    ) as Filter.Build.AttributeEntry<T>[];

    return (
      <div className={container()}>
        <div className={header()}>
          <div className={title()}>
            {attributes.title?.(data, store) ?? data.name}
          </div>
          {(description || attributes.options) && (
            <Popover.Root>
              <Popover.Trigger>
                <IconButton ui_size="large">
                  <MenuIcon ui_size="small" />
                </IconButton>
              </Popover.Trigger>
              <Popover.Content
                side="right"
                className="flex w-[20rem] flex-col gap-4"
              >
                {description && (
                  <FieldContainer
                    ui_size="medium"
                    ui_variant="bordered"
                    title="INFO"
                    className="text-body-large"
                  >
                    {description}
                  </FieldContainer>
                )}
                {attributes.options && (
                  <FieldContainer title="OPTIONS" ui_size="medium">
                    <div className="flex flex-col gap-2">
                      {attributes.options(data, store)}
                    </div>
                  </FieldContainer>
                )}
              </Popover.Content>
            </Popover.Root>
          )}
        </div>
        {entries.map(([key, content]) => (
          <React.Fragment key={key}>
            <div className={attributeKey()}>
              {attributes.attributeKeyCustom?.(
                key as Filter.Build.Attribute<T>,
                data,
                store,
              ) ??
                attributes.attributeKey?.(key as Filter.Build.Attribute<T>) ??
                key}
            </div>
            <div className={attributeContent()}>
              {attributes.attributeContentCustom?.(
                key as Filter.Build.Attribute<T>,
                data,
                store,
              ) ??
                attributes.attributeContent?.([
                  key,
                  content,
                ] as Filter.Build.AttributeEntry<T>) ??
                AttributeDefaultRenderer(content)}
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  };

  // 해당 컴포넌트의 요소를 재활용할 수 있도록 별도의 Attributes를 제공합니다.
  Object.defineProperty(FilterInfo, "attributes", {
    value: attributes,
  });

  return FilterInfo as CustomizedFilterInfo<T>;
}

// 기본 컴포넌트
export const DefaultFilterInfo = CustomizedFilterInfo({});
