import { delay, repeat } from "@/utils/sample";
import { searchResult } from "../utils/sample";

// 실제 서버에서 데이터를 받는 대신 샘플 데이터를 가져옵니다.
const SAMPLE_MODE = true;

// 검색 쿼리에 대한 세부 옵션을 나타냅니다.
export const queryOptions = {
  search: () => ({
    queryKey: ["LP_SEARCH"],
    queryFn: SAMPLE_MODE
      ? // 1초 (로딩) 후 20개의 검색 결과 샘플 데이터가 반환됩니다.
        delay(1000, () => repeat(20, searchResult))
      : // 실제 검색을 수행하는 쿼리
        async () => [searchResult()],
  }),
};
