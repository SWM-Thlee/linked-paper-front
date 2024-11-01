"use client";

import { useEffect, useMemo } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { useAtomValue, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import isEqual from "react-fast-compare";

import { Search } from "@/features/search/types";
import { Filter } from "@/features/filter/types";
import { generateFilterDataID } from "@/features/filter/utils/id";
import usePrevious from "@/hooks/use-previous";
import {
  convertSearchFilterToQuery,
  convertSearchQueryToFilter,
} from "../utils/filter/query";
import {
  queryAtom,
  queryFilterIdAtom,
  queryStaleAtom,
  requiredQueryAtom,
} from "../stores/query";
import { validate } from "../utils/validator";

import useSearchFilterDispatcher from "../hooks/filter/use-search-filter-dispatcher";
import useSearchFilterEditor from "../hooks/filter/use-search-filter-editor";
import useSearchUpdate from "../hooks/query/use-search-update";

/**
 * Query String으로부터 검색 정보를 불러옵니다.
 */
export default function SearchQueryResolver({
  children,
}: React.PropsWithChildren) {
  // Query String이 Root 역할을 합니다.
  const searchParams = useSearchParams();
  const router = useSearchUpdate();

  const validation = useMemo(
    () =>
      validate({
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
      }),
    [searchParams],
  );

  if (!validation) {
    redirect("/error/400?from=Semantic Search&reason=Invalid Queries");
  }

  // Search Query를 Atom과 연동합니다.
  useHydrateAtoms([
    [queryAtom, validation],
    [queryFilterIdAtom, generateFilterDataID(Search.Filter.Type)],
  ]);

  const setStale = useSetAtom(queryStaleAtom);
  const setQueryInfo = useSetAtom(queryAtom);

  useEffect(() => {
    setQueryInfo(validation);
    setStale(false);

    return () => setStale(true);
  }, [setQueryInfo, setStale, validation]);

  // Filter System과 연동합니다.
  const queryFilterID = useAtomValue(queryFilterIdAtom);

  const dispatcher = useSearchFilterDispatcher({
    store: Filter.Store.TEMPORARY,
  });

  const { filter, remove } = useSearchFilterEditor({
    store: Filter.Store.TEMPORARY,
    dataID: queryFilterID,
  });

  // SearchQueryResolver가 Unmount되면 Filter는 자동으로 제거됩니다.
  useEffect(() => {
    return () => remove(true);
  }, [remove]);

  useEffect(() => {
    const queryToFilter = convertSearchQueryToFilter({
      ...validation,
      queryDataID: queryFilterID,
    });

    if (!filter) {
      dispatcher(queryToFilter);
      return;
    }

    if (!router.isInSearchPage()) return;
    if (isEqual(filter, queryToFilter)) return;

    router.update(convertSearchFilterToQuery(filter));
  }, [router, filter, validation, dispatcher, queryFilterID]);

  // Required Query
  const previousRequiredQuery = usePrevious<Search.Query.RequiredInfo>();
  const currentRequiredQuery = useAtomValue(requiredQueryAtom);

  useEffect(() => {
    if (!router.isInSearchPage()) return;
    if (previousRequiredQuery.isEqualTo(currentRequiredQuery)) return;

    previousRequiredQuery.setPrevious(currentRequiredQuery);
    router.update(currentRequiredQuery);
  }, [router, previousRequiredQuery, currentRequiredQuery]);

  return children;
}
