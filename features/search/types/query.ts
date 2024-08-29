import { SearchFilterInfo } from "./filter";

// 검색 시 정렬 방식을 나타냅니다.
export type SearchSortingType =
  | "recency" /* 최근에 게시된 논문 순 */
  | "similarity" /* 유사도가 높은 순 */
  | "citiation" /* 피인용 수가 높은 순 */;

// 현 검색 쿼리의 정보를 나타냅니다.
export type SearchQueryInfo = {
  query: string /* 검색어 */;
  filter: SearchFilterInfo /* 필터링 정보 */;
  sorting: SearchSortingType /* 정렬 방식 */;
  size: number /* 검색 결과물의 크기 */;
  index: number /* 검색 결과의 시작 위치 */;
  similarity_limit: boolean /* 유사도 제한 설정 여부 */;
};
