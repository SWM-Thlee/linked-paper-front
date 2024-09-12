import { produce } from "immer";
import { FilterData, FilterFeatureID } from "@/features/filter/types/filter";
import { FilterTag, Tag, TagGroup } from "@/features/filter/types/tag";
import { generateFilterDataID } from "../id";

export interface DefaultTagDefault {
  createdAt: number;
}

export type ConvertingDefaultProps<T extends FilterFeatureID> = {
  data: FilterData<T>;
  branch?: boolean;
  createdAt?: number;
  extra?: FilterTag[string];
};

export function toDefault<T extends FilterFeatureID>({
  data,
  branch,
  createdAt = Date.now(),
  extra,
}: ConvertingDefaultProps<T>) {
  if (data.tags[Tag.DEFAULT]) {
    throw new Error(
      "Error from Converting Default: Target filter is already a default.",
    );
  }

  return produce(data, (draft) => {
    TagGroup.ROLE.forEach((tag) => delete draft.tags[tag]);
    draft.tags[Tag.DEFAULT] = {
      ...extra,
      createdAt,
    } satisfies DefaultTagDefault;

    if (branch) {
      draft.dataID = generateFilterDataID(draft.featureID);
    }
  });
}

export type RevertingDefaultProps<T extends FilterFeatureID> = {
  data: FilterData<T>;
  branch?: boolean;
};

export function revertDefault<T extends FilterFeatureID>({
  data,
  branch,
}: RevertingDefaultProps<T>) {
  if (!data.tags[Tag.DEFAULT]) {
    throw new Error(
      "Error from Reverting Default: Target filter is not a default.",
    );
  }

  return produce(data, (draft) => {
    if (branch) {
      draft.dataID = generateFilterDataID(draft.featureID);
    }

    delete draft.tags[Tag.DEFAULT];
  });
}
