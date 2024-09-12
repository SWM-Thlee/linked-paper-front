import { produce } from "immer";

import { FilterData, FilterFeatureID } from "@/features/filter/types/filter";
import { FilterTag, Tag, TagGroup } from "@/features/filter/types/tag";
import { generateFilterDataID } from "../id";

export interface DefaultTagPreset {
  createdAt: number;
}

export type ConvertingPresetProps<T extends FilterFeatureID> = {
  data: FilterData<T>;
  branch?: boolean;
  extra?: FilterTag[string];
};

export function toPreset<T extends FilterFeatureID>({
  data,
  branch,
  extra,
}: ConvertingPresetProps<T>) {
  if (data.tags[Tag.PRESET]) {
    throw new Error(
      "Error from Converting Preset: Target filter is already a preset.",
    );
  }

  return produce(data, (draft) => {
    TagGroup.ROLE.forEach((tag) => delete draft.tags[tag]);
    draft.tags[Tag.PRESET] = {
      ...extra,
      createdAt: Date.now(),
    } satisfies DefaultTagPreset;

    if (branch) {
      draft.dataID = generateFilterDataID(draft.featureID);
    }
  });
}

export type RevertingPresetProps<T extends FilterFeatureID> = {
  data: FilterData<T>;
  branch?: boolean;
};

export function revertPreset<T extends FilterFeatureID>({
  data,
  branch,
}: RevertingPresetProps<T>) {
  if (!data.tags[Tag.PRESET]) {
    throw new Error(
      "Error from Reverting Preset: Target filter is not a preset.",
    );
  }

  return produce(data, (draft) => {
    if (branch) {
      draft.dataID = generateFilterDataID(draft.featureID);
    }

    delete draft.tags[Tag.PRESET];
  });
}
