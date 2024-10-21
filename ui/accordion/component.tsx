"use client";

import { forwardRef } from "react";
import * as Primitive from "@radix-ui/react-accordion";

import { tv, VariantProps } from "@/utils/style/tailwind-variants";

export type AccordionRootProps =
  | Primitive.AccordionSingleProps
  | Primitive.AccordionMultipleProps;

export function Root({ children, ...props }: AccordionRootProps) {
  return <Primitive.Accordion {...props}>{children}</Primitive.Accordion>;
}

export const accordionItemVariant = tv({
  slots: {
    item: ["focus-within:relative", "mt-px", "overflow-hidden"],
    header: ["flex"],
    trigger: [
      "group",
      "flex",
      "flex-1",
      "items-center",
      "outline-none",
      "transition-all",
      "duration-300",
      "text-left",
    ],
    contentWrapper: [
      "data-[state=open]:animate-slideDown",
      "data-[state=closed]:animate-slideUp",
      "overflow-hidden",
      "transition-all",
      "duration-300",
    ],
    content: [],
  },
  variants: {
    ui_color: {
      primary: {
        trigger: [
          "bg-light-primaryContainer",
          "text-light-onPrimaryContainer",
          "dark:bg-dark-primaryContainer",
          "dark:text-dark-onPrimaryContainer",
        ],
        content: [
          "bg-light-primary",
          "text-light-onPrimary",
          "dark:bg-dark-primary",
          "dark:text-dark-onPrimary",
        ],
      },
      secondary: {
        trigger: [
          "bg-light-secondaryContainer",
          "text-light-onSecondaryContainer",
          "dark:bg-dark-secondaryContainer",
          "dark:text-dark-onSecondaryContainer",
        ],
        content: [
          "bg-light-secondary",
          "text-light-onSecondary",
          "dark:bg-dark-secondary",
          "dark:text-dark-onSecondary",
        ],
      },
      tertiary: {
        trigger: [
          "bg-light-tertiaryContainer",
          "text-light-onTertiaryContainer",
          "dark:bg-dark-tertiaryContainer",
          "dark:text-dark-onTertiaryContainer",
        ],
        content: [
          "bg-light-tertiary",
          "text-light-onTertiary",
          "dark:bg-dark-tertiary",
          "dark:text-dark-onTertiary",
        ],
      },
    },
    ui_size: {
      small: {
        item: ["first:rounded-t-2", "last:rounded-b-2"],
        trigger: ["p-2.5", "text-label-medium"],
        content: ["p-2.5", "text-label-medium"],
      },
      medium: {
        item: ["first:rounded-t-2", "last:rounded-b-2"],
        trigger: ["p-3.5", "text-label-medium"],
        content: ["p-3.5", "text-label-medium"],
      },
      large: {
        item: ["first:rounded-t-4", "last:rounded-b-4"],
        trigger: ["p-4", "text-label-large"],
        content: ["p-4", "text-label-large"],
      },
    },
  },
  defaultVariants: {
    ui_color: "primary",
    ui_size: "medium",
  },
});

export interface AccordionItemProps
  extends Primitive.AccordionItemProps,
    VariantProps<typeof accordionItemVariant> {
  itemTrigger: React.ReactNode;
}

export const Item = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ itemTrigger, children, ui_color, ui_size, className, ...props }, ref) => {
    const { item, contentWrapper, content, header, trigger } =
      accordionItemVariant({
        ui_color,
        ui_size,
      });

    return (
      <Primitive.Item ref={ref} className={item({ className })} {...props}>
        <Primitive.Header className={header()}>
          <Primitive.Trigger className={trigger()}>
            {itemTrigger}
          </Primitive.Trigger>
        </Primitive.Header>
        <Primitive.Content className={contentWrapper()}>
          <div className={content()}>{children}</div>
        </Primitive.Content>
      </Primitive.Item>
    );
  },
);

Item.displayName = "AccordionItem";
