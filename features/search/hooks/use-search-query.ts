import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "../server/queries";

// 특정 조건에 따라 검색을 수행합니다.
// 실제 구현 단계에서 다양한 쿼리 옵션을 반영할 예정입니다.
export default function useSearchQuery() {
  return useSuspenseQuery(queryOptions.search());
}
