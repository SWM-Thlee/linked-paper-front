import * as UiAccordion from "@radix-ui/react-accordion";
import { tv, VariantProps } from "@/utils/tailwind-variants";
import React from "react";

export const accordionVariant = tv({
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
        item: ["first:rounded-t-[0.5rem]", "last:rounded-b-[0.5rem]"],
        trigger: ["p-2.5", "text-label-medium"],
        content: ["p-2.5", "text-label-medium"],
      },
      medium: {
        item: ["first:rounded-t-[0.5rem]", "last:rounded-b-[0.5rem]"],
        trigger: ["p-3.5", "text-label-medium"],
        content: ["p-3.5", "text-label-medium"],
      },
      large: {
        item: ["first:rounded-t-[1rem]", "last:rounded-b-[1rem]"],
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

type Props = {
  ui_trigger: React.ReactNode;
  ui_content: React.ReactNode;
} & VariantProps<typeof accordionVariant> &
  UiAccordion.AccordionItemProps &
  React.ComponentPropsWithoutRef<"div">;

const AccordionItem = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      ui_trigger: triggerElement,
      ui_content: contentElement,
      ui_color,
      ui_size,
      className,
      ...props
    }: Props,
    ref,
  ) => {
    const { item, contentWrapper, content, header, trigger } = accordionVariant(
      {
        ui_color,
        ui_size,
      },
    );

    return (
      <UiAccordion.Item ref={ref} className={item({ className })} {...props}>
        <UiAccordion.Header className={header()}>
          <UiAccordion.Trigger className={trigger()}>
            {triggerElement}
          </UiAccordion.Trigger>
        </UiAccordion.Header>
        <UiAccordion.Content className={contentWrapper()}>
          <div className={content()}>{contentElement}</div>
        </UiAccordion.Content>
      </UiAccordion.Item>
    );
  },
);

AccordionItem.displayName = "AccordionItem";

export default AccordionItem;
