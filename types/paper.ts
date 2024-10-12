export type PaperExternalLinkType = "origin_link" | "pdf_link";

export type PaperExternalLink = {
  [link in PaperExternalLinkType]?: string | string[];
};

// 논문의 메타데이터를 나타냅니다.
export type PaperMetadata = {
  id: string;
  title: string;
  authors: string[];
  categories: string[];
  journal: string;
  abstraction: string;
  reference_count: number;
  citiation_count: number;
  date: string;

  // Original Link와 PDF Link 각각 하나씩만 존재합니다.
  link: PaperExternalLink;

  // TODO: 구현 예정. 빈 값으로 둡니다.
  tldr?: string;

  // TODO: 구현 예정. V1으로 통일합니다.
  version: string;
};
