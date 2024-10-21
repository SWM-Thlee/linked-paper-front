import { ComponentPropsWithoutRef, forwardRef } from "react";

import { tv, VariantProps } from "@/utils/style/tailwind-variants";

export const buttonVariant = tv({
  base: ["transition-colors", "duration-200"],
  variants: {
    ui_color: {
      primary: [],
      secondary: [],
      tertiary: [],
      error: [],
    },
    ui_variant: {
      default: [],
      bordered: ["ring-inset", "ring-2"],
      ghost: [],
      light: [],
    },
    ui_size: {
      large: ["px-[2rem]", "py-[0.75rem]", "text-body-large", "rounded-4"],
      medium: ["px-[1.5rem]", "py-[0.5rem]", "text-body-large", "rounded-2"],
      small: ["px-[1rem]", "py-[0.375rem]", "text-body-medium", "rounded-2"],
    },
  },
  compoundVariants: [
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
      ui_color: "primary",
      ui_variant: "ghost",
      className: [
        [
          "text-light-primary",
          "dark:text-dark-primary",
          "hover:bg-light-primary",
          "hover:text-light-onPrimary",
          "dark:hover:bg-dark-primary",
          "dark:hover:text-dark-onPrimary",
        ],
      ],
    },
    {
      ui_color: "primary",
      ui_variant: "light",
      className: [
        "bg-light-primaryContainer/50",
        "text-light-onPrimaryContainer",
        "dark:bg-dark-primaryContainer/50",
        "dark:text-dark-onPrimaryContainer",
        "hover:bg-light-primaryContainer/75",
        "hover:text-light-onPrimaryContainer/75",
        "dark:hover:bg-dark-primaryContainer/75",
        "dark:hover:text-dark-onPrimaryContainer/75",
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
      ui_color: "secondary",
      ui_variant: "ghost",
      className: [
        [
          "text-light-secondary",
          "dark:text-dark-secondary",
          "hover:bg-light-secondary",
          "hover:text-light-onSecondary",
          "dark:hover:bg-dark-secondary",
          "dark:hover:text-dark-onSecondary",
        ],
      ],
    },
    {
      ui_color: "secondary",
      ui_variant: "light",
      className: [
        "bg-light-secondaryContainer/50",
        "text-light-onSecondaryContainer",
        "dark:bg-dark-secondaryContainer/50",
        "dark:text-dark-onSecondaryContainer",
        "hover:bg-light-secondaryContainer/75",
        "hover:text-light-onSecondaryContainer/75",
        "dark:hover:bg-dark-secondaryContainer/75",
        "dark:hover:text-dark-onSecondaryContainer/75",
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
      ui_color: "tertiary",
      ui_variant: "ghost",
      className: [
        [
          "text-light-tertiary",
          "dark:text-dark-tertiary",
          "hover:bg-light-tertiary",
          "hover:text-light-onTertiary",
          "dark:hover:bg-dark-tertiary",
          "dark:hover:text-dark-onTertiary",
        ],
      ],
    },
    {
      ui_color: "tertiary",
      ui_variant: "light",
      className: [
        "bg-light-tertiaryContainer/50",
        "text-light-onTertiaryContainer",
        "dark:bg-dark-tertiaryContainer/50",
        "dark:text-dark-onTertiaryContainer",
        "hover:bg-light-tertiaryContainer/75",
        "hover:text-light-onTertiaryContainer/75",
        "dark:hover:bg-dark-tertiaryContainer/75",
        "dark:hover:text-dark-onTertiaryContainer/75",
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
    {
      ui_color: "error",
      ui_variant: "ghost",
      className: [
        [
          "text-light-error",
          "dark:text-dark-error",
          "hover:bg-light-error",
          "hover:text-light-onError",
          "dark:hover:bg-dark-error",
          "dark:hover:text-dark-onError",
        ],
      ],
    },
    {
      ui_color: "error",
      ui_variant: "light",
      className: [
        "bg-light-errorContainer/50",
        "text-light-onErrorContainer",
        "dark:bg-dark-errorContainer/50",
        "dark:text-dark-onErrorContainer",
        "hover:bg-light-errorContainer/75",
        "hover:text-light-onErrorContainer/75",
        "dark:hover:bg-dark-errorContainer/75",
        "dark:hover:text-dark-onErrorContainer/75",
      ],
    },
  ],
  defaultVariants: {
    ui_color: "primary",
    ui_variant: "default",
    ui_size: "medium",
  },
});

export interface ButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariant> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ui_color, ui_variant, ui_size, ...props }, ref) => (
    <button
      type="button"
      ref={ref}
      className={buttonVariant({ ui_color, ui_size, ui_variant, className })}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = "Button";

export default Button;
