import { tv, VariantProps } from "@/utils/tailwind-variants";
import * as UiTooltip from "@radix-ui/react-tooltip";

const tooltipVariant = tv({
  slots: {
    content: [
      "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
      "data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade",
      "data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade",
      "data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
      "select-none",
      "rounded-[0.25rem]",
      "px-3",
      "py-1.5",
      "leading-none",
      "will-change-[transform,opacity]",
      "z-50",
    ],
    arrow: ["z-50"],
  },
  variants: {
    _color: {
      primary: {
        content: [
          "bg-light-primaryContainer",
          "text-light-onPrimaryContainer",
          "dark:bg-dark-primaryContainer",
          "dark:text-dark-onPrimaryContainer",
        ],
        arrow: [
          "fill-light-primaryContainer",
          "dark:fill-dark-primaryContainer",
        ],
      },
      secondary: {
        content: [
          "bg-light-secondaryContainer",
          "text-light-onSecondaryContainer",
          "dark:bg-dark-secondaryContainer",
          "dark:text-dark-onSecondaryContainer",
        ],
        arrow: [
          "fill-light-secondaryContainer",
          "dark:fill-dark-secondaryContainer",
        ],
      },
      tertiary: {
        content: [
          "bg-light-tertiaryContainer",
          "text-light-onTertiaryContainer",
          "dark:bg-dark-tertiaryContainer",
          "dark:text-dark-onTertiaryContainer",
        ],
        arrow: [
          "fill-light-tertiaryContainer",
          "dark:fill-dark-tertiaryContainer",
        ],
      },
      error: {
        content: [
          "bg-light-errorContainer",
          "text-light-onErrorContainer",
          "dark:bg-dark-errorContainer",
          "dark:text-dark-onErrorContainer",
        ],
        arrow: ["fill-light-errorContainer", "dark:fill-dark-errorContainer"],
      },
    },
  },
  defaultVariants: {
    _color: "primary",
  },
});

type Props = { children: React.ReactNode; title: string } & VariantProps<
  typeof tooltipVariant
>;

export default function Tooltip({ _color, children, title }: Props) {
  const { content, arrow } = tooltipVariant({ _color });

  return (
    <UiTooltip.Root delayDuration={100}>
      <UiTooltip.Trigger asChild>{children}</UiTooltip.Trigger>
      <UiTooltip.Portal>
        <UiTooltip.Content className={content()} sideOffset={5}>
          {title}
          <UiTooltip.Arrow className={arrow()} />
        </UiTooltip.Content>
      </UiTooltip.Portal>
    </UiTooltip.Root>
  );
}
