import { produce } from "immer";

import { generateFilterDataID } from "../id";
import { Filter } from "../../types";

export interface DefaultTagDefault {
  createdAt: number;
}

export type ConvertingDefaultProps<T extends Filter.Build.FeatureID> = {
  data: Filter.Build.Data<T>;
  branch?: boolean;
  createdAt?: number;
  extra?: Filter.Base.Tags[string];
};

export function toDefault<T extends Filter.Build.FeatureID>({
  data,
  branch,
  createdAt = Date.now(),
  extra,
}: ConvertingDefaultProps<T>) {
  if (data.tags[Filter.Identify.Tag.DEFAULT]) {
    throw new Error(
      "Error from Converting Default: Target filter is already a default.",
    );
  }

  return produce(data, (draft) => {
    Filter.Identify.TagGroup.ROLE.forEach((tag) => delete draft.tags[tag]);
    draft.tags[Filter.Identify.Tag.DEFAULT] = {
      ...extra,
      createdAt,
    } satisfies DefaultTagDefault;

    if (branch) {
      draft.dataID = generateFilterDataID(draft.featureID);
    }
  });
}

export type RevertingDefaultProps<T extends Filter.Build.FeatureID> = {
  data: Filter.Build.Data<T>;
  branch?: boolean;
};

export function revertDefault<T extends Filter.Build.FeatureID>({
  data,
  branch,
}: RevertingDefaultProps<T>) {
  if (!data.tags[Filter.Identify.Tag.DEFAULT]) {
    throw new Error(
      "Error from Reverting Default: Target filter is not a default.",
    );
  }

  return produce(data, (draft) => {
    if (branch) {
      draft.dataID = generateFilterDataID(draft.featureID);
    }

    delete draft.tags[Filter.Identify.Tag.DEFAULT];
  });
}
