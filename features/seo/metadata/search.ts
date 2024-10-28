import { Metadata } from "next";

import { merge } from "@/utils/merge";
import { Search } from "@/features/search/types";
import { DefaultMetadata } from "./default";

export async function createSearchMetadata({
  searchParams,
}: {
  searchParams: Search.Query.Params;
}) {
  const { query } = searchParams;
  if (!query) return DefaultMetadata;

  return merge<Metadata>(DefaultMetadata, {
    title: `${query} - Search`,
    openGraph: {
      images: {
        url: `res/og/search?query=${query}`,
        alt: "Semantic Search Result Page from Linked Paper",
        width: 1200,
        height: 630,
      },
      title: `Semantic Search - Explore Papers on ${query}`,
      description: `Discover research papers related to "${query}" using our advanced semantic search. Enter descriptive phrases and find the most relevant studies with ease.`,
    },
    description: `Discover research papers related to "${query}" using our advanced semantic search. Enter descriptive phrases and find the most relevant studies with ease.`,
  } satisfies Metadata);
}
