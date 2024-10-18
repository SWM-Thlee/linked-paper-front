import { ComponentPropsWithoutRef, forwardRef } from "react";

import { tv, VariantProps } from "@/utils/style/tailwind-variants";
import { buttonVariant } from "./button";

export const labelButtonVariant = tv({
  ...buttonVariant,
  base: [
    ...buttonVariant.base,
    "flex",
    "items-center",
    "text-nowrap",
    "rounded-circle",
    "text-label-large",
  ],
  variants: {
    ...buttonVariant.variants,
    ui_size: {
      large: ["px-[2rem]", "py-[0.75rem]", "gap-6"],
      medium: ["px-[1.5rem]", "py-[0.5rem]", "gap-4"],
      small: ["px-[1rem]", "py-[0.375rem]", "gap-2"],
    },
  },
  defaultVariants: {
    ...buttonVariant.defaultVariants,
    ui_size: "small",
  },
});

export interface LabelButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof labelButtonVariant> {}

const LabelButton = forwardRef<HTMLButtonElement, LabelButtonProps>(
  ({ children, className, ui_color, ui_variant, ui_size, ...props }, ref) => (
    <button
      type="button"
      ref={ref}
      className={labelButtonVariant({
        ui_color,
        ui_size,
        ui_variant,
        className,
      })}
      {...props}
    >
      {children}
    </button>
  ),
);

LabelButton.displayName = "LabelButton";

export default LabelButton;
