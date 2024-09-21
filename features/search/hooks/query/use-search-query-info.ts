import { useMemo } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import { queryAtom, requiredQueryAtom } from "../../stores/query";
import { Search } from "../../types";

/**
 * QueryString으로부터 검색 정보를 가져옵니다.
 *
 * **주의**: SearchQueryResolver 내에서 호출하여야 합니다.
 */
export default function useSearchQueryInfo() {
  const info = useAtomValue(queryAtom);

  const requiredQuery = useMemo<Search.Query.RequiredInfo>(
    () => ({
      query: info.query,
      index: info.index,
      similarity_limit: info.similarity_limit,
      size: info.size,
      sorting: info.sorting,
    }),
    [info],
  );
  const setRequiredQuery = useSetAtom(requiredQueryAtom);

  return { info, requiredQuery, setRequiredQuery };
}
