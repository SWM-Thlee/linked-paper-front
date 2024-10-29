"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import { tv, VariantProps } from "@/utils/style/tailwind-variants";

export const textAreaVariant = tv({
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
    textarea: [
      "transition-colors",
      "placeholder:transition-colors",
      "border-none",
      "resize-none",
      "outline-none",
      "flex-1",
      "scrollbar",
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
        textarea: [
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
        textarea: [
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
        textarea: [
          "focus-within:text-light-onTertiaryContainer",
          "dark:focus-within:text-dark-onTertiaryContainer",
          "focus-within:placeholder:text-light-onTertiaryContainer/25",
          "focus-within:dark:placeholder:text-dark-onTertiaryContainer/25",
        ],
      },
    },
    ui_size: {
      large: {
        container: ["rounded-4", "p-4"],
        textarea: ["text-title-large"],
      },
      medium: {
        container: ["rounded-2", "p-3"],
        textarea: ["text-title-medium"],
      },
      small: {
        container: ["rounded-2", "p-2"],
        textarea: ["text-title-small"],
      },
    },
  },
  defaultVariants: {
    ui_color: "primary",
    ui_size: "large",
  },
});

export interface TextAreaProps
  extends VariantProps<typeof textAreaVariant>,
    ComponentPropsWithoutRef<"textarea"> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ ui_color, ui_size, placeholder, className, key, ...props }, ref) => {
    const { container, textarea } = textAreaVariant({ ui_color, ui_size });

    return (
      <div key={key} className={container({ className })}>
        <textarea
          ref={ref}
          placeholder={placeholder}
          className={textarea()}
          {...props}
        />
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
