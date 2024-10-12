import { CSSVariants } from "@/utils/canvas-variants";

export const variants = {
  node: {
    // 선택되지 않은 Root Node
    root: [
      "text-display-medium",
      "border-light-outline",
      "border-dark-outline",
      "text-light-onSurface/75",
      "text-dark-onSurface/75",
    ],

    // 선택된 Root Node
    rootSelected: [
      "text-display-medium",
      "bg-light-secondary",
      "text-light-onSecondary",
      "bg-dark-secondary",
      "text-dark-onSecondary",
    ],

    // 호버된 Root Node
    rootHovered: [
      "text-display-medium",
      "bg-light-secondary/75",
      "text-light-onSecondary",
      "bg-dark-secondary/75",
      "text-dark-onSecondary",
    ],

    // Child Node
    child: [
      "text-display-medium",
      "bg-light-tertiary/25",
      "bg-dark-tertiary/25",
      "text-light-onSurface",
      "text-dark-onSurface",
    ],

    // 호버된 Child Node
    childHovered: [
      "text-display-large",
      "bg-light-tertiary",
      "bg-dark-tertiary",
      "text-light-onTertiary",
      "text-dark-onTertiary",
    ],
  },
  link: {
    default: ["bg-light-outlineVariant", "bg-dark-outlineVariant"],
  },
} satisfies CSSVariants;
