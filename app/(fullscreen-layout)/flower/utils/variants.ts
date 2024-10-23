import { baseVariants } from "@/utils/style/canvas-variants";

export const rootNode = baseVariants({
  slots: {
    node: [],
    title: ["text-title-large"],
    citation: ["text-label-large", "text-lg"],
    date: ["text-body-large"],
  },
  variants: {
    ui_variant: {
      default: {
        node: [
          "bg-light-secondary",
          "bg-dark-secondary",
          "text-light-onSecondary",
          "text-dark-onSecondary",
        ],
        title: ["text-light-onSecondary", "text-dark-onSecondary"],
        date: ["text-light-onSecondary", "text-dark-onSecondary"],
        citation: ["text-light-onSecondary", "text-dark-onSecondary"],
      },
      hovered: {
        node: [
          "border-8",
          "border-light-primary",
          "border-dark-primaryContainer",
          "bg-light-secondary",
          "bg-dark-secondary",
        ],
        title: ["text-light-onSecondary", "text-dark-onSecondary"],
        date: ["text-light-onSecondary", "text-dark-onSecondary"],
        citation: ["text-light-onSecondary", "text-dark-onSecondary"],
      },
      selected: {
        node: ["bg-light-primary", "bg-dark-primaryContainer"],
        title: ["text-light-onPrimary", "text-dark-onPrimaryContainer"],
        date: ["text-light-onPrimary", "text-dark-onPrimaryContainer"],
        citation: ["text-light-onPrimary", "text-dark-onPrimaryContainer"],
      },
    },
  },
});

export const childNode = baseVariants({
  slots: {
    node: [],
    title: ["text-title-large"],
    date: ["text-body-large"],
    citation: ["text-label-large", "text-lg"],
  },
  variants: {
    ui_variant: {
      default: {
        node: ["bg-light-tertiary/25", "bg-dark-tertiary/25"],
        title: ["text-light-onSurface", "text-dark-onSurface"],
        date: ["text-light-onSurface", "text-dark-onSurface"],
        citation: ["text-light-onSurface", "text-dark-onSurface"],
      },
      highSimilarity: {
        node: ["bg-light-tertiary/75", "bg-dark-tertiary/75"],
        title: ["text-light-onTertiary", "text-dark-onTertiary"],
        date: ["text-light-onTertiary", "text-dark-onTertiary"],
        citation: ["text-light-onTertiary", "text-dark-onTertiary"],
      },
      mediumSimilarity: {
        node: ["bg-light-tertiary/45", "bg-dark-tertiary/45"],
        title: ["text-light-onSurface", "text-dark-onSurface"],
        date: ["text-light-onSurface", "text-dark-onSurface"],
        citation: ["text-light-onSurface", "text-dark-onSurface"],
      },
      lowSimilarity: {
        node: ["bg-light-tertiary/15", "bg-dark-tertiary/15"],
        title: ["text-light-onSurface", "text-dark-onSurface"],
        date: ["text-light-onSurface", "text-dark-onSurface"],
        citation: ["text-light-onSurface", "text-dark-onSurface"],
      },
      hovered: {
        node: ["bg-light-tertiary", "bg-dark-tertiary"],
        title: ["text-light-onTertiary", "text-dark-onTertiary"],
        date: ["text-light-onTertiary", "text-dark-onTertiary"],
        citation: ["text-light-onTertiary", "text-dark-onTertiary"],
      },
      blooming: {
        node: [
          "border-8",
          "border-light-tertiary/25",
          "border-dark-tertiary/25",
        ],
        title: ["text-light-onSurface", "text-dark-onSurface"],
        date: ["text-light-onSurface", "text-dark-onSurface"],
        citation: ["text-light-onSurface", "text-dark-onSurface"],
      },
    },
  },
});

export const rootLink = baseVariants({
  slots: {
    link: ["border-[12px]"],
    container: ["text-title-small"],
  },
  variants: {
    ui_variant: {
      default: {
        link: ["bg-light-outlineVariant", "bg-dark-outlineVariant"],
        container: [
          "bg-light-outlineVariant",
          "bg-dark-outlineVariant",
          "text-light-onSurface",
          "text-dark-onSurface",
        ],
      },
      hovered: {
        link: ["bg-light-tertiaryContainer", "bg-dark-tertiaryContainer"],
        container: [
          "bg-light-tertiaryContainer",
          "bg-dark-tertiaryContainer",
          "text-light-onTertiaryContainer",
          "text-dark-onTertiaryContainer",
        ],
      },
    },
  },
});

export const childLink = baseVariants({
  slots: {
    link: ["border-4"],
    container: ["text-title-medium"],
  },
  variants: {
    ui_variant: {
      default: {
        link: ["bg-light-outlineVariant", "bg-dark-outlineVariant"],
        container: [
          "bg-light-outlineVariant",
          "bg-dark-outlineVariant",
          "text-light-onSurface/75",
          "text-dark-onSurface/75",
        ],
      },
      hovered: {
        link: ["bg-light-tertiary", "bg-dark-tertiary"],
        container: [
          "bg-light-tertiary",
          "bg-dark-tertiary",
          "text-light-onTertiary",
          "text-dark-onTertiary",
        ],
      },
      blooming: {
        link: ["bg-light-tertiaryContainer", "bg-dark-tertiaryContainer"],
        container: [
          "bg-light-tertiaryContainer",
          "bg-dark-tertiaryContainer",
          "text-light-onTertiaryContainer",
          "text-dark-onTertiaryContainer",
        ],
      },
      highSimilarity: {
        link: ["bg-light-primary", "bg-dark-primary"],
        container: [
          "bg-light-primary",
          "bg-dark-primary",
          "text-light-onPrimary",
          "text-dark-onPrimary",
        ],
      },
      mediumSimilarity: {
        link: ["bg-light-secondary", "bg-dark-secondary"],
        container: [
          "bg-light-secondary",
          "bg-dark-secondary",
          "text-light-onSecondary/75",
          "text-dark-onSecondary/75",
        ],
      },
      lowSimilarity: {
        link: ["bg-light-outlineVariant", "bg-dark-outlineVariant"],
        container: [
          "bg-light-outlineVariant",
          "bg-dark-outlineVariant",
          "text-light-onSurface/75",
          "text-dark-onSurface/75",
        ],
      },
    },
  },
});
