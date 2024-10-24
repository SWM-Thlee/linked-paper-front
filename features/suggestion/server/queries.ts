import { queryOptions as defaultQueryOptions } from "@tanstack/react-query";
import Suggestions from "./suggestions";

export const queryKeys = {
  all: ["suggestion"] as const,
};

export const queryOptions = {
  suggestions: (amount: number) =>
    defaultQueryOptions({
      queryKey: queryKeys.all,
      queryFn: () => Suggestions({ amount }),
    }),
};
