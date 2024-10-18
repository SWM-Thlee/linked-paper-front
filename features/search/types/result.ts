import { Paper } from "@/features/paper/types";

// 각 검색 결과는 유사도와 논문의 메타데이터를 모두 포함합니다.
export type Data = Paper.Scheme.Metadata & Paper.Similarity.Data;
