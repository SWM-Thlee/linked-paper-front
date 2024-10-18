import { Search } from "@/features/search/types";
import { Analytics } from "../types";

export function searchFilterForAnalytics(
  data: Search.Filter.Data | null,
): Analytics.Scheme.SearchFilterPayload {
  if (!data) return {};

  const {
    attributes: { journal, category, date },
  } = data;

  return {
    filter_journal: Object.values(journal.value ?? {}).map(
      ({ itemValue: { nameOfJournal } }) => nameOfJournal,
    ),
    filter_category: Object.values(category.value ?? {}).map(
      ({ itemValue: { categoryID } }) => categoryID,
    ),
    filter_date_start: date.value?.min,
    filter_date_end: date.value?.max,
  };
}
