export const Source = {
  ARXIV: "arxiv",
  SEMANTIC_SCHOLAR: "semantic_scholar",
} as const;

export type Source = (typeof Source)[keyof typeof Source];

export type Id = string;
export type Version = string;

// 논문의 메타데이터를 나타냅니다.
export interface Metadata {
  id: Id;
  extraID: { [platform in Source]?: string };

  title: string;
  authors: string[];
  categories: string[];
  journal: string;
  abstraction: string;
  date: string;

  referenceCount: number;
  citationCount: number;

  originLink: string[];
  pdfLink: string[];

  version: Version;
}

export interface ResultMetadata extends Metadata {
  similarity: number;
}

export interface ResponseMetadata {
  /* 고유 ID */
  id: Id;

  /* arXiv로부터 추출된 논문 ID */
  arxiv_id?: string;
  semanticArxivId?: string;

  /* 논문 메타데이터 */
  title: string;
  authors: string[];
  categories: string[];
  journal: string;
  abstraction: string;
  date: string;

  /* 인용 및 피인용 횟수 */
  reference_count: number;
  citiation_count: number /* TODO: 오타 */;

  /* 논문의 외부 링크 */
  origin_link?: string | string[];
  pdf_link?: string | string[];

  /* 다른 대상과의 유사도 */
  weight?: number;
}
