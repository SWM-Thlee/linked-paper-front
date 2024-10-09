import { produce, Draft } from "immer";

import BlockModification from "@/utils/block-sensitive-attributes";
import { FilterData, FilterDataID, FilterFeatureID } from "../types/filter";
import { generateFilterDataID } from "./id";
import { FilterStore } from "../types/store";

export const TAG_SNAPSHOT = "SNAPSHOT";

export interface TagFilterSnapshot {
  createdAt: number;
  target: FilterDataID<FilterFeatureID>;
  store: FilterStore;
}

/**
 * 특정 Filter의 Snapshot을 생성합니다. 해당 Snapshot에는 (함수 호출 기준) 생성 시점과 대상 Filter의 ID가 포함됩니다.
 *
 * 특정 Filter 대상으로 여러 개의 Snapshot을 생성할 수 있지만, **Snapshot의 Snapshot**은 생성할 수 없으므로 유의해야 합니다.
 */
export function createFilterSnapshot<T extends FilterFeatureID>(
  data: FilterData<T>,
  store: FilterStore,
  initFn?: (draft: Draft<FilterData<T>>) => void,
) {
  if (data.tags[TAG_SNAPSHOT])
    throw new Error(
      "Error from FilterSnapshot: Target filter is already an snapshot",
    );

  return produce(data, (draft) => {
    initFn?.(BlockModification(draft, "featureID", "dataID"));

    if (draft.tags[TAG_SNAPSHOT])
      throw new Error(
        "Error from FilterSnapshot: Cannot add snapshot on init.",
      );

    // Tag에 Snapshot 정보를 추가합니다.
    draft.tags[TAG_SNAPSHOT] = {
      target: draft.dataID,
      createdAt: Date.now(),
      store,
    } satisfies TagFilterSnapshot;

    draft.dataID = generateFilterDataID(draft.featureID);
  });
}

/**
 * Filter Snapshot을 Dispatch하기 위한 Data을 생성합니다.
 *
 * **주의:** 대상 Filter가 삭제된 경우는 이 함수에서 확인할 수 없으므로 별도로 확인해야 합니다.
 */
export function createSnapshotDispatch<T extends FilterFeatureID>(
  data: FilterData<T>,
  initFn?: (draft: Draft<FilterData<T>>) => void,
) {
  if (!data.tags[TAG_SNAPSHOT])
    throw new Error(
      "Error from FilterSnapshotDispatch: This filter is not snapshot.",
    );

  return produce(data, (draft) => {
    initFn?.(BlockModification(draft, "featureID", "dataID"));

    if (!draft.tags[TAG_SNAPSHOT])
      throw new Error(
        "Error from FilterSnapshotDispatch: Cannot remove snapshot info on init.",
      );

    // ID를 기존 Filter의 ID로 되돌립니다.
    draft.dataID = draft.tags[TAG_SNAPSHOT].target as FilterData<T>["dataID"];
    delete draft.tags[TAG_SNAPSHOT];
  });
}
