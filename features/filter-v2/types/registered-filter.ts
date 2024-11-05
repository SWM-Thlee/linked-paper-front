import { Search } from "@/features/search/types";
import { z } from "zod";

export const RegisteredFilter = z.discriminatedUnion("feature", [
  Search.Filter_V2.Default,
  Search.Filter_V2.Query,
  Search.Filter_V2.Edit,
  Search.Filter_V2.Preset,
]);
export type RegisteredFilter = z.infer<typeof RegisteredFilter>;

export const RegisteredFilters = z.array(RegisteredFilter);
export type RegisteredFilters = z.infer<typeof RegisteredFilters>;

// Types
export type FilterFeature = RegisteredFilter["feature"];
export type FilterScheme<T extends FilterFeature> = Extract<
  RegisteredFilter,
  { feature: T }
>;
