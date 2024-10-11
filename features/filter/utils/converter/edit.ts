import { produce } from "immer";

import { generateFilterDataID } from "../id";
import { Filter } from "../../types";

export interface DefaultTagEdit {
  createdAt: number;
  target: Filter.Build.DataID<Filter.Build.FeatureID>;
  store: Filter.Store.Type;
}

export type ConvertingEditProps<T extends Filter.Build.FeatureID> = {
  data: Filter.Build.Data<T>;
  store: Filter.Store.Type;
  branch?: boolean;
  extra?: Filter.Base.Tags[string];
};

export function toEdit<T extends Filter.Build.FeatureID>({
  data,
  store,
  branch = true,
  extra,
}: ConvertingEditProps<T>) {
  if (data.tags[Filter.Identify.Tag.EDIT]) {
    throw new Error(
      "Error from Converting Edit: Target filter is already an edit.",
    );
  }

  return produce(data, (draft) => {
    Filter.Identify.TagGroup.STATUS.forEach((tag) => delete draft.tags[tag]);
    draft.tags[Filter.Identify.Tag.EDIT] = {
      createdAt: Date.now(),
      target: draft.dataID,
      store,
      ...extra,
    } satisfies DefaultTagEdit;

    if (branch) {
      draft.dataID = generateFilterDataID(draft.featureID);
    }
  });
}

export type RevertingEditProps<T extends Filter.Build.FeatureID> = {
  data: Filter.Build.Data<T>;
  branch?: boolean;
};

export function revertEdit<T extends Filter.Build.FeatureID>({
  data,
  branch,
}: RevertingEditProps<T>) {
  if (!data.tags[Filter.Identify.Tag.EDIT])
    throw new Error("Error from Reverting Edit: This filter is not an edit.");

  return produce(data, (draft) => {
    if (branch) {
      draft.dataID = generateFilterDataID(draft.featureID);
    } else {
      draft.dataID = draft.tags[Filter.Identify.Tag.EDIT]
        .target as Filter.Build.DataID<T>;
    }

    delete draft.tags[Filter.Identify.Tag.EDIT];
  });
}
