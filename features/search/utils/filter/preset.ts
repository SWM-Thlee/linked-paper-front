import { produce } from "immer";
import { FilterData } from "@/features/filter/types/filter";
import { Search } from "../../types";

export const TAG_SEARCH_FILTER_PRESET = "SEARCH_FILTER_PRESET";
export interface SearchFilterPreset {
  createdAt: number;
}

/**
 *  특정 Search Filter에 Preset 마크를 새깁니다.
 */
export function markSearchFilterPreset(data: FilterData<Search.Type>) {
  if (data.tags[TAG_SEARCH_FILTER_PRESET])
    throw new Error(
      "Error from MarkSearchFilterPreset: Target filter is already marked.",
    );

  return produce(data, (draft) => {
    draft.tags[TAG_SEARCH_FILTER_PRESET] = {
      createdAt: Date.now(),
    } satisfies SearchFilterPreset;
  });
}

/**
 *  특정 Search Filter의 Preset 마크를 지웁니다.
 */
export function unmarkSearchFilterPreset(data: FilterData<Search.Type>) {
  if (!data.tags[TAG_SEARCH_FILTER_PRESET])
    throw new Error(
      "Error from UnmarkSearchFilterPreset: Target filter is not marked.",
    );

  return produce(data, (draft) => {
    delete draft.tags[TAG_SEARCH_FILTER_PRESET];
  });
}
