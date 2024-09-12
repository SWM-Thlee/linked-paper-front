// 논문의 버전을 나타냅니다.
export type PaperVersion = {
  version: string /* 버전 정보 */;
  date: string /* 게시일 */;
};

// 논문의 외부 링크의 종류를 나타냅니다.
export type PaperExternalLinkType =
  | "origin_link" /* 원문을 볼 수 있는 출처 */
  | "pdf_link"; /* PDF 파일 링크 */

// 논문의 외부 링크를 나타냅니다.
export type PaperExternalLink = {
  // 각 종류 당 링크는 여러 개일 수 있습니다.
  [link in PaperExternalLinkType]?: string | string[];
};

// 논문의 메타데이터를 나타냅니다.
export type PaperMetadata = {
  id: string /* 고유 ID */;
  title: string /* 제목 */;
  authors: string[] /* 저자 정보 */;
  fields: string[] /* 분야 정보 */;
  journal: string /* 저널 */;
  abstraction: string /* 초록 */;
  tldr?: string /* 요약 */;
  reference_count: number /* 인용 횟수 */;
  citiation_count: number /* 피인용 횟수 */;
  link: PaperExternalLink /* 외부 링크 */;
} & PaperVersion;
