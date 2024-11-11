import { z } from "zod";

export const date = z.custom<string>((val) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(val);
});
