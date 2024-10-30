import { Metadata } from "next";

export const ogImages = {
  main: "og-main.png",
  search: "og-search.png",
  flower: "og-flower.png",
};

export const ogFonts = {
  title: "og-title.ttf",
  content: "og-content.ttf",
};

export type DefaultMetadata = typeof DefaultMetadata;

export const DefaultMetadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_DEV_ENDPOINT ?? "https://linked-paper.com",
  ),
  title: {
    default: "Linked Paper",
    template: "%s - Linked Paper",
  },
  description:
    "Linked Paper leverages semantic analysis and graph-based visualization to enhance academic paper discovery and provide personalized recommendations.",
  openGraph: {
    type: "website",
    title: "Linked Paper",
    url: "https://linked-paper.com",
    locale: "en-US",
    description:
      "Linked Paper leverages semantic analysis and graph-based visualization to enhance academic paper discovery and provide personalized recommendations.",
    siteName: "Linked Paper",
    images: ogImages.main,
  },
  icons: {
    icon: "./favicon.ico",
  },
} as const satisfies Metadata;
