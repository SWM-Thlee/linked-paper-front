"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDeepCompareMemo } from "use-deep-compare";
import equal from "fast-deep-equal";

import { Tag } from "@/features/filter/types/tag";
import { FilterStore } from "@/features/filter/types/store";
import { generateFilterDataID } from "@/features/filter/utils/id";
import useSearchFilterDispatcher from "../../hooks/filter/use-search-filter-dispatcher";
import useSearchInfoFromQuery from "../../hooks/query/use-search-info-from-query";
import useSearchFilters from "../../hooks/filter/use-search-filters";
import { SearchQueryFilterContext } from "./context";
import { Search } from "../../types";
import {
  fromSearchFilterToQuery,
  fromSearchQueryToFilter,
  SearchQueryFilterData,
} from "../../utils/filter/query";

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

  const { filter: currentFilter } = useSearchFilters({
    store: FilterStore.TEMPORARY,
    track: { tag: [Tag.QUERY, [Tag.EDIT]] },
  });

  useEffect(() => {
    const filterFromQuery = fromSearchQueryToFilter({
      ...queryFilterInfo,
      queryDataID: searchFilterRef.current,
    });

    if (!currentFilter) {
      dispatcher(filterFromQuery);
      return;
    }

    if (equal(filterFromQuery.attributes, currentFilter.attributes)) return;

    const queryFromFilter = fromSearchFilterToQuery(currentFilter);
    const queryToRefresh = {
      ...otherQueryInfo,
      ...queryFromFilter,
    } satisfies SearchQueryFilterData;

    // Filter가 수정된 경우 Search Query에도 반영합니다.
    router.replace(
      `/search?${Object.entries(queryToRefresh)
        .filter(([, value]) => value)
        .map(([key, value]) =>
          Array.isArray(value)
            ? value.map((elem) => `${key}=${elem}`).join("&")
            : `${key}=${value}`,
        )
        .join("&")}`,
    );
  }, [otherQueryInfo, router, currentFilter, dispatcher, queryFilterInfo]);

  return (
    <SearchQueryFilterContext.Provider
      value={useMemo(
        () => ({ filter: currentFilter, info: queryFilterInfo }),
        [currentFilter, queryFilterInfo],
      )}
    >
      {children}
    </SearchQueryFilterContext.Provider>
  );
}
