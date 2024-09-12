import { produce } from "immer";

import { FilterData, FilterFeatureID } from "../../types/filter";
import { FilterTag, Tag, TagGroup } from "../../types/tag";
import { generateFilterDataID } from "../id";

export interface DefaultTagQuery {}

// Query Filter의 경우 특정 ID로 고정되므로 분기될 수 없다.
export type ConvertingQueryProps<T extends FilterFeatureID> = {
  data: FilterData<T>;
  queryDataID: FilterData<T>["dataID"];
  extra?: FilterTag[string];
};

export function toQuery<T extends FilterFeatureID>({
  data,
  queryDataID,
  extra,
}: ConvertingQueryProps<T>) {
  if (data.tags[Tag.QUERY]) {
    throw new Error(
      "Error from Converting Query: Target filter is already a query.",
    );
  }

  return produce(data, (draft) => {
    draft.dataID = queryDataID;

    TagGroup.ROLE.forEach((tag) => delete draft.tags[tag]);
    draft.tags[Tag.QUERY] = {
      ...extra,
    } satisfies DefaultTagQuery;
  });
}

export type RevertingQueryProps<T extends FilterFeatureID> = {
  data: FilterData<T>;
};

// Query Filter를 Revert할 경우 무조건 분기됩니다.
export function revertQuery<T extends FilterFeatureID>({
  data,
}: RevertingQueryProps<T>) {
  if (!data.tags[Tag.QUERY])
    throw new Error(
      "Error from Reverting Query: Target filter is not a query.",
    );

  return produce(data, (draft) => {
    draft.dataID = generateFilterDataID(draft.featureID);
    delete draft.tags[Tag.QUERY];
  });
}
