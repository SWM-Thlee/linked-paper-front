"use client";

import * as Primitive from "@radix-ui/react-checkbox";

import { tv, VariantProps } from "@/utils/style/tailwind-variants";
import CheckIcon from "./icons/check";

export const checkBoxVariant = tv({
  slots: {
    indicator: ["transition-transform", "animate-scaleIn", "duration-300"],
    content: [
      "flex",
      "transition-colors",
      "appearance-none",
      "items-center",
      "justify-center",
      "outline-none",
      "w-6",
      "h-6",
    ],
  },
  variants: {
    ui_color: {
      primary: {
        indicator: [
          "text-light-onPrimaryContainer",
          "dark:text-dark-onPrimaryContainer",
        ],
        content: [
          "bg-light-primaryContainer/50",
          "hover:bg-light-primaryContainer",
          "data-[state=checked]:bg-light-primaryContainer",
          "dark:bg-dark-primaryContainer/50",
          "dark:hover:bg-dark-primaryContainer",
          "dark:data-[state=checked]:bg-dark-primaryContainer",
        ],
      },
      secondary: {
        indicator: [
          "text-light-onSecondaryContainer",
          "dark:text-dark-onSecondaryContainer",
        ],
        content: [
          "bg-light-secondaryContainer/50",
          "hover:bg-light-secondaryContainer",
          "data-[state=checked]:bg-light-secondaryContainer",
          "dark:bg-dark-secondaryContainer/50",
          "dark:hover:bg-dark-secondaryContainer",
          "dark:data-[state=checked]:bg-dark-secondaryContainer",
        ],
      },
      tertiary: {
        indicator: [
          "text-light-onTertiaryContainer",
          "dark:text-dark-onTertiaryContainer",
        ],
        content: [
          "bg-light-tertiaryContainer/50",
          "hover:bg-light-tertiaryContainer",
          "data-[state=checked]:bg-light-tertiaryContainer",
          "dark:bg-dark-tertiaryContainer/50",
          "dark:hover:bg-dark-tertiaryContainer",
          "dark:data-[state=checked]:bg-dark-tertiaryContainer",
        ],
      },
    },
    ui_variant: {
      default: [],
      bordered: {
        content: ["ring-inset", "ring-2"],
      },
    },
    ui_shape: {
      default: { content: ["rounded-1"] },
      circle: { content: ["rounded-circle"] },
    },
  },
  compoundVariants: [
    {
      ui_color: "primary",
      ui_variant: "bordered",
      className: {
        content: [
          "ring-light-onPrimaryContainer/50",
          "hover:ring-light-onPrimaryContainer",
          "data-[state=checked]:ring-light-onPrimaryContainer",
          "dark:ring-dark-onPrimaryContainer/50",
          "dark:hover:ring-dark-onPrimaryContainer",
          "dark:data-[state=checked]:ring-dark-onPrimaryContainer",
        ],
      },
    },
    {
      ui_color: "secondary",
      ui_variant: "bordered",
      className: {
        content: [
          "ring-light-onSecondaryContainer/50",
          "hover:ring-light-onSecondaryContainer",
          "data-[state=checked]:ring-light-onSecondaryContainer",
          "dark:ring-dark-onSecondaryContainer/50",
          "dark:hover:ring-dark-onSecondaryContainer",
          "dark:data-[state=checked]:ring-dark-onSecondaryContainer",
        ],
      },
    },
    {
      ui_color: "tertiary",
      ui_variant: "bordered",
      className: {
        content: [
          "ring-light-onTertiaryContainer/50",
          "hover:ring-light-onTertiaryContainer",
          "data-[state=checked]:ring-light-onTertiaryContainer",
          "dark:ring-dark-onTertiaryContainer/50",
          "dark:hover:ring-dark-onTertiaryContainer",
          "dark:data-[state=checked]:ring-dark-onTertiaryContainer",
        ],
      },
    },
  ],
  defaultVariants: {
    ui_color: "primary",
    ui_variant: "default",
    ui_shape: "default",
  },
});

export interface CheckBoxProps
  extends Primitive.CheckboxProps,
    VariantProps<typeof checkBoxVariant> {}

export default function CheckBox({
  ui_color,
  ui_variant,
  ui_shape,
  className,
  ...props
}: CheckBoxProps) {
  const { indicator, content } = checkBoxVariant({
    ui_color,
    ui_variant,
    ui_shape,
  });

  return (
    <Primitive.Root className={content({ className })} {...props}>
      <Primitive.Indicator className={indicator()}>
        <CheckIcon
          ui_size={
            ui_variant ??
            checkBoxVariant.defaultVariants.ui_variant === "bordered"
              ? "small"
              : "medium"
          }
        />
      </Primitive.Indicator>
    </Primitive.Root>
  );
}
