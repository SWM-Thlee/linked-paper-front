"use client";

import * as Primitive from "@radix-ui/react-radio-group";

import { tv, VariantProps } from "@/utils/tailwind-variants";

export const selectVariant = tv({
  slots: {
    container: ["inline-flex", "p-1", "gap-1", "rounded-circle"],
    button: ["rounded-circle", "transition-colors", "select-none"],
  },
  variants: {
    ui_color: {
      primary: [],
      secondary: [],
      tertiary: [],
    },
    ui_variant: {
      default: [],
      bordered: {
        container: ["ring-inset", "ring-2"],
      },
    },
    ui_size: {
      large: {
        button: ["px-6", "py-2", "text-body-large"],
      },
      medium: {
        button: ["px-4", "py-1.5", "text-body-large"],
      },
      small: {
        button: ["px-3", "py-1", "text-body-medium"],
      },
    },
  },
  compoundVariants: [
    {
      ui_color: "primary",
      ui_variant: "default",
      className: {
        button: [
          "data-[state=unchecked]:text-light-onPrimaryContainer",
          "data-[state=checked]:bg-light-primary",
          "data-[state=checked]:text-light-onPrimary",
          "dark:data-[state=unchecked]:text-dark-onPrimaryContainer",
          "dark:data-[state=checked]:bg-dark-primary",
          "dark:data-[state=checked]:text-dark-onPrimary",
        ],
        container: [
          "bg-light-primaryContainer/50",
          "dark:bg-dark-primaryContainer/50",
        ],
      },
    },
    {
      ui_color: "primary",
      ui_variant: "bordered",
      className: {
        button: [
          "data-[state=unchecked]:text-light-onPrimaryContainer",
          "data-[state=checked]:bg-light-primary",
          "data-[state=checked]:text-light-onPrimary",
          "dark:data-[state=unchecked]:text-dark-onPrimaryContainer",
          "dark:data-[state=checked]:bg-dark-primary",
          "dark:data-[state=checked]:text-dark-onPrimary",
        ],
        container: ["ring-light-primary/50", "dark:ring-dark-primary/50"],
      },
    },
    {
      ui_color: "secondary",
      ui_variant: "default",
      className: {
        button: [
          "data-[state=unchecked]:text-light-onSecondaryContainer",
          "data-[state=checked]:bg-light-secondary",
          "data-[state=checked]:text-light-onSecondary",
          "dark:data-[state=unchecked]:text-dark-onPrimaryContainer",
          "dark:data-[state=checked]:bg-dark-secondary",
          "dark:data-[state=checked]:text-dark-onSecondary",
        ],
        container: [
          "bg-light-secondaryContainer/50",
          "dark:bg-dark-secondaryContainer/50",
        ],
      },
    },
    {
      ui_color: "secondary",
      ui_variant: "bordered",
      className: {
        button: [
          "data-[state=unchecked]:text-light-onSecondaryContainer",
          "data-[state=checked]:bg-light-secondary",
          "data-[state=checked]:text-light-onSecondary",
          "dark:data-[state=unchecked]:text-dark-onSecondaryContainer",
          "dark:data-[state=checked]:bg-dark-secondary",
          "dark:data-[state=checked]:text-dark-onSecondary",
        ],
        container: ["ring-light-secondary/50", "dark:ring-dark-secondary/50"],
      },
    },
    {
      ui_color: "tertiary",
      ui_variant: "default",
      className: {
        button: [
          "data-[state=unchecked]:text-light-onTertiaryContainer",
          "data-[state=checked]:bg-light-tertiary",
          "data-[state=checked]:text-light-onTertiary",
          "dark:data-[state=unchecked]:text-dark-onTertiaryContainer",
          "dark:data-[state=checked]:bg-dark-tertiary",
          "dark:data-[state=checked]:text-dark-onTertiary",
        ],
        container: [
          "bg-light-tertiaryContainer/50",
          "dark:bg-dark-tertiaryContainer/50",
        ],
      },
    },
    {
      ui_color: "tertiary",
      ui_variant: "bordered",
      className: {
        button: [
          "data-[state=unchecked]:text-light-onTertiaryContainer",
          "data-[state=checked]:bg-light-tertiary",
          "data-[state=checked]:text-light-onTertiary",
          "dark:data-[state=unchecked]:text-dark-onTertiaryContainer",
          "dark:data-[state=checked]:bg-dark-tertiary",
          "dark:data-[state=checked]:text-dark-onTertiary",
        ],
        container: ["ring-light-tertiary/50", "dark:ring-dark-tertiary/50"],
      },
    },
  ],
  defaultVariants: {
    ui_color: "primary",
    ui_variant: "default",
    ui_size: "medium",
  },
});

export type SelectComponentItem = {
  value: string;
  id: string;
  content?: React.ReactNode;
};

export interface SelectProps
  extends VariantProps<typeof selectVariant>,
    Primitive.RadioGroupProps {
  items: SelectComponentItem[];
}

export default function Select({
  ui_color,
  ui_size,
  ui_variant,
  items,
  className,
  ...props
}: SelectProps) {
  const { button, container } = selectVariant({
    ui_color,
    ui_size,
    ui_variant,
  });

  return (
    <Primitive.Root className={container({ className })} {...props}>
      {items.map(({ id, value }) => (
        <Primitive.Item key={id} value={value} id={id} className={button()}>
          {value}
        </Primitive.Item>
      ))}
    </Primitive.Root>
  );
}
