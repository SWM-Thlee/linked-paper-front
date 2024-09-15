"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDeepCompareMemo } from "use-deep-compare";
import equal from "fast-deep-equal";

import { FilterStore } from "@/features/filter/types/store";
import { generateFilterDataID } from "@/features/filter/utils/id";
import useSearchFilterDispatcher from "../../hooks/filter/use-search-filter-dispatcher";
import useSearchInfoFromQuery from "../../hooks/query/use-search-info-from-query";
import { SearchQueryFilterContext } from "./context";
import { Search } from "../../types";
import {
  convertSearchFilterToQuery,
  convertSearchQueryToFilter,
  convertToQueryString,
  SearchQueryFilterData,
} from "../../utils/filter/query";
import useSearchFilterEditor from "../../hooks/filter/use-search-filter-editor";

type Props = React.PropsWithChildren;

export default function SearchQueryFilterProvider({ children }: Props) {
  // Search Query와 연동되는 Filter는 단일 ID를 항상 유지하고 있어야 합니다.
  const searchFilterRef = useRef(generateFilterDataID(Search.Type));
  const router = useRouter();

  /* eslint-disable @typescript-eslint/naming-convention */
  const {
    info: {
      filter_category,
      filter_end_date,
      filter_journal,
      filter_start_date,
      ...otherQueryInfo
    },
  } = useSearchInfoFromQuery();

  const queryFilterInfo = useDeepCompareMemo(
    () => ({
      filter_category,
      filter_end_date,
      filter_journal,
      filter_start_date,
    }),
    [filter_category, filter_end_date, filter_journal, filter_start_date],
  );

  const dispatcher = useSearchFilterDispatcher({
    store: FilterStore.TEMPORARY,
  });

  const { filter, remove } = useSearchFilterEditor({
    store: FilterStore.TEMPORARY,
    dataID: searchFilterRef.current,
  });

  // Search Page를 벗어나면 기존의 Search Query Filter는 모두 삭제되어야 합니다.
  useEffect(() => {
    return () => remove(true);
  }, [remove]);

  useEffect(() => {
    const filterFromQuery = convertSearchQueryToFilter({
      ...queryFilterInfo,
      queryDataID: searchFilterRef.current,
    });

    if (!filter) {
      dispatcher(filterFromQuery);
      return;
    }

    if (equal(filterFromQuery.attributes, filter.attributes)) return;

    const queryFromFilter = convertSearchFilterToQuery(filter);
    const queryToRefresh = {
      ...otherQueryInfo,
      ...queryFromFilter,
    } satisfies SearchQueryFilterData;

    // Filter가 수정된 경우 Search Query에도 반영합니다.
    router.replace(`/search?${convertToQueryString(queryToRefresh)}`);
  }, [otherQueryInfo, router, filter, dispatcher, queryFilterInfo]);

  return (
    <SearchQueryFilterContext.Provider
      value={useMemo(
        () => ({ filter, info: queryFilterInfo }),
        [filter, queryFilterInfo],
      )}
    >
      {children}
    </SearchQueryFilterContext.Provider>
  );
}
