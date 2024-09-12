"use client";

import { useCallback } from "react";

import { Search } from "@/features/search/types";
import Button from "@/ui/button";
import EditIcon from "@/ui/icons/edit";
import { FilterDataID } from "@/features/filter/types/filter";
import { FilterStore } from "@/features/filter/types/store";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import { EditStatus } from "@/features/search/types/edit";
import useTabDirection from "@/ui/settings/hooks/use-tab-direction";
import { TAB_PREVIEW } from "@/features/search/types/tab";

type Props = {
  titleEditable?: boolean;
  dataID: FilterDataID<Search.Type>;
  store: FilterStore;
};

export default function EditFilterOption({
  titleEditable = true,
  dataID,
  store,
}: Props) {
  const { status, begin } = useSearchFilterEditor({
    store,
    dataID,
  });

  const { request } = useTabDirection();

  const onClick = useCallback(() => {
    switch (status) {
      case EditStatus.NOT_EDITING:
        request(TAB_PREVIEW.ID, dataID);
        begin(titleEditable);
        break;
      case EditStatus.EDITING:
        request(TAB_PREVIEW.ID, dataID);
        break;
      default:
        break;
    }
  }, [begin, status, dataID, request, titleEditable]);

  return status !== EditStatus.UNSPECIFIED ? (
    <Button
      ui_size="small"
      ui_color="secondary"
      className="flex items-center justify-between gap-2 text-nowrap text-label-large"
      onClick={onClick}
    >
      <EditIcon />
      {status === EditStatus.NOT_EDITING ? "Edit Filter" : "Continue Editing"}
    </Button>
  ) : null;
}
