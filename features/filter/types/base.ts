import { z } from "zod";

export const Scheme = z.object({
  feature: z.string(),
  id: z.string().uuid(),
  name: z.string(),
  persist: z.boolean(),
  link: z.string().optional(),
  attributes: z.record(z.string(), z.any()),
});

export const InitialProps = Scheme.pick({
  name: true,
  link: true,
}).partial();

export type Type = z.infer<typeof Scheme>;
export type InitialProps = z.infer<typeof InitialProps>;
