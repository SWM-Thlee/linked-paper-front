import { format, toDate } from "date-fns";

export function convertDateToString(date?: Date) {
  if (!date) return undefined;

  try {
    return format(date, "yyyy-MM-dd");
  } catch (e) {
    // Invalid Date
    return undefined;
  }
}

export function convertStringToDate(date?: string) {
  try {
    return !date ? undefined : toDate(date);
  } catch (e) {
    // Invalid Date
    return undefined;
  }
}
