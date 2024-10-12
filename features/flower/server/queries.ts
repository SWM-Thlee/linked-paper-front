import { queryOptions as defaultQueryOptions } from "@tanstack/react-query";

import { Flower } from "../types";
import { Correlations } from "./correlations";

export const queryKeys = {
  all: ["flower-correlations"] as const,

  correlation: ({ paperID }: Flower.Query.Info) =>
    [...queryKeys.all, paperID] as const,
};

export const queryOptions = {
  correlation: (info: Flower.Query.Info) =>
    defaultQueryOptions({
      queryKey: queryKeys.correlation(info),
      queryFn: ({ queryKey: [, paperID] }) => Correlations({ paperID }),
      staleTime: Infinity,
      retry: false,
    }),
};
