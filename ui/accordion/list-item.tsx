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
      "outline-none",
      "transition-all",
      "duration-300",
      "data-[state=open]:scale-95",
      "data-[state=open]:translate-y-[1rem]",
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
        header: [
          "bg-light-primaryContainer",
          "text-light-onPrimaryContainer",
          "dark:bg-dark-primaryContainer",
          "dark:text-dark-onPrimaryContainer",
        ],
        trigger: [
          "bg-light-primaryContainer",
          "text-light-onPrimaryContainer",
          "dark:bg-dark-primaryContainer",
          "dark:text-dark-onPrimaryContainer",
          "data-[state=open]:bg-light-primary",
          "data-[state=open]:text-light-onPrimary",
          "dark:data-[state=open]:bg-dark-primary",
          "dark:data-[state=open]:text-dark-onPrimary",
        ],
        content: [
          "bg-light-primaryContainer",
          "text-light-onPrimaryContainer",
          "dark:bg-dark-primaryContainer",
          "dark:text-dark-onPrimaryContainer",
        ],
      },
      secondary: {
        header: [
          "bg-light-secondaryContainer",
          "text-light-onSecondaryContainer",
          "dark:bg-dark-secondaryContainer",
          "dark:text-dark-onSecondaryContainer",
        ],
        trigger: [
          "bg-light-secondaryContainer",
          "text-light-onSecondaryContainer",
          "dark:bg-dark-secondaryContainer",
          "dark:text-dark-onSecondaryContainer",
          "data-[state=open]:bg-light-secondary",
          "data-[state=open]:text-light-onSecondary",
          "dark:data-[state=open]:bg-dark-secondary",
          "dark:data-[state=open]:text-dark-onSecondary",
        ],
        content: [
          "bg-light-secondaryContainer",
          "text-light-onSecondaryContainer",
          "dark:bg-dark-secondaryContainer",
          "dark:text-dark-onSecondaryContainer",
        ],
      },
      tertiary: {
        header: [
          "bg-light-tertiaryContainer",
          "text-light-onTertiaryContainer",
          "dark:bg-dark-tertiaryContainer",
          "dark:text-dark-onTertiaryContainer",
        ],
        trigger: [
          "bg-light-tertiaryContainer",
          "text-light-onTertiaryContainer",
          "dark:bg-dark-tertiaryContainer",
          "dark:text-dark-onTertiaryContainer",
          "data-[state=open]:bg-light-tertiary",
          "data-[state=open]:text-light-onTertiary",
          "dark:data-[state=open]:bg-dark-tertiary",
          "dark:data-[state=open]:text-dark-onTertiary",
        ],
        content: [
          "bg-light-tertiaryContainer",
          "text-light-onTertiaryContainer",
          "dark:bg-dark-tertiaryContainer",
          "dark:text-dark-onTertiaryContainer",
        ],
      },
    },
    ui_size: {
      small: {
        item: ["rounded-[0.5rem]"],
        trigger: ["p-2.5", "rounded-[0.5rem]", "text-label-medium"],
        content: ["p-2.5", "text-title-small"],
      },
      medium: {
        item: ["rounded-[0.5rem]"],
        trigger: ["p-3.5", "rounded-[0.5rem]", "text-label-large"],
        content: ["p-3.5", "text-title-small"],
      },
      large: {
        item: ["rounded-[1rem]"],
        trigger: ["p-4", "rounded-[1rem]", "text-label-large"],
        content: ["p-4 pt-8", "text-title-medium"],
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

const AccordionListItem = React.forwardRef<HTMLDivElement, Props>(
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

AccordionListItem.displayName = "AccordionListItem";

export default AccordionListItem;
