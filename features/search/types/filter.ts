import { z } from "zod";

import Filter from "@/features/filter/types";
import { date } from "../utils/filter/date";

// Search Filter Features
export const Feature = z.enum([
  "search-default",
  "search-query",
  "search-preset",
]);
export type Feature = z.infer<typeof Feature>;

// Search Filter Attributes
export const Attributes = z.object({
  journal: z.array(z.string()),
  category: z.array(z.string()),
  date: z.object({
    min: date.optional(),
    max: date.optional(),
  }),
});
export type Attributes = z.infer<typeof Attributes>;
export type KeyAttributes = keyof Attributes;

// Search Filter Extra Scheme
const Scheme = Filter.Base.Scheme.extend({
  feature: Feature,
  attributes: Attributes,
});
export type Scheme = Query | Default | Preset;

// Search Filter Initial Props
const InitialProps = Attributes.partial();
export type InitialProps = z.infer<typeof InitialProps> &
  Filter.Base.InitialProps;

// Search Filter Scheme
export const Query = Scheme.extend({
  feature: z.literal("search-query"),
});

export type Query = z.infer<typeof Query>;

export const Default = Scheme.extend({
  feature: z.literal("search-default"),
});

export type Default = z.infer<typeof Default>;

export const Preset = Scheme.extend({
  feature: z.literal("search-preset"),
});

export type Preset = z.infer<typeof Preset>;
