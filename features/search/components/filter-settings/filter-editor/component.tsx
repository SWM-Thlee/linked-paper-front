"use client";

import { useCallback } from "react";

import useSettings from "@/ui/settings/hooks/use-settings-container";
import useGroupContainerID from "@/ui/settings/hooks/use-group-container-id";
import { VariantProps } from "@/utils/tailwind-variants";
import { Settings } from "@/ui/settings";
import { groupVariant } from "@/ui/settings/group";
import { Search } from "@/features/search/types";
import { Filter } from "@/features/filter/types";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import CloseIcon from "@/ui/icons/close";
import IconButton from "@/ui/icon-button";
import EditorPreview from "./preview";
import { EditorContext } from "./context";
import EditorCategory from "./category";
import EditorJournal from "./journal";
import EditorDate from "./date";

type Props = {
  dataID: Search.Filter.DataID;
  store: Filter.Store.Type;
} & VariantProps<typeof groupVariant>;

// 편집 대상인 검색 필터를 관리합니다.
export default function SearchFilterEditor({ dataID, store }: Props) {
  const groupContainerID = useGroupContainerID("SearchFilter");
  const settings = useSettings();

  const edit = useSearchFilterEditor({
    dataID,
    store,
  });

  const cancelEdit = useCallback(() => {
    edit.remove();
    settings.setTabID(null);
  }, [edit, settings]);

  return (
    <EditorContext.Provider value={edit}>
      <Settings.Group.Root id={groupContainerID}>
        <Settings.Group.Title>
          <div className="flex items-center justify-between gap-2">
            <div className="overflow-hidden text-ellipsis text-nowrap text-label-large">
              {`Edit: ${edit?.editor?.name.toUpperCase() ?? "UNKNOWN"}`}
            </div>
            <IconButton ui_size="medium" onClick={cancelEdit}>
              <CloseIcon ui_size="small" />
            </IconButton>
          </div>
        </Settings.Group.Title>
        <EditorPreview />
        <EditorJournal />
        <EditorCategory />
        <EditorDate />
      </Settings.Group.Root>
    </EditorContext.Provider>
  );
}
