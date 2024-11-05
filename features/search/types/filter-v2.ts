import { z } from "zod";

import Filter_V2 from "@/features/filter-v2/types";

// Search Filter Features
export const Feature = z.enum([
  "search-default",
  "search-query",
  "search-edit",
  "search-preset",
]);
export type Feature = z.infer<typeof Feature>;

// Search Filter Attributes
export const Attributes = z.object({
  journal: z.array(z.string()),
  category: z.array(z.string()),
  date: z.object({
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
  }),
});
export type Attributes = z.infer<typeof Attributes>;
export type KeyAttributes = keyof Attributes;

// Search Filter Extra Scheme
const Scheme = Filter_V2.Base.Scheme.extend({
  feature: Feature,
  attributes: Attributes,
});
export type Scheme = Query | Edit | Default | Preset;

// Search Filter Initial Props
const InitialProps = Attributes.partial();
export type InitialProps = z.infer<typeof InitialProps> &
  Filter_V2.Base.InitialProps;

// Search Filter Scheme
export const Query = Scheme.extend({
  feature: z.literal("search-query"),
});

export type Query = z.infer<typeof Query>;

export const Edit = Scheme.extend({
  feature: z.literal("search-edit"),
  link: z.string(),
});

export type Edit = z.infer<typeof Edit>;

export const Default = Scheme.extend({
  feature: z.literal("search-default"),
});

export type Default = z.infer<typeof Default>;

export const Preset = Scheme.extend({
  feature: z.literal("search-preset"),
});

export type Preset = z.infer<typeof Preset>;
