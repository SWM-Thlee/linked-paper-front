import { ComponentPropsWithoutRef, forwardRef } from "react";
import { tv, VariantProps } from "@/utils/style/tailwind-variants";

export const fieldContainerVariant = tv({
  slots: {
    label: [
      "text-label-large",
      "text-light-onSurface dark:text-dark-onSurface",
    ],
    wrapper: ["flex flex-col"],
    container: [
      "flex flex-col",
      "ring-light-outlineVariant dark:ring-dark-outlineVariant",
    ],
  },
  variants: {
    ui_variant: {
      default: [],
      bordered: {
        container: ["ring-2", "ring-inset"],
      },
    },
    ui_size: {
      large: {
        label: ["pl-2"],
        wrapper: ["gap-4"],
        container: ["gap-6"],
      },
      medium: {
        label: ["pl-1"],
        wrapper: ["gap-2"],
        container: ["gap-4"],
      },
    },
  },
  compoundVariants: [
    {
      ui_size: "large",
      ui_variant: "bordered",
      className: { container: ["rounded-4", "p-6"] },
    },
    {
      ui_size: "medium",
      ui_variant: "bordered",
      className: { container: ["rounded-2", "p-4"] },
    },
  ],
  defaultVariants: {
    ui_variant: "default",
    ui_size: "large",
  },
});

type Props = {
  field: React.ReactNode;
} & VariantProps<typeof fieldContainerVariant> &
  ComponentPropsWithoutRef<"div">;

const FieldContainer = forwardRef<HTMLDivElement, Props>(
  ({ field, ui_size, ui_variant, children, className, ...props }, ref) => {
    const { label, wrapper, container } = fieldContainerVariant({
      ui_size,
      ui_variant,
    });
    return (
      <div ref={ref} className={wrapper()}>
        <div className={label()}>{field}</div>
        <div className={container({ className })} {...props}>
          {children}
        </div>
      </div>
    );
  },
);

FieldContainer.displayName = "FieldContainer";

export default FieldContainer;
