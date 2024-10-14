"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import { tv, VariantProps } from "@/utils/style/tailwind-variants";
import { sem } from "@/utils/style/semantic-styles";

export const tabButtonVariant = tv({
  base: sem()
    .layout(["text-body-large", "px-4 py-2", "rounded-3"])
    .color([
      "text-light-onPrimaryContainer",
      "hover:bg-light-primaryContainer",
      "dark:text-dark-onPrimaryContainer",
      "dark:hover:bg-dark-primaryContainer",
    ])
    .transition(["transition-colors", "duration-200"])
    .build(),
  variants: {
    ui_variant: {
      default: [],
      selected: ["bg-light-primaryContainer", "dark:bg-dark-primaryContainer"],
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
