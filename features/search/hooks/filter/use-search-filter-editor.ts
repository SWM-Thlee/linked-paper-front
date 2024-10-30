import { useCallback, useMemo } from "react";
import { Draft, produce } from "immer";
import isEqual from "react-fast-compare";

import { Filter } from "@/features/filter/types";
import { Search } from "@/features/search/types";
import { revertEdit } from "@/features/filter/utils/converter/edit";
import useSearchFilterDispatcher from "./use-search-filter-dispatcher";
import useSearchFilters from "./use-search-filters";
import { toSearchEdit } from "../../utils/filter/edit";

type Props = {
  dataID: Search.Filter.DataID;
  store: Filter.Store.Type;
};

export type SearchFilterEditorHook = ReturnType<typeof useSearchFilterEditor>;

/**
 * Search Filter를 편집하기 위해 사용됩니다.
 */
export default function useSearchFilterEditor({ dataID, store }: Props) {
  const temp = useSearchFilterDispatcher({
    store: Filter.Store.TEMPORARY,
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
    track: { tag: [[Filter.Identify.Tag.EDIT, { target: dataID }]] },
    store: Filter.Store.TEMPORARY,
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

      temp(toSearchEdit({ data: filter, store, titleEditable }));
    },
    [filter, temp, editor, store],
  );

  /** 편집 내용을 초기화합니다. 일부만 초기화할 수도 있습니다. */
  const reset = useCallback(
    (include?: { name?: boolean; attributes?: Search.Filter.Attribute[] }) => {
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
    (patchFn: (draft: Draft<Search.Filter.Data>) => void) => {
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

      dispatch(revertEdit<Search.Filter.Type>({ data: editor }));
      if (afterRemove) removeEditor();
    },
    [dispatch, editor, removeEditor],
  );

  const isTitleEditable = useMemo(
    () => !!editor?.tags[Filter.Identify.Tag.EDIT]?.titleEditable,
    [editor],
  );

  /** 수정 사항의 존재 여부를 확인합니다. */
  const isModified = useMemo(
    () =>
      !isEqual(editor?.name, filter?.name) ||
      !isEqual(editor?.attributes, filter?.attributes),
    [editor?.attributes, editor?.name, filter?.attributes, filter?.name],
  );

  /** 편집 상태를 확인합니다. */
  const status = useMemo<Search.Edit.Status>(() => {
    if (!filter) return Search.Edit.Status.UNSPECIFIED;
    if (!editor) return Search.Edit.Status.NOT_EDITING;

    return Search.Edit.Status.EDITING;
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
