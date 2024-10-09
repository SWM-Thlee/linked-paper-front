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
  tldr?: string;
  reference_count: number;
  citiation_count: number;
  link: PaperExternalLink;
  date: string;
  version: string;
};
