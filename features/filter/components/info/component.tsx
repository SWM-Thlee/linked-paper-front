"use client";

import React from "react";
import { tv, VariantProps } from "@/utils/tailwind-variants";
import { sem } from "@/utils/semantic-styles";

import InfoTooltip from "@/ui/info-tooltip";
import InfoIcon from "@/ui/icons/info";
import { AttributeDefaultRenderer } from "./default-renderer";
import {
  FilterAttributeEntry,
  FilterAttributeKey,
  FilterData,
  FilterFeatureID,
} from "../../types/filter";
import { FilterStore } from "../../types/store";

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
        "flex",
        "items-center",
        "gap-2",
        "border-none",
        "px-6",
        "py-4",
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
        "only:w-full",
        "gap-4",
        "overflow-hidden",
        "text-ellipsis",
        "text-nowrap",
        "text-title-medium",
      ])
      .build(),
    options: sem()
      .layout(["flex", "flex-1", "items-center", "justify-end", "gap-2"])
      .build(),
    attributeKey: sem()
      .layout([
        "flex flex-col",
        "justify-center",
        "gap-4",
        "border-none",
        "px-6",
        "py-4",
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
      .layout(["flex flex-wrap", "gap-4", "border-none", "p-4"])
      .color([
        "bg-light-surfaceContainerLowest",
        "text-light-onSecondaryContainer",
        "dark:bg-dark-surfaceContainerLowest",
        "dark:text-dark-onSecondaryContainer",
      ])
      .build(),
  },
});

type Props<T extends FilterFeatureID> = {
  data: FilterData<T>;
  store: FilterStore;
  description?: string;
} & VariantProps<typeof filterInfoVariant>;

/** FilterInfo의 네 부분을 직접 Customize할 수 있습니다. */
export type CustomizedFilterInfoProps<T extends FilterFeatureID> = {
  extend?: CustomizedFilterInfo<T>;
  title?: (data: FilterData<T>, store: FilterStore) => React.ReactNode;
  options?: (data: FilterData<T>, store: FilterStore) => React.ReactNode;

  // Case 1. 직렬화된 데이터만을 이용하여 순수 컴포넌트를 만듭니다.
  attributeKey?: (key: FilterAttributeKey<T>) => React.ReactNode;
  attributeContent?: (entry: FilterAttributeEntry<T>) => React.ReactNode;

  // Case 2. 직접 Filter 정보를 이용하여 컴포넌트를 만듭니다.
  attributeKeyCustom?: (
    key: FilterAttributeKey<T>,
    data: FilterData<T>,
    store: FilterStore,
  ) => React.ReactNode;
  attributeContentCustom?: (
    key: FilterAttributeKey<T>,
    data: FilterData<T>,
    store: FilterStore,
  ) => React.ReactNode;

  // 순서를 고정합니다.
  order?: FilterAttributeKey<T>[];
};

type CustomizedFilterInfo<T extends FilterFeatureID> = {
  attributes: Omit<CustomizedFilterInfoProps<T>, "extend">;
} & ((props: Props<T>) => React.ReactNode);

/** FilterInfo 컴포넌트의 틀은 유지하되, 각 Feature에 맞춰 컴포넌트를 Customize할 수 있도록 제공합니다. */
export function CustomizedFilterInfo<T extends FilterFeatureID>({
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
    const {
      container,
      header,
      title,
      options,
      attributeKey,
      attributeContent,
    } = filterInfoVariant();

    const entries = (
      attributes.order
        ? attributes.order.map((key) => [
            key,
            (data.attributes as FilterData<T>["attributes"])[key],
          ])
        : Object.entries(data.attributes)
    ) as FilterAttributeEntry<T>[];

    return (
      <div className={container()}>
        <div className={header()}>
          <div className={title()}>
            {attributes.title?.(data, store) ?? data.name}
          </div>
          {description && (
            <InfoTooltip title={description}>
              <InfoIcon ui_size="small" />
            </InfoTooltip>
          )}
          {attributes.options && (
            <div className={options()}>{attributes.options(data, store)}</div>
          )}
        </div>
        {entries.map(([key, content]) => (
          <React.Fragment key={key}>
            <div className={attributeKey()}>
              {attributes.attributeKeyCustom?.(
                key as FilterAttributeKey<T>,
                data,
                store,
              ) ??
                attributes.attributeKey?.(key as FilterAttributeKey<T>) ??
                key}
            </div>
            <div className={attributeContent()}>
              {attributes.attributeContentCustom?.(
                key as FilterAttributeKey<T>,
                data,
                store,
              ) ??
                attributes.attributeContent?.([
                  key,
                  content,
                ] as FilterAttributeEntry<T>) ??
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
