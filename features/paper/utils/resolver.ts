import { Paper } from "../types";

export function ArxivID(response: Paper.Scheme.ResponseMetadata) {
  return { [Paper.Scheme.Source.ARXIV]: response.arxiv_id };
}

export function SemanticScholarID(response: Paper.Scheme.ResponseMetadata) {
  return { [Paper.Scheme.Source.SEMANTIC_SCHOLAR]: response.semanticArxivId };
}

export function ExtraIDResolver(response: Paper.Scheme.ResponseMetadata) {
  return {
    ...ArxivID(response),
    ...SemanticScholarID(response),
  };
}
