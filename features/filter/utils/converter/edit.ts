import { produce } from "immer";

import { FilterData, FilterDataID, FilterFeatureID } from "../../types/filter";
import { FilterStore } from "../../types/store";
import { FilterTag, Tag, TagGroup } from "../../types/tag";
import { generateFilterDataID } from "../id";

export interface DefaultTagEdit {
  createdAt: number;
  target: FilterDataID<FilterFeatureID>;
  store: FilterStore;
}

export type ConvertingEditProps<T extends FilterFeatureID> = {
  data: FilterData<T>;
  store: FilterStore;
  branch?: boolean;
  extra?: FilterTag[string];
};

export function toEdit<T extends FilterFeatureID>({
  data,
  store,
  branch = true,
  extra,
}: ConvertingEditProps<T>) {
  if (data.tags[Tag.EDIT]) {
    throw new Error(
      "Error from Converting Edit: Target filter is already an edit.",
    );
  }

  return produce(data, (draft) => {
    TagGroup.STATUS.forEach((tag) => delete draft.tags[tag]);
    draft.tags[Tag.EDIT] = {
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

export type RevertingEditProps<T extends FilterFeatureID> = {
  data: FilterData<T>;
  branch?: boolean;
};

export function revertEdit<T extends FilterFeatureID>({
  data,
  branch,
}: RevertingEditProps<T>) {
  if (!data.tags[Tag.EDIT])
    throw new Error("Error from Reverting Edit: This filter is not an edit.");

  return produce(data, (draft) => {
    if (branch) {
      draft.dataID = generateFilterDataID(draft.featureID);
    } else {
      draft.dataID = draft.tags[Tag.EDIT].target as FilterData<T>["dataID"];
    }

    delete draft.tags[Tag.EDIT];
  });
}
