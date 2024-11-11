import { Search } from "@/features/search/types";
import { Analytics } from "../types";

export function searchFilterForAnalytics(
  data: Search.Filter.Scheme,
): Analytics.Scheme.SearchFilter {
  if (!data) return {};

  const {
    attributes: { journal, category, date },
  } = data;

  return {
    filter_journal: journal,
    filter_category: category,
    filter_date_start: date.min,
    filter_date_end: date.max,
  };
}
