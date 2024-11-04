import { z } from "zod";

export const Scheme = z.object({
  feature: z.string(),
  id: z.string().uuid(),
  name: z.string(),
  persist: z.boolean(),
  link: z.string().optional(),
});

export const OptionalScheme = Scheme.pick({
  name: true,
  link: true,
}).partial();

export type Type = z.infer<typeof Scheme>;
export type Optional = z.infer<typeof OptionalScheme>;
