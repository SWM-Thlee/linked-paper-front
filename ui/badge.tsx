import { ComponentPropsWithoutRef, forwardRef } from "react";
import { tv, VariantProps } from "@/utils/tailwind-variants";

export const badgeVariant = tv({
  base: ["pointer-events-none", "px-1.5 py-0.5", "text-body-small"],

  variants: {
    ui_variant: {
      default: ["rounded-1", "inline"],
      topRight: [
        "rounded-circle",
        "absolute right-0 top-0 -translate-y-[25%] translate-x-[25%]",
      ],
      bottomRight: [
        "rounded-circle",
        "absolute right-0 bottom-0 translate-y-[25%] translate-x-[25%]",
      ],
    },
    ui_color: {
      primary: [
        "bg-light-primary",
        "text-light-onPrimary",
        "dark:bg-dark-primary",
        "dark:text-dark-onPrimary",
      ],
      secondary: [
        "bg-light-secondary",
        "text-light-onSecondary",
        "dark:bg-dark-secondary",
        "dark:text-dark-onSecondary",
      ],
      tertiary: [
        "bg-light-tertiary",
        "text-light-onTertiary",
        "dark:bg-dark-tertiary",
        "dark:text-dark-onTertiary",
      ],
    },
  },

  defaultVariants: {
    ui_variant: "default",
    ui_color: "primary",
  },
});

export interface BadgeProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof badgeVariant> {}

// 주의: Badge 대상 Component가 relative 속성을 가지고 있어야 합니다.
const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ children, className, ui_color, ui_variant, ...props }, ref) => (
    <div
      className={badgeVariant({ ui_color, ui_variant, className })}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  ),
);

Badge.displayName = "Badge";

export default Badge;
