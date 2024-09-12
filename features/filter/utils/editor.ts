import { Draft, produce } from "immer";
import BlockModification from "@/utils/block-sensitive-attributes";

import { FilterData, FilterFeatureID } from "../types/filter";
import { createFilterSnapshot, createSnapshotDispatch } from "./snapshot";
import { FilterStore } from "../types/store";

export const TAG_EDITOR = "EDITOR";
export interface TagEditor {
  titleEditable: boolean;
}

export function createFilterEditor<T extends FilterFeatureID>(
  data: FilterData<T>,
  store: FilterStore,
  titleEditable: boolean = true,
  initFn?: (draft: Draft<FilterData<T>>) => void,
) {
  if (data.tags[TAG_EDITOR])
    throw new Error(
      "Error from FilterEditor: Target filter for creating editor is already an editor.",
    );

  return createFilterSnapshot(data, store, (draft) => {
    initFn?.(BlockModification(draft, "featureID", "dataID"));

    if (draft.tags[TAG_EDITOR])
      throw new Error(
        "Error from FilterEditor: Cannot add editor settings on init.",
      );

    draft.tags[TAG_EDITOR] = {
      titleEditable,
    } satisfies TagEditor;
  });
}

export function createEditorDispatch<T extends FilterFeatureID>(
  data: FilterData<T>,
  initFn?: (draft: Draft<FilterData<T>>) => void,
) {
  if (!data.tags[TAG_EDITOR])
    throw new Error(
      "Error from EditorDispatch: This filter is not the editor.",
    );

  return produce(createSnapshotDispatch(data), (draft) => {
    initFn?.(BlockModification(draft, "featureID", "dataID"));

    if (!draft.tags[TAG_EDITOR])
      throw new Error(
        "Error from EditorDispatch: Cannot remove editor settings on init.",
      );

    delete draft.tags[TAG_EDITOR];
  });
}
