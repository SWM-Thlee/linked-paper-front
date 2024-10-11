import { produce } from "immer";

import { generateFilterDataID } from "../id";
import { Filter } from "../../types";

export interface DefaultTagPreset {
  createdAt: number;
}

export type ConvertingPresetProps<T extends Filter.Build.FeatureID> = {
  data: Filter.Build.Data<T>;
  branch?: boolean;
  extra?: Filter.Base.Tags[string];
};

export function toPreset<T extends Filter.Build.FeatureID>({
  data,
  branch,
  extra,
}: ConvertingPresetProps<T>) {
  if (data.tags[Filter.Identify.Tag.PRESET]) {
    throw new Error(
      "Error from Converting Preset: Target filter is already a preset.",
    );
  }

  return produce(data, (draft) => {
    Filter.Identify.TagGroup.ROLE.forEach((tag) => delete draft.tags[tag]);
    draft.tags[Filter.Identify.Tag.PRESET] = {
      ...extra,
      createdAt: Date.now(),
    } satisfies DefaultTagPreset;

    if (branch) {
      draft.dataID = generateFilterDataID(draft.featureID);
    }
  });
}

export type RevertingPresetProps<T extends Filter.Build.FeatureID> = {
  data: Filter.Build.Data<T>;
  branch?: boolean;
};

export function revertPreset<T extends Filter.Build.FeatureID>({
  data,
  branch,
}: RevertingPresetProps<T>) {
  if (!data.tags[Filter.Identify.Tag.PRESET]) {
    throw new Error(
      "Error from Reverting Preset: Target filter is not a preset.",
    );
  }

  return produce(data, (draft) => {
    if (branch) {
      draft.dataID = generateFilterDataID(draft.featureID);
    }

    delete draft.tags[Filter.Identify.Tag.PRESET];
  });
}
