import { ComponentPropsWithoutRef, forwardRef } from "react";
import { tv, VariantProps } from "@/utils/style/tailwind-variants";
import { sem } from "@/utils/style/semantic-styles";

export const fieldContainerVariant = tv({
  slots: {
    label: sem()
      .layout(["text-label-large"])
      .color(["text-light-onSurface", "dark:text-dark-onSurface"])
      .build(),
    wrapper: sem().layout(["flex flex-col"]).build(),
    container: sem()
      .layout(["flex flex-col"])
      .color(["ring-light-outlineVariant", "dark:ring-dark-outlineVariant"])
      .build(),
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
  title: string;
} & VariantProps<typeof fieldContainerVariant> &
  ComponentPropsWithoutRef<"div">;

const FieldContainer = forwardRef<HTMLDivElement, Props>(
  ({ title, ui_size, ui_variant, children, className, ...props }, ref) => {
    const { label, wrapper, container } = fieldContainerVariant({
      ui_size,
      ui_variant,
    });
    return (
      <div ref={ref} className={wrapper()}>
        <div className={label()}>{title}</div>
        <div className={container({ className })} {...props}>
          {children}
        </div>
      </div>
    );
  },
);

FieldContainer.displayName = "FieldContainer";

export default FieldContainer;
