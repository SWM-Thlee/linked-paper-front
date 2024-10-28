import { Metadata } from "next";

import { merge } from "@/utils/merge";
import { Flower } from "@/features/flower/types";
import { Correlations } from "@/features/flower/server/correlations";
import { DefaultMetadata } from "./default";

export async function createFlowerMetadata({
  searchParams,
}: {
  searchParams: Flower.Query.Params;
}) {
  const { id } = searchParams;

  if (!id) return DefaultMetadata;

  const flower = await Correlations({ paperID: id });

  if (flower.status === "ERROR") return DefaultMetadata;

  const {
    paper: { title, authors },
  } = flower;

  return merge<Metadata>(DefaultMetadata, {
    title: `${title} - Flower`,
    /* 저자와 제목의 단어들을 키워드로 삼습니다. */
    keywords: [...authors, ...title.split(" ")],
    openGraph: {
      images: {
        url: `res/og/flower?title=${title}`,
        alt: "Flower (Correlation) Graph View from Linked Paper",
        width: 1200,
        height: 630,
      },
      title: `Correlation Graph View - Explore Papers Related to ${title}`,
      description: `Discover the connections between "${title}" and related research through Flower Correlation. Our flower-shaped graph view makes it easy to explore academic relationships visually.`,
    },
    description: `Discover the connections between "${title}" and related research through Flower Correlation. Our flower-shaped graph view makes it easy to explore academic relationships visually.`,
  } satisfies Metadata);
}
