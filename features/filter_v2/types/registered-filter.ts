import { Search } from "@/features/search/types";
import { z } from "zod";

export const RegisteredFilter = z.discriminatedUnion("feature", [
  Search.Filter_V2.DefaultScheme,
  Search.Filter_V2.QueryScheme,
  Search.Filter_V2.EditScheme,
  Search.Filter_V2.PresetScheme,
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
