"use client";

import React, { ComponentPropsWithoutRef, forwardRef } from "react";

import { tv, VariantProps } from "@/utils/style/tailwind-variants";
import SearchIcon from "./icons/search";

export const searchVariant = tv({
  slots: {
    container: [
      "transition-[box-shadow,_color,_background-color,_border-color]",
      "flex flex-nowrap items-center gap-4",
      "ring-inset ring-2 rounded-circle",
      "ring-light-outlineVariant dark:ring-dark-outlineVariant",
    ],
    input: [
      "peer transition-colors placeholder:transition-colors border-none outline-none flex-1 bg-transparent",
      "placeholder:text-light-outlineVariant dark:placeholder:text-dark-outlineVariant",
      "text-light-onSurface dark:text-dark-onSurface",
    ],
    submit: ["rounded-circle transition-colors"],
  },
  variants: {
    ui_color: {
      primary: {
        container: [
          "hover:bg-light-primaryContainer/50 focus-within:bg-light-primaryContainer/50 focus-within:text-light-onPrimaryContainer focus-within:ring-light-primary",
          "dark:hover:bg-dark-primaryContainer/50 dark:focus-within:bg-dark-primaryContainer/50 dark:focus-within:text-dark-onPrimaryContainer dark:focus-within:ring-dark-primary",
        ],
        input: [
          "focus-within:text-light-onPrimaryContainer dark:focus-within:text-dark-onPrimaryContainer",
          "focus-within:placeholder:text-light-onPrimaryContainer/25 focus-within:dark:placeholder:text-dark-onPrimaryContainer/25",
        ],
        submit: [
          "hover:bg-light-primary text-light-onSurface hover:text-light-onPrimary dark:hover:bg-dark-primary dark:text-dark-onSurface dark:hover:text-dark-onPrimary",
          "peer-focus-within:bg-light-primary peer-focus-within:text-light-onPrimary dark:peer-focus-within:bg-dark-primary dark:peer-focus-within:text-dark-onPrimary",
        ],
      },
      secondary: {
        container: [
          "hover:bg-light-secondaryContainer/50 focus-within:bg-light-secondaryContainer/50 focus-within:text-light-onSecondaryContainer focus-within:ring-light-secondary",
          "dark:hover:bg-dark-secondaryContainer/50 dark:focus-within:bg-dark-secondaryContainer/50 dark:focus-within:text-dark-onSecondaryContainer dark:focus-within:ring-dark-secondary",
        ],
        input: [
          "focus-within:text-light-onSecondaryContainer dark:focus-within:text-dark-onSecondaryContainer",
          "focus-within:placeholder:text-light-onSecondaryContainer/25 focus-within:dark:placeholder:text-dark-onSecondaryContainer/25",
        ],
        submit: [
          "hover:bg-light-secondary text-light-onSurface hover:text-light-onSecondary dark:hover:bg-dark-secondary dark:text-dark-onSurface dark:hover:text-dark-onSecondary",
          "peer-focus-within:bg-light-secondary peer-focus-within:text-light-onSecondary dark:peer-focus-within:bg-dark-secondary dark:peer-focus-within:text-dark-onSecondary",
        ],
      },
      tertiary: {
        container: [
          "hover:bg-light-tertiaryContainer/50 focus-within:bg-light-tertiaryContainer/50 focus-within:text-light-onTertiaryContainer focus-within:ring-light-tertiary",
          "dark:hover:bg-dark-tertiaryContainer/50 dark:focus-within:bg-dark-tertiaryContainer/50 dark:focus-within:text-dark-onTertiaryContainer dark:focus-within:ring-dark-tertiary",
        ],
        input: [
          "focus-within:text-light-onTertiaryContainer dark:focus-within:text-dark-onTertiaryContainer",
          "focus-within:placeholder:text-light-onTertiaryContainer/25 focus-within:dark:placeholder:text-dark-onTertiaryContainer/25",
        ],
        submit: [
          "hover:bg-light-tertiary text-light-onSurface hover:text-light-onTertiary dark:hover:bg-dark-tertiary dark:text-dark-onSurface dark:hover:text-dark-onTertiary",
          "peer-focus-within:bg-light-tertiary peer-focus-within:text-light-onTertiary dark:peer-focus-within:bg-dark-tertiary dark:peer-focus-within:text-dark-onTertiary",
        ],
      },
    },
    ui_size: {
      large: {
        input: ["text-title-large", "ml-6 my-3"],
        submit: ["p-2 my-2 mr-2"],
      },
      medium: {
        input: ["text-title-medium", "ml-4 my-2"],
        submit: ["p-1 my-1.5 mr-1.5"],
      },
      small: {
        input: ["text-title-small", "ml-2 my-1"],
        submit: ["p-0.5 my-1 mr-1"],
      },
    },
  },
  defaultVariants: {
    ui_color: "primary",
    ui_size: "large",
  },
});

export interface SearchProps
  extends VariantProps<typeof searchVariant>,
    ComponentPropsWithoutRef<"input"> {
  defaultPlaceholder?: string;
  disableSubmit?: boolean;
  onSubmitButton?: () => void;
}

const SearchField = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      ui_color,
      ui_size,
      type = "text",
      defaultPlaceholder = "Search Anything...",
      placeholder,
      className,
      disableSubmit = false,
      onSubmitButton,
      ...props
    },
    ref,
  ) => {
    const { container, input, submit } = searchVariant({ ui_color, ui_size });

    return (
      <div className={container({ className })}>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder ?? defaultPlaceholder}
          className={input()}
          {...props}
        />
        {!disableSubmit && (
          <button
            type="button"
            aria-label="Submit"
            className={submit()}
            onClick={onSubmitButton}
          >
            <SearchIcon />
          </button>
        )}
      </div>
    );
  },
);

SearchField.displayName = "SearchField";

export default SearchField;
