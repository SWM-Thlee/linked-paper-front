import { z } from "zod";

export const Sorting = z.enum(["similarity", "recency", "citation"]);
export type Sorting = z.infer<typeof Sorting>;

export const Size = z.enum(["20", "30", "40", "50"]);
export type Size = z.infer<typeof Size>;

export const Required = z.object({
  query: z.string().default("Linked Paper"),
  sorting: Sorting.default("similarity"),
  size: Size.default("20"),
  index: z
    .string()
    .default("0")
    .transform((value) => Number(value)),
  similarity_limit: z
    .string()
    .default("true")
    .transform((value) => value === "true"),
});

export type Required = z.infer<typeof Required>;

export const Filter = z.object({
  filter_journal: z.array(z.string()).nullish(),
  filter_category: z.array(z.string()).nullish(),
  filter_start_date: z.string().nullish(),
  filter_end_date: z.string().nullish(),
});

export type Filter = z.infer<typeof Filter>;

export const Info = Required.merge(Filter);
export type Info = z.infer<typeof Info>;

export type Params = {
  readonly [key in keyof Info]-?:
    | (NonNullable<Info[key]> extends unknown[] ? string[] : string)
    | undefined;
};

export const defaultInfo: Info = Info.parse({});
