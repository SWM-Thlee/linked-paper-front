"use client";

import * as Primitive from "@radix-ui/react-dialog";

import { tv, VariantProps } from "@/utils/style/tailwind-variants";
import CloseIcon from "../icons/close";

export const dialogVariant = tv({
  slots: {
    overlay: [
      "fixed inset-0 z-overlay",
      "bg-light-shadow/15 dark:bg-dark-shadow/50",
      "transition data-[state=open]:animate-overlayShow",
    ],
    content: [
      "fixed top-[50%] left-[50%]",
      "translate-x-[-50%] translate-y-[-50%]",
      "focus:outline-none z-dialog",
      "bg-light-surfaceContainer dark:bg-dark-surfaceContainer",
      "text-light-onSurface dark:text-dark-onSurface",
      "shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]",
      "transition data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide",
    ],
    close: [
      "absolute inline-flex appearance-none justify-center items-center",
      "text-light-onSurface dark:text-dark-onSurface",
    ],
  },
  variants: {
    ui_size: {
      small: {
        content: ["p-4", "rounded-4"],
        close: ["top-4", "right-4"],
      },
      medium: {
        content: ["p-6", "rounded-5"],
        close: ["top-6", "right-6"],
      },
      large: {
        content: ["p-8", "rounded-6"],
        close: ["top-8", "right-8"],
      },
    },
  },
  defaultVariants: {
    ui_size: "medium",
  },
});

export interface DialogRootProps extends Primitive.DialogProps {}

export function Root({ children, ...props }: DialogRootProps) {
  return <Primitive.Root {...props}>{children}</Primitive.Root>;
}

export const Title = Primitive.DialogTitle;
export const Description = Primitive.DialogDescription;
export const Trigger = Primitive.DialogTrigger;

export interface DialogContentProps
  extends Primitive.DialogContentProps,
    VariantProps<typeof dialogVariant> {
  closeButton?: boolean;
}

export function Content({
  ui_size,
  children,
  className,
  closeButton = true,
  ...props
}: DialogContentProps) {
  const { overlay, content, close } = dialogVariant({ ui_size });

  return (
    <Primitive.Portal>
      <Primitive.Overlay className={overlay()} />
      <Primitive.Content className={content({ className })} {...props}>
        {children}
        {closeButton && (
          <Primitive.Close className={close()}>
            <CloseIcon />
          </Primitive.Close>
        )}
      </Primitive.Content>
    </Primitive.Portal>
  );
}
