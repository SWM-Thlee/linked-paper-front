import { CSSVariants } from "@/utils/style/canvas-variants";

export const variants = {
  rootStyle: {
    defaultNode: [
      "text-title-small",
      "bg-light-secondary",
      "bg-dark-secondary",
      "text-light-onSecondary",
      "text-dark-onSecondary",
    ],
    selected: [
      "text-title-small",
      "bg-light-primary",
      "text-light-onPrimary",
      "bg-dark-primaryContainer",
      "text-dark-onPrimaryContainer",
    ],
    hovered: [
      "text-title-small",
      "border-8",
      "border-light-primary",
      "border-dark-primaryContainer",
      "bg-light-secondary",
      "bg-dark-secondary",
      "text-light-onSecondary",
      "text-dark-onSecondary",
    ],
  },
  childStyle: {
    defaultNode: [
      "text-title-small",
      "bg-light-tertiary/25",
      "bg-dark-tertiary/25",
      "text-light-onSurface",
      "text-dark-onSurface",
    ],
    hovered: [
      "text-title-small",
      "bg-light-tertiary",
      "bg-dark-tertiary",
      "text-light-onTertiary",
      "text-dark-onTertiary",
    ],
    blooming: [
      "border-8",
      "text-title-small",
      "border-light-tertiary/25",
      "border-dark-tertiary/25",
      "text-light-onSurface",
      "text-dark-onSurface",
    ],
  },
  rootLinkStyle: {
    base: ["border-[12px]"],
    defaultLink: [
      "text-title-small",
      "bg-light-outlineVariant",
      "bg-dark-outlineVariant",
      "text-light-onSurface",
      "text-dark-onSurface",
    ],
    hovered: [
      "text-title-small",
      "bg-light-tertiaryContainer",
      "bg-dark-tertiaryContainer",
      "text-light-onTertiaryContainer",
      "text-dark-onTertiaryContainer",
    ],
  },
  childLinkStyle: {
    base: ["border-4"],
    hovered: [
      "text-title-medium",
      "bg-light-tertiary",
      "bg-dark-tertiary",
      "text-light-onTertiary",
      "text-dark-onTertiary",
    ],
    blooming: [
      "text-title-medium",
      "bg-light-tertiaryContainer",
      "bg-dark-tertiaryContainer",
      "text-light-onTertiaryContainer",
      "text-dark-onTertiaryContainer",
    ],
    highSimilarity: [
      "text-title-medium",
      "bg-light-primary",
      "bg-dark-primary",
      "text-light-onPrimary",
      "text-dark-onPrimary",
    ],
    mediumSimilarity: [
      "text-title-medium",
      "bg-light-secondary",
      "bg-dark-secondary",
      "text-light-onSecondary/75",
      "text-dark-onSecondary/75",
    ],
    lowSimilarity: [
      "text-title-medium",
      "bg-light-outlineVariant",
      "bg-dark-outlineVariant",
      "text-light-onSurface/75",
      "text-dark-onSurface/75",
    ],
  },
} satisfies CSSVariants;
