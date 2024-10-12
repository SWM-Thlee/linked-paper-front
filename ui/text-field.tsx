"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import { tv, VariantProps } from "@/utils/tailwind-variants";

export const textFieldVariant = tv({
  slots: {
    container: [
      "transition-colors",
      "flex",
      "flex-nowrap",
      "items-center",
      "gap-4",
      "ring-inset",
      "ring-2",
      "ring-light-outlineVariant",
      "dark:ring-dark-outlineVariant",
    ],
    input: [
      "transition-colors",
      "placeholder:transition-colors",
      "border-none",
      "outline-none",
      "flex-1",
      "bg-transparent",
      "placeholder:text-light-outlineVariant",
      "dark:placeholder:text-dark-outlineVariant",
      "text-light-onSurface",
      "dark:text-dark-onSurface",
    ],
  },
  variants: {
    ui_color: {
      primary: {
        container: [
          "hover:bg-light-primaryContainer/50",
          "focus-within:bg-light-primaryContainer/50",
          "focus-within:text-light-onPrimaryContainer",
          "focus-within:ring-light-primary",
          "dark:hover:bg-dark-primaryContainer/50",
          "dark:focus-within:bg-dark-primaryContainer/50",
          "dark:focus-within:text-dark-onPrimaryContainer",
          "dark:focus-within:ring-dark-primary",
        ],
        input: [
          "focus-within:text-light-onPrimaryContainer",
          "dark:focus-within:text-dark-onPrimaryContainer",
          "focus-within:placeholder:text-light-onPrimaryContainer/25",
          "focus-within:dark:placeholder:text-dark-onPrimaryContainer/25",
        ],
      },
      secondary: {
        container: [
          "hover:bg-light-secondaryContainer/50",
          "focus-within:bg-light-secondaryContainer/50",
          "focus-within:text-light-onSecondaryContainer",
          "focus-within:ring-light-secondary",
          "dark:hover:bg-dark-secondaryContainer/50",
          "dark:focus-within:bg-dark-secondaryContainer/50",
          "dark:focus-within:text-dark-onSecondaryContainer",
          "dark:focus-within:ring-dark-secondary",
        ],
        input: [
          "focus-within:text-light-onSecondaryContainer",
          "dark:focus-within:text-dark-onSecondaryContainer",
          "focus-within:placeholder:text-light-onSecondaryContainer/25",
          "focus-within:dark:placeholder:text-dark-onSecondaryContainer/25",
        ],
      },
      tertiary: {
        container: [
          "hover:bg-light-tertiaryContainer/50",
          "focus-within:bg-light-tertiaryContainer/50",
          "focus-within:text-light-onTertiaryContainer",
          "focus-within:ring-light-tertiary",
          "dark:hover:bg-dark-tertiaryContainer/50",
          "dark:focus-within:bg-dark-tertiaryContainer/50",
          "dark:focus-within:text-dark-onTertiaryContainer",
          "dark:focus-within:ring-dark-tertiary",
        ],
        input: [
          "focus-within:text-light-onTertiaryContainer",
          "dark:focus-within:text-dark-onTertiaryContainer",
          "focus-within:placeholder:text-light-onTertiaryContainer/25",
          "focus-within:dark:placeholder:text-dark-onTertiaryContainer/25",
        ],
      },
    },
    ui_size: {
      large: {
        container: ["rounded-4", "px-6", "py-3"],
        input: ["text-title-large"],
        icon: ["w-[22px]", "h-[22px]"],
      },
      medium: {
        container: ["rounded-2", "px-4", "py-2"],
        input: ["text-title-medium"],
        icon: ["w-[16px]", "h-[16px]"],
      },
      small: {
        container: ["rounded-2", "px-2", "py-1"],
        input: ["text-title-small"],
        icon: ["w-[14px]", "h-[14px]"],
      },
    },
  },
  defaultVariants: {
    ui_color: "primary",
    ui_size: "large",
  },
});

export interface TextFieldProps
  extends VariantProps<typeof textFieldVariant>,
    ComponentPropsWithoutRef<"input"> {}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ ui_color, ui_size, type, placeholder, className, key, ...props }, ref) => {
    const { container, input } = textFieldVariant({ ui_color, ui_size });

    return (
      <div key={key} className={container({ className })}>
        <input
          ref={ref}
          type={type ?? "text"}
          placeholder={placeholder}
          className={input()}
          {...props}
        />
      </div>
    );
  },
);

TextField.displayName = "TextField";

export default TextField;
