"use client";

import useGroupContainerID from "@/ui/settings/hooks/use-group-container-id";
import { VariantProps } from "@/utils/tailwind-variants";
import { Settings } from "@/ui/settings";
import { groupVariant } from "@/ui/settings/group";
import { Search } from "@/features/search/types";
import { FilterDataID } from "@/features/filter/types/filter";
import { FilterStore } from "@/features/filter/types/store";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import EditorPreview from "./preview";
import { EditorContext } from "./context";
import EditorCategory from "./category";
import EditorJournal from "./journal";
import EditorDate from "./date";

type Props = {
  dataID: FilterDataID<Search.Type>;
  store: FilterStore;
} & VariantProps<typeof groupVariant>;

// 편집 대상인 검색 필터를 관리합니다.
export default function SearchFilterEditor({ dataID, store }: Props) {
  const groupContainerID = useGroupContainerID("SearchFilter");

  const edit = useSearchFilterEditor({
    dataID,
    store,
  });

  return (
    <EditorContext.Provider value={edit}>
      <Settings.Group.Root id={groupContainerID}>
        <Settings.Group.Title>
          <div className="overflow-hidden text-ellipsis text-nowrap text-label-large">
            {edit?.editor?.name.toUpperCase() ?? "UNKNOWN"}
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
