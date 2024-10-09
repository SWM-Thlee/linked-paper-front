import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { RawSearchQueryInfo } from "../../types/query";
import { SearchQueryConverter as Converter } from "../../utils/query-converter";

/**
 * Querystring으로부터 검색 정보를 가져옵니다.
 * - 배열로 전달되는 정보의 경우, 각 원소는 다음과 같이 전달됩니다.
 * - ex. filter_category={c1}=filter_category={c2}=filter_category={c3}...
 *
 * **참고:** 각 Attribute 중 유효하지 않은 값이 존재하는 경우, 두 가지로 종류가 나뉩니다.
 *
 * 1. **[sorting, size, index, similarity_limit, filter_start_date, filter_end_date]**
 * - 기본 값으로 설정됩니다.
 *
 * 2. **[filter_journal, filter_category]**
 * - 해당 데이터를 수정하지 않고 그대로 두는데, 이러한 행동에 대해 아래와 같은 근거를 들 수 있습니다.
 * - Journal이나 Category의 종류는 유동적으로 변하게 됩니다. 특정 시점에서 해당 Journal이나 Category가 존재하지 않을 수 있지만,
 * 어떤 시점에는 존재할 가능성이 있기 때문에 그대로 유지합니다.
 */
export default function useSearchInfoFromQuery() {
  const params = useSearchParams();

  /** Search Query로부터 Filter 정보를 가져옵니다. */
  const info = useMemo<RawSearchQueryInfo>(
    () => ({
      // Search Info
      query: Converter.query(params.get("query")),
      sorting: Converter.sorting(params.get("sorting")),
      size: Converter.size(params.get("size")),
      index: Converter.index(params.get("index")),
      similarity_limit: Converter.similarity_limit(
        params.get("similarity_limit"),
      ),

      // Filter
      filter_start_date: Converter.filter_start_date(
        params.get("filter_start_date"),
      ),
      filter_end_date: Converter.filter_end_date(params.get("filter_end_date")),
      filter_journal: Converter.filter_journal(params.getAll("filter_journal")),
      filter_category: Converter.filter_category(
        params.getAll("filter_category"),
      ),
    }),
    [params],
  );

  return { info };
}
