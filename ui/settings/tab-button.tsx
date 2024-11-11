"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import { tv, VariantProps } from "@/utils/style/tailwind-variants";

export const tabButtonVariant = tv({
  base: [
    "text-label-large px-4 py-2 rounded-2",
    "text-light-onSecondaryContainer dark:text-dark-onSecondaryContainer",
    "bg-light-secondaryContainer/50 dark:bg-dark-secondaryContainer/50",
    "hover:bg-light-primary dark:hover:bg-dark-primary",
    "hover:text-light-onPrimary dark:hover:text-dark-onPrimary",
    "transition-colors duration-200",
  ],
  variants: {
    ui_variant: {
      default: [],
      selected: [
        "bg-light-primary dark:bg-dark-primary",
        "text-light-onPrimary dark:text-dark-onPrimary",
      ],
    },
  },
  defaultVariants: {
    ui_variant: "default",
  },
});

export interface SettingsTabButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof tabButtonVariant> {}

const TabButton = forwardRef<HTMLButtonElement, SettingsTabButtonProps>(
  ({ children, className, ui_variant, ...props }, ref) => (
    <button
      type="button"
      ref={ref}
      className={tabButtonVariant({ ui_variant, className })}
      {...props}
    >
      {children}
    </button>
  ),
);

TabButton.displayName = "TabButton";

export default TabButton;
