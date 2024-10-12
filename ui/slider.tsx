"use client";

import * as Primitive from "@radix-ui/react-slider";

import { tv, VariantProps } from "@/utils/tailwind-variants";

export const sliderVariant = tv({
  slots: {
    wrapper: ["flex", "rounded-circle", "p-1"],
    root: [
      "relative",
      "group/slider",
      "flex items-center",
      "h-3",
      "touch-none select-none",
      "rounded-circle",
      "overflow-hidden",
    ],
    track: ["relative", "h-3", "grow", "rounded-circle"],
    range: ["absolute", "h-3", "rounded-l-circle"],
    thumbWrapper: ["z-10", "block", "w-3 h-3"],
    thumb: [
      "flex items-center justify-center",
      "w-full h-full",
      "rounded-r-circle",
    ],
    thumbIndicator: ["w-2 h-2", "rounded-circle", "transition-colors"],
  },

  variants: {
    ui_color: {
      primary: {
        wrapper: ["bg-light-primaryContainer", "dark:bg-dark-primaryContainer"],
        track: ["bg-light-primaryContainer", "dark:bg-dark-primaryContainer"],
        range: [
          "bg-light-onPrimaryContainer",
          "dark:bg-dark-onPrimaryContainer",
        ],
        thumbWrapper: [
          "bg-light-primaryContainer",
          "dark:bg-dark-primaryContainer",
        ],
        thumb: [
          "bg-light-onPrimaryContainer",
          "dark:bg-dark-onPrimaryContainer",
        ],
        thumbIndicator: [
          "group-hover/slider:bg-light-primaryContainer",
          "dark:group-hover/slider:bg-dark-primaryContainer",
        ],
      },
      secondary: {
        wrapper: [
          "bg-light-secondaryContainer",
          "dark:bg-dark-secondaryContainer",
        ],
        track: [
          "bg-light-secondaryContainer",
          "dark:bg-dark-secondaryContainer",
        ],
        range: [
          "bg-light-onSecondaryContainer",
          "dark:bg-dark-onSecondaryContainer",
        ],
        thumbWrapper: [
          "bg-light-secondaryContainer",
          "dark:bg-dark-secondaryContainer",
        ],
        thumb: [
          "bg-light-onSecondaryContainer",
          "dark:bg-dark-onSecondaryContainer",
        ],
        thumbIndicator: [
          "group-hover/slider:bg-light-secondaryContainer",
          "dark:group-hover/slider:bg-dark-secondaryContainer",
        ],
      },
      tertiary: {
        wrapper: [
          "bg-light-tertiaryContainer",
          "dark:bg-dark-tertiaryContainer",
        ],
        track: ["bg-light-tertiaryContainer", "dark:bg-dark-tertiaryContainer"],
        range: [
          "bg-light-onTertiaryContainer",
          "dark:bg-dark-onTertiaryContainer",
        ],
        thumbWrapper: [
          "bg-light-tertiaryContainer",
          "dark:bg-dark-tertiaryContainer",
        ],
        thumb: [
          "bg-light-onTertiaryContainer",
          "dark:bg-dark-onTertiaryContainer",
        ],
        thumbIndicator: [
          "group-hover/slider:bg-light-tertiaryContainer",
          "dark:group-hover/slider:bg-dark-tertiaryContainer",
        ],
      },
    },
  },

  defaultVariants: {
    ui_color: "primary",
  },
});

export interface SliderProps
  extends VariantProps<typeof sliderVariant>,
    Primitive.SliderProps {}

/** **주의**: absolute width를 명시해야 합니다. */
export default function Slider({ ui_color, className, ...props }: SliderProps) {
  const { wrapper, root, range, thumb, thumbIndicator, thumbWrapper, track } =
    sliderVariant({
      ui_color,
    });

  return (
    <div className={wrapper()}>
      <Primitive.Root className={root({ className })} {...props}>
        <Primitive.Track className={track()}>
          <Primitive.Range className={range()} />
        </Primitive.Track>
        <Primitive.Thumb className={thumbWrapper()} aria-label="Volume">
          <div className={thumb()}>
            <div className={thumbIndicator()} />
          </div>
        </Primitive.Thumb>
      </Primitive.Root>
    </div>
  );
}
