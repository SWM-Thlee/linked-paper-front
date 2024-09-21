"use client";

import { useEffect, useMemo, useRef } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { useDeepCompareMemo } from "use-deep-compare";
import equal from "fast-deep-equal";

import { generateFilterDataID } from "@/features/filter/utils/id";
import { Filter } from "@/features/filter/types";
import { convertSearchQueryToFilter } from "../utils/filter/query";
import { queryAtom, queryFilterAtom, requiredQueryAtom } from "../stores/query";
import { validate } from "../utils/validator";
import { Search } from "../types";
import useSearchFilterDispatcher from "../hooks/filter/use-search-filter-dispatcher";
import useSearchFilterEditor from "../hooks/filter/use-search-filter-editor";
import useSearchRequest from "../hooks/query/use-search-request";

/**
 * Query String으로부터 검색 정보를 불러옵니다.
 *
 * 1. Server 단에서 (Initial Render 과정에서) 다른 Component가 사용할 수 있습니다.
 * 2. 해당 Search Query의 유효성 검증을 수행합니다. 유효하지 않은 정보가 존재할 경우 Error Page로 이동합니다.
 * 3. Search Query를 수정할 수 있습니다. 이때, 수정되는 즉시 Query String에 반영됩니다.
 */
export default function SearchQueryResolver({
  children,
}: React.PropsWithChildren) {
  const searchParams = useSearchParams();
  const router = useSearchRequest();

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
    // TODO: Error
    redirect("/search/error");
  }

  useHydrateAtoms([[queryAtom, validation]]);
  const [query, setQuery] = useAtom(queryAtom);

  /* Filter Query */
  const filterQuery = useDeepCompareMemo<Search.Query.FilterInfo>(
    () => ({
      filter_start_date: query.filter_start_date,
      filter_end_date: query.filter_end_date,
      filter_journal: query.filter_journal,
      filter_category: query.filter_category,
    }),
    [query],
  );

  const searchFilterRef = useRef(generateFilterDataID(Search.Filter.Type));
  const [, setQueryFilter] = useAtom(queryFilterAtom);

  const dispatcher = useSearchFilterDispatcher({
    store: Filter.Store.TEMPORARY,
  });

  const { filter, remove } = useSearchFilterEditor({
    store: Filter.Store.TEMPORARY,
    dataID: searchFilterRef.current,
  });

  useEffect(() => {
    setQuery(validation);
  }, [setQuery, validation]);

  useEffect(() => {
    return () => remove(true);
  }, [remove]);

  useEffect(() => {
    setQueryFilter(filter);
  }, [filter, setQueryFilter]);

  useEffect(() => {
    const queryToFilter = convertSearchQueryToFilter({
      ...filterQuery,
      queryDataID: searchFilterRef.current,
    });

    if (!filter) {
      dispatcher(queryToFilter);
      return;
    }

    if (equal(queryToFilter.attributes, filter.attributes)) return;

    router.update();
  }, [router, filter, dispatcher, filterQuery]);

  /* Required Query */
  const requiredQuery = useDeepCompareMemo<Search.Query.RequiredInfo>(
    () => ({
      query: query.query,
      index: query.index,
      size: query.size,
      similarity_limit: query.similarity_limit,
      sorting: query.sorting,
    }),
    [query],
  );

  const [currentRequiredQuery, initRequiredQuery] = useAtom(requiredQueryAtom);

  useEffect(() => {
    if (!currentRequiredQuery) initRequiredQuery(requiredQuery);
  }, [currentRequiredQuery, initRequiredQuery, requiredQuery]);

  useEffect(() => {
    return () => initRequiredQuery(null);
  }, [initRequiredQuery]);

  useEffect(() => {
    if (!router.canUpdate() || equal(requiredQuery, currentRequiredQuery))
      return;

    router.update();
  }, [router, currentRequiredQuery, requiredQuery]);

  return children;
}
