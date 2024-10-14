import { queryOptions as defaultQueryOptions } from "@tanstack/react-query";

import { Correlations } from "./correlations";
import { Flower } from "../types";

export const queryKeys = {
  all: ["flower"] as const,

  correlation: ({ paperID }: Flower.Query.Info) =>
    [...queryKeys.all, "correlations", paperID] as const,
};

export const queryOptions = {
  correlation: (info: Flower.Query.Info) =>
    defaultQueryOptions({
      queryKey: queryKeys.correlation(info),
      queryFn: ({ queryKey: [, , paperID] }) => Correlations({ paperID }),
      staleTime: Infinity,
      retry: false,
    }),
};
