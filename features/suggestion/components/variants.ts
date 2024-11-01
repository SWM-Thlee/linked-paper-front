import { tv, VariantProps } from "@/utils/style/tailwind-variants";

export const suggestionsVariant = tv({
  slots: {
    root: "flex items-stretch gap-4",
    item: "flex flex-1 animate-fadeIn select-none items-center justify-between gap-2 p-6 text-left",
    itemText: "w-[16rem] text-label-large",
    nextButton:
      "flex select-none items-center justify-between gap-4 p-6 text-left",
    nextButtonText: "w-[8rem] text-label-large",
  },
  variants: {
    ui_variant: {
      horizontal: {
        root: "flex-row",
      },
      vertical: {
        root: "flex-col",
      },
    },
  },
  defaultVariants: {
    ui_variant: "horizontal",
  },
});

export type SuggestionsProps = VariantProps<typeof suggestionsVariant>;
