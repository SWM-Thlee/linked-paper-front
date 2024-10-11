import { produce } from "immer";

import { generateFilterDataID } from "../id";
import { Filter } from "../../types";

export interface DefaultTagQuery {}

// Query Filter의 경우 특정 ID로 고정되므로 분기될 수 없습니다.
export type ConvertingQueryProps<T extends Filter.Build.FeatureID> = {
  data: Filter.Build.Data<T>;
  queryDataID: Filter.Build.Data<T>["dataID"];
  extra?: Filter.Base.Tags[string];
};

export function toQuery<T extends Filter.Build.FeatureID>({
  data,
  queryDataID,
  extra,
}: ConvertingQueryProps<T>) {
  if (data.tags[Filter.Identify.Tag.QUERY]) {
    throw new Error(
      "Error from Converting Query: Target filter is already a query.",
    );
  }

  return produce(data, (draft) => {
    draft.dataID = queryDataID;

    Filter.Identify.TagGroup.ROLE.forEach((tag) => delete draft.tags[tag]);
    draft.tags[Filter.Identify.Tag.QUERY] = {
      ...extra,
    } satisfies DefaultTagQuery;
  });
}

export type RevertingQueryProps<T extends Filter.Build.FeatureID> = {
  data: Filter.Build.Data<T>;
};

// Query Filter를 Revert할 경우 무조건 분기됩니다.
export function revertQuery<T extends Filter.Build.FeatureID>({
  data,
}: RevertingQueryProps<T>) {
  if (!data.tags[Filter.Identify.Tag.QUERY])
    throw new Error(
      "Error from Reverting Query: Target filter is not a query.",
    );

  return produce(data, (draft) => {
    draft.dataID = generateFilterDataID(draft.featureID);
    delete draft.tags[Filter.Identify.Tag.QUERY];
  });
}
