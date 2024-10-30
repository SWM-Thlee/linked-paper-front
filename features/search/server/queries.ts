import { infiniteQueryOptions } from "@tanstack/react-query";

import { Search } from "../types";
import { SearchResult } from "./result";

export const queryKeys = {
  all: ["semantic-search"] as const,

  /* 동일한 검색 쿼리는 Context가 유지되는 동안(새로고침을 하기 전까지는) Cache 됩니다. */
  result: (info: Search.Query.Info) =>
    [...queryKeys.all, "result", info] as const,
};

export const queryOptions = {
  result: (info: Search.Query.Info) =>
    infiniteQueryOptions({
      queryKey: queryKeys.result(info),
      queryFn: ({ pageParam }) => SearchResult({ ...info, index: pageParam }),
      staleTime: Infinity,
      retry: false,

      initialPageParam: info.index,
      getNextPageParam: (_, allPages) => {
        const reversedPages = [...allPages].reverse();
        const success = reversedPages.find((value) => value.status !== "ERROR");

        // ERROR만 존재하는 경우 Initial Index가 Next Page입니다.
        if (!success) return info.index;

        return success.status !== "LAST_PAGE"
          ? success.index + success.count
          : null;
      },

      select({ pages, pageParams }) {
        const reversedPages = [...pages].reverse();

        const failIndex = reversedPages.findIndex(
          (value) => value.status === "ERROR",
        );

        const succeededPages = pages.filter(
          (value) => value.status !== "ERROR",
        );
        const succeededParams = pageParams.filter(
          (_, index) => pages[index].status !== "ERROR",
        );

        return {
          pages: succeededPages,
          pageParams: succeededParams,
          fail: failIndex >= 0 && failIndex === pages.length - 1,
        };
      },
    }),
};
