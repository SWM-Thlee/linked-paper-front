import { toArray } from "@/utils/array";
import { Paper } from "../types";
import { ExtraIDResolver } from "./resolver";

export function convertToMetadata(
  res: Paper.Scheme.ResponseMetadata,
): Paper.Scheme.Metadata {
  return {
    id: res.id,
    extraID: ExtraIDResolver(res),

    title: res.title,
    abstraction: res.abstraction,
    journal: res.journal,
    authors: res.authors,
    categories: res.categories,
    date: res.date,

    referenceCount: res.reference_count,
    citationCount: res.citiation_count,
    originLink: toArray(res.origin_link),
    pdfLink: toArray(res.pdf_link),

    /* TODO: 버전의 경우 아직 미구현된 사항이므로 v1으로 표시됩니다. */
    version: "v1",
  };
}

export function convertToResult(
  res: Paper.Scheme.ResponseMetadata,
): Paper.Scheme.ResultMetadata {
  return {
    id: res.id,
    extraID: ExtraIDResolver(res),

    title: res.title,
    abstraction: res.abstraction,
    journal: res.journal,
    authors: res.authors,
    categories: res.categories,
    date: res.date,

    referenceCount: res.reference_count,
    citationCount: res.citiation_count,
    originLink: toArray(res.origin_link),
    pdfLink: toArray(res.pdf_link),

    /* 유사도가 지정되지 않은 경우 0으로 표시됩니다. */
    similarity: res.weight ?? 0,

    /* TODO: 버전의 경우 아직 미구현된 사항이므로 v1으로 표시됩니다. */
    version: "v1",
  };
}
