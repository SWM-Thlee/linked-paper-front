import { produce } from "immer";

import { FilterData, FilterDataID, FilterFeatureID } from "../../types/filter";
import { generateFilterDataID } from "../id";
import { FilterStore } from "../../types/store";
import { FilterTag, Tag, TagGroup } from "../../types/tag";

export interface DefaultTagSnapshot {
  createdAt: number;
  target: FilterDataID<FilterFeatureID>;
  store: FilterStore;
}

export type ConvertingSnapshotProps<T extends FilterFeatureID> = {
  data: FilterData<T>;
  store: FilterStore;
  branch?: boolean;
  extra?: FilterTag[string];
};

export function toSnapshot<T extends FilterFeatureID>({
  data,
  store,
  branch = true,
  extra,
}: ConvertingSnapshotProps<T>) {
  if (data.tags[Tag.SNAPSHOT]) {
    throw new Error(
      "Error from Converting Snapshot: Target filter is already a snapshot.",
    );
  }

  return produce(data, (draft) => {
    TagGroup.STATUS.forEach((tag) => delete draft.tags[tag]);
    draft.tags[Tag.SNAPSHOT] = {
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
