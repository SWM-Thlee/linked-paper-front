"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import { tv, VariantProps } from "@/utils/style/tailwind-variants";

export const iconButtonVariant = tv({
  base: ["transition-colors", "duration-200"],
  variants: {
    ui_color: {
      default: [],
      primary: [],
      secondary: [],
      tertiary: [],
      error: [],
    },
    ui_variant: {
      default: [],
      bordered: ["ring-inset", "ring-2"],
    },
    ui_shape: {
      default: ["rounded-2"],
      circle: ["rounded-circle"],
    },
    ui_size: {
      medium: ["p-1.5"],
      large: ["p-2.5"],
    },
  },
  compoundVariants: [
    {
      ui_color: "default",
      ui_variant: "default",
      className: [
        "bg-light-surfaceDim/25",
        "text-light-onSurface",
        "dark:bg-dark-surfaceDim/25",
        "dark:text-dark-onSurface",
        "hover:bg-light-surfaceDim/50",
        "hover:text-light-onSurface/75",
        "dark:hover:bg-dark-surfaceDim/50",
        "dark:hover:text-dark-onSurface/75",
      ],
    },
    {
      ui_color: "default",
      ui_variant: "bordered",
      className: [
        "ring-light-outline",
        "text-light-outline",
        "dark:ring-dark-outline",
        "dark:text-dark-outline",
        "hover:ring-light-outline/75",
        "hover:text-light-outline/75",
        "hover:dark:ring-dark-outline/75",
        "hover:dark:text-dark-outline/75",
      ],
    },
    {
      ui_color: "primary",
      ui_variant: "default",
      className: [
        "bg-light-primary",
        "text-light-onPrimary",
        "dark:bg-dark-primary",
        "dark:text-dark-onPrimary",
        "hover:bg-light-primary/75",
        "hover:text-light-onPrimary/75",
        "dark:hover:bg-dark-primary/75",
        "dark:hover:text-dark-onPrimary/75",
      ],
    },
    {
      ui_color: "primary",
      ui_variant: "bordered",
      className: [
        "ring-light-primary",
        "text-light-primary",
        "dark:ring-dark-primary",
        "dark:text-dark-primary",
        "hover:ring-light-primary/75",
        "hover:text-light-primary/75",
        "hover:dark:ring-dark-primary/75",
        "hover:dark:text-dark-primary/75",
      ],
    },
    {
      ui_color: "secondary",
      ui_variant: "default",
      className: [
        "bg-light-secondary",
        "text-light-onSecondary",
        "dark:bg-dark-secondary",
        "dark:text-dark-onSecondary",
        "hover:bg-light-secondary/75",
        "hover:text-light-onSecondary/75",
        "dark:hover:bg-dark-secondary/75",
        "dark:hover:text-dark-onSecondary/75",
      ],
    },
    {
      ui_color: "secondary",
      ui_variant: "bordered",
      className: [
        "ring-light-secondary",
        "text-light-secondary",
        "dark:ring-dark-secondary",
        "dark:text-dark-secondary",
        "hover:ring-light-secondary/75",
        "hover:text-light-secondary/75",
        "hover:dark:ring-dark-secondary/75",
        "hover:dark:text-dark-secondary/75",
      ],
    },
    {
      ui_color: "tertiary",
      ui_variant: "default",
      className: [
        "bg-light-tertiary",
        "text-light-onTertiary",
        "dark:bg-dark-tertiary",
        "dark:text-dark-onTertiary",
        "hover:bg-light-tertiary/75",
        "hover:text-light-onTertiary/75",
        "dark:hover:bg-dark-tertiary/75",
        "dark:hover:text-dark-onTertiary/75",
      ],
    },
    {
      ui_color: "tertiary",
      ui_variant: "bordered",
      className: [
        "ring-light-tertiary",
        "text-light-tertiary",
        "dark:ring-dark-tertiary",
        "dark:text-dark-tertiary",
        "hover:ring-light-tertiary/75",
        "hover:text-light-tertiary/75",
        "hover:dark:ring-dark-tertiary/75",
        "hover:dark:text-dark-tertiary/75",
      ],
    },
    {
      ui_color: "error",
      ui_variant: "default",
      className: [
        "bg-light-error",
        "text-light-onError",
        "dark:bg-dark-error",
        "dark:text-dark-onError",
        "hover:bg-light-error/75",
        "hover:text-light-onError/75",
        "dark:hover:bg-dark-error/75",
        "dark:hover:text-dark-onError/75",
      ],
    },
    {
      ui_color: "error",
      ui_variant: "bordered",
      className: [
        "ring-light-error",
        "text-light-error",
        "dark:ring-dark-error",
        "dark:text-dark-error",
        "hover:ring-light-error/75",
        "hover:text-light-error/75",
        "hover:dark:ring-dark-error/75",
        "hover:dark:text-dark-error/75",
      ],
    },
  ],
  defaultVariants: {
    ui_color: "default",
    ui_variant: "default",
    ui_shape: "default",
    ui_size: "medium",
  },
});

export interface IconButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof iconButtonVariant> {}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { children, className, ui_color, ui_variant, ui_shape, ui_size, ...props },
    ref,
  ) => (
    <button
      type="button"
      ref={ref}
      className={iconButtonVariant({
        ui_color,
        ui_size,
        ui_shape,
        ui_variant,
        className,
      })}
      {...props}
    >
      {children}
    </button>
  ),
);

IconButton.displayName = "IconButton";

export default IconButton;
