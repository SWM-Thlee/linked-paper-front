import { useCallback, useMemo } from "react";
import { Draft, produce } from "immer";
import equal from "fast-deep-equal";

import { TAG_SNAPSHOT } from "@/features/filter/utils/snapshot";
import {
  createEditorDispatch,
  createFilterEditor,
  TAG_EDITOR,
} from "@/features/filter/utils/editor";
import { FilterStore } from "@/features/filter/types/store";
import { Search } from "../../types";
import {
  FilterAttributeKey,
  FilterData,
  FilterDataID,
} from "../../../filter/types/filter";
import useSearchFilterDispatcher from "./use-search-filter-dispatcher";
import useSearchFilters from "./use-search-filters";
import { EditStatus } from "../../types/edit";

type Props = {
  dataID: FilterDataID<Search.Type>;
  store?: FilterStore;
};

export type SearchFilterEditorHook = ReturnType<typeof useSearchFilterEditor>;

/**
 * Search Filter를 편집하기 위해 사용됩니다.
 */
export default function useSearchFilterEditor({
  dataID,
  store = FilterStore.PERSIST,
}: Props) {
  const temp = useSearchFilterDispatcher({
    store: FilterStore.TEMPORARY,
  });

  const dispatch = useSearchFilterDispatcher({
    store,
  });

  // 원본 Filter를 나타냅니다.
  const { filter, reset: removeOriginal } = useSearchFilters({
    track: { dataID: [dataID] },
    store,
  });

  // 편집 중인 Filter를 나타냅니다.
  const { filter: editor, reset: removeEditor } = useSearchFilters({
    track: { tag: [TAG_EDITOR, [TAG_SNAPSHOT, { target: dataID }]] },
    store: FilterStore.TEMPORARY,
  });

  /** 편집을 시작합니다. */
  const begin = useCallback(
    (titleEditable: boolean = true) => {
      if (editor) {
        throw new Error(
          "Error from SearchFilterEditor: Filter is already on editing.",
        );
      }

      if (!filter) {
        throw new Error(
          "Error from SearchFilterEditor: Target filter is not found.",
        );
      }

      temp(createFilterEditor<Search.Type>(filter, store, titleEditable));
    },
    [filter, temp, editor, store],
  );

  /** 편집 내용을 초기화합니다. 일부만 초기화할 수도 있습니다. */
  const reset = useCallback(
    (include?: {
      name?: boolean;
      attributes?: FilterAttributeKey<Search.Type>[];
    }) => {
      if (!editor) {
        throw new Error(
          "Error from ResetSearchFilterEditor: Filter is not on editing.",
        );
      }

      if (!filter) {
        throw new Error(
          "Error from ResetSearchFilterEditor: Target filter is not found.",
        );
      }

      temp(
        produce(editor, (draft) => {
          if (!include || include.name) draft.name = filter.name;

          if (!include || include.attributes?.includes("journal"))
            draft.attributes.journal = produce(
              filter.attributes.journal,
              () => {},
            );

          if (!include || include.attributes?.includes("category"))
            draft.attributes.category = produce(
              filter.attributes.category,
              () => {},
            );

          if (!include || include.attributes?.includes("date"))
            draft.attributes.date = produce(filter.attributes.date, () => {});
        }),
      );
    },
    [temp, filter, editor],
  );

  /** Editor에 변경 사항을 적용합니다. */
  const patch = useCallback(
    (patchFn: (draft: Draft<FilterData<Search.Type>>) => void) => {
      if (!editor) {
        throw new Error(
          "Error from PatchSearchFilterEditor: Target filter is not found.",
        );
      }

      temp(produce(editor, patchFn));
    },
    [editor, temp],
  );

  /** 저장하지 않고 편집을 종료합니다. */
  const remove = useCallback(
    (withOriginal?: boolean) => {
      removeEditor();
      if (withOriginal) removeOriginal();
    },
    [removeEditor, removeOriginal],
  );

  /** 편집 내용을 적용합니다. */
  const apply = useCallback(
    (afterRemove: boolean) => {
      if (!editor) {
        throw new Error(
          "Error from ApplySearchFilterEditor: Target filter is not on editing.",
        );
      }

      dispatch(createEditorDispatch<Search.Type>(editor));
      if (afterRemove) removeEditor();
    },
    [dispatch, editor, removeEditor],
  );

  const isTitleEditable = useMemo(
    () => !!editor?.tags[TAG_EDITOR]?.titleEditable,
    [editor],
  );

  /** 수정 사항의 존재 여부를 확인합니다. */
  const isModified = useMemo(
    () =>
      !equal(editor?.name, filter?.name) ||
      !equal(editor?.attributes, filter?.attributes),
    [editor?.attributes, editor?.name, filter?.attributes, filter?.name],
  );

  /** 편집 상태를 확인합니다. */
  const status = useMemo<EditStatus>(() => {
    if (!filter) return EditStatus.UNSPECIFIED;
    if (!editor) return EditStatus.NOT_EDITING;

    return EditStatus.EDITING;
  }, [filter, editor]);

  return {
    store,
    dataID,
    editor,
    filter,
    isModified,
    isTitleEditable,
    status,
    begin,
    reset,
    remove,
    apply,
    patch,
  };
}
