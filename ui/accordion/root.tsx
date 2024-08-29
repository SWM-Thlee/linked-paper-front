"use client";

import React from "react";
import {
  AccordionSingleProps,
  AccordionMultipleProps,
  Root,
} from "@radix-ui/react-accordion";
import { tv, VariantProps } from "@/utils/tailwind-variants";

export const accordionRootVariant = tv({
  variants: {
    ui_variant: {
      default: [],
      list: ["flex", "flex-col"],
    },
    ui_size: {
      small: [],
      medium: [],
      large: [],
    },
  },
  compoundVariants: [
    {
      ui_variant: "list",
      ui_size: "small",
      className: ["gap-2"],
    },
    {
      ui_variant: "list",
      ui_size: "medium",
      className: ["gap-3"],
    },
    {
      ui_variant: "list",
      ui_size: "large",
      className: ["gap-4"],
    },
  ],
  defaultVariants: {
    ui_variant: "default",
    ui_size: "medium",
  },
});

type Props = React.PropsWithChildren &
  VariantProps<typeof accordionRootVariant> &
  (AccordionSingleProps | AccordionMultipleProps);

export default function AccordionRoot({
  children,
  ui_variant,
  className,
  ...props
}: Props) {
  return (
    <Root
      className={accordionRootVariant({ ui_variant, className })}
      {...props}
    >
      {children}
    </Root>
  );
}
