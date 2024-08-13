import { forwardRef } from "react";
import { tv, VariantProps } from "@/utils/tailwind-variants";

export const buttonVariant = tv({
  base: ["transition-colors", "duration-200"],
  variants: {
    color: {
      primary: [],
      secondary: [],
      tertiary: [],
      error: [],
    },
    variant: {
      default: [],
      bordered: ["ring-inset", "ring-2"],
      ghost: [],
    },
    size: {
      large: [
        "px-[2rem]",
        "py-[0.75rem]",
        "text-label-large",
        "rounded-[1.5rem]",
      ],
      medium: [
        "px-[1.5rem]",
        "py-[0.5rem]",
        "text-label-large",
        "rounded-[1rem]",
      ],
      small: [
        "px-[1rem]",
        "py-[0.375rem]",
        "text-label-medium",
        "rounded-[0.5rem]",
      ],
    },
  },
  compoundVariants: [
    {
      color: "primary",
      variant: "default",
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
      color: "primary",
      variant: "bordered",
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
      color: "primary",
      variant: "ghost",
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
      color: "secondary",
      variant: "default",
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
      color: "secondary",
      variant: "bordered",
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
      color: "secondary",
      variant: "ghost",
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
      color: "tertiary",
      variant: "default",
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
      color: "tertiary",
      variant: "bordered",
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
      color: "tertiary",
      variant: "ghost",
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
      color: "error",
      variant: "default",
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
      color: "error",
      variant: "bordered",
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
      color: "error",
      variant: "ghost",
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
  ],
  defaultVariants: {
    color: "primary",
    variant: "default",
    size: "medium",
  },
});

type Props = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariant>;

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, color, variant, size, ...props }, ref) => (
    <button
      type="button"
      ref={ref}
      className={buttonVariant({ color, size, variant, className })}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = "Button";

export default Button;
