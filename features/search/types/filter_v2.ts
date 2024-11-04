import { z } from "zod";

import Filter_V2 from "@/features/filter_v2/types";

const Feature = z.enum([
  "search-default",
  "search-query",
  "search-edit",
  "search-preset",
]);
export type Feature = z.infer<typeof Feature>;

const SearchScheme = z.object({
  feature: Feature,
  journal: z.array(z.string()),
  category: z.array(z.string()),
  date: z.object({
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
  }),
});

const Scheme = Filter_V2.Base.Scheme.merge(SearchScheme);

const OptionalScheme = SearchScheme.partial();
export type Optional = z.infer<typeof OptionalScheme> & Filter_V2.Base.Optional;

export const QueryScheme = Scheme.extend({
  feature: z.literal("search-query"),
});

export type Query = z.infer<typeof QueryScheme>;

export const EditScheme = Scheme.extend({
  feature: z.literal("search-edit"),
  link: z.string(),
});

export type Edit = z.infer<typeof EditScheme>;

export const DefaultScheme = Scheme.extend({
  feature: z.literal("search-default"),
});

export type Default = z.infer<typeof DefaultScheme>;

export const PresetScheme = Scheme.extend({
  feature: z.literal("search-preset"),
});

export type Preset = z.infer<typeof PresetScheme>;

export type Scheme = Query | Edit | Default | Preset;
