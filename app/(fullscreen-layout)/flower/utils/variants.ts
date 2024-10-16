import { CSSVariants } from "@/utils/style/canvas-variants";

export const variants = {
  rootStyle: {
    defaultNode: [
      "text-display-medium",
      "border-8",
      "border-light-outline",
      "border-dark-outline",
      "text-light-onSurface/75",
      "text-dark-onSurface/75",
    ],
    selected: [
      "text-display-medium",
      "bg-light-secondary",
      "text-light-onSecondary",
      "bg-dark-secondary",
      "text-dark-onSecondary",
    ],
    hovered: [
      "text-display-medium",
      "bg-light-secondary/75",
      "text-light-onSecondary",
      "bg-dark-secondary/75",
      "text-dark-onSecondary",
    ],
  },
  childStyle: {
    defaultNode: [
      "text-display-medium",
      "bg-light-tertiary/25",
      "bg-dark-tertiary/25",
      "text-light-onSurface",
      "text-dark-onSurface",
    ],
    hovered: [
      "text-display-medium",
      "bg-light-tertiary",
      "bg-dark-tertiary",
      "text-light-onTertiary",
      "text-dark-onTertiary",
    ],
    blooming: [
      "border-8",
      "text-display-medium",
      "border-light-tertiary/25",
      "border-dark-tertiary/25",
      "text-light-onSurface",
      "text-dark-onSurface",
    ],
  },
  rootLinkStyle: {
    base: ["border-4"],
    defaultLink: [
      "text-title-large",
      "bg-light-tertiaryContainer",
      "bg-dark-tertiaryContainer",
      "text-light-onTertiaryContainer",
      "text-dark-onTertiaryContainer",
    ],
  },
  childLinkStyle: {
    base: ["border-4"],
    hovered: [
      "text-title-large",
      "bg-light-tertiary",
      "bg-dark-tertiary",
      "text-light-onTertiary",
      "text-dark-onTertiary",
    ],
    highSimilarity: [
      "text-title-large",
      "bg-light-primary",
      "bg-dark-primary",
      "text-light-onPrimary",
      "text-dark-onPrimary",
    ],
    mediumSimilarity: [
      "text-title-large",
      "bg-light-secondary",
      "bg-dark-secondary",
      "text-light-onSecondary/75",
      "text-dark-onSecondary/75",
    ],
    lowSimilarity: [
      "text-title-large",
      "bg-light-outlineVariant",
      "bg-dark-outlineVariant",
      "text-light-onSurface/75",
      "text-dark-onSurface/75",
    ],
  },
} satisfies CSSVariants;
