import { PaperMetadata } from "@/types/paper";

// 각 검색 결과의 (검색어와의) 유사도를 나타냅니다.
export type SearchSimilarity = { similarity: number };

// 각 검색 결과는 유사도와 논문의 메타데이터를 모두 포함합니다.
export type SearchResult = PaperMetadata & SearchSimilarity;
