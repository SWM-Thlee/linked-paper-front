import { produce } from "immer";

import { generateFilterDataID } from "../id";
import { Filter } from "../../types";

export interface DefaultTagSnapshot {
  createdAt: number;
  target: Filter.Build.DataID<Filter.Build.FeatureID>;
  store: Filter.Store.Type;
}

export type ConvertingSnapshotProps<T extends Filter.Build.FeatureID> = {
  data: Filter.Build.Data<T>;
  store: Filter.Store.Type;
  branch?: boolean;
  extra?: Filter.Base.Tags[string];
};

export function toSnapshot<T extends Filter.Build.FeatureID>({
  data,
  store,
  branch = true,
  extra,
}: ConvertingSnapshotProps<T>) {
  if (data.tags[Filter.Identify.Tag.SNAPSHOT]) {
    throw new Error(
      "Error from Converting Snapshot: Target filter is already a snapshot.",
    );
  }

  return produce(data, (draft) => {
    Filter.Identify.TagGroup.STATUS.forEach((tag) => delete draft.tags[tag]);
    draft.tags[Filter.Identify.Tag.SNAPSHOT] = {
      createdAt: Date.now(),
      target: draft.dataID,
      store,
      ...extra,
    } satisfies DefaultTagSnapshot;

    if (branch) {
      draft.dataID = generateFilterDataID(draft.featureID);
    }
  });
}
