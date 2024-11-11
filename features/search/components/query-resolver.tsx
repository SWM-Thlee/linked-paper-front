"use client";

import { useEffect, useMemo, useRef } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { useAtomValue, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import isEqual from "react-fast-compare";
import { v4 as uuidv4 } from "uuid";

import { Search } from "@/features/search/types";
import useFilters from "@/features/filter/hooks/use-filters";
import usePrevious from "@/hooks/use-previous";
import {
  queryAtom,
  queryFilterIdAtom,
  queryStaleAtom,
  requiredQueryAtom,
} from "../stores/query";
import useSearchUpdate from "../hooks/query/use-search-update";
import useQuerySearchFilter from "../hooks/filter/use-query-search-filter";
import { filterToQuery, queryToFilter } from "../utils/query";

/**
 * Query String으로부터 검색 정보를 불러옵니다.
 */
export default function SearchQueryResolver({
  children,
}: React.PropsWithChildren) {
  // Query String이 Root 역할을 합니다.
  const searchParams = useSearchParams();
  const router = useSearchUpdate();

  const validation = useMemo(() => {
    const result = Search.Query.Info.safeParse({
      // Required Info
      query: searchParams.get("query"),
      sorting: searchParams.get("sorting"),
      size: searchParams.get("size"),
      index: searchParams.get("index"),
      similarity_limit: searchParams.get("similarity_limit"),

      // Filter Info
      filter_start_date: searchParams.get("filter_start_date"),
      filter_end_date: searchParams.get("filter_end_date"),
      filter_journal: searchParams.getAll("filter_journal"),
      filter_category: searchParams.getAll("filter_category"),
    });

    if (!result.success) {
      redirect("/error/400?from=Semantic Search&reason=Invalid Queries");
    }

    return result.data;
  }, [searchParams]);

  // Search Query를 Atom과 연동합니다.
  useHydrateAtoms([
    [queryAtom, validation],
    [queryFilterIdAtom, uuidv4()],
  ]);

  const setStale = useSetAtom(queryStaleAtom);
  const setQueryInfo = useSetAtom(queryAtom);

  useEffect(() => {
    setQueryInfo(validation);
    setStale(false);

    return () => setStale(true);
  }, [setQueryInfo, setStale, validation]);

  // Filter System과 연동합니다.
  const { id, filter, remove } = useQuerySearchFilter();
  const { dispatch } = useFilters();
  const initial = useRef(false);

  // 0. Filter가 없을 경우 Query에서 Filter를 불러옵니다.
  useEffect(() => {
    if (filter || initial.current) return;

    initial.current = true;

    dispatch(
      queryToFilter({
        ...validation,
        id,
      }),
    );
  }, [dispatch, validation, id, filter, remove]);

  // 1. Filter를 수정할 경우 검색 결과를 재요청합니다.
  useEffect(() => {
    if (!filter || !router.isInSearchPage()) return;

    const filterFromQuery = queryToFilter({
      ...validation,
      id,
    });

    if (isEqual(filter, filterFromQuery)) return;

    router.update(filterToQuery(filter.attributes));
  }, [router, filter, validation, id]);

  // 2. Query가 수정될 경우 검색 결과를 재요청합니다.
  const prevQuery = usePrevious<Search.Query.Required>();
  const currentQuery = useAtomValue(requiredQueryAtom);

  useEffect(() => {
    if (!router.isInSearchPage()) return;
    if (prevQuery.isEqualTo(currentQuery)) return;

    prevQuery.setPrevious(currentQuery);
    router.update(currentQuery);
  }, [router, prevQuery, currentQuery]);

  return children;
}
