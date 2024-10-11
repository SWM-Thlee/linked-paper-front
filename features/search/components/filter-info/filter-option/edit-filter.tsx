"use client";

import { useCallback } from "react";

import { Search } from "@/features/search/types";
import { Filter } from "@/features/filter/types";
import Button from "@/ui/button";
import EditIcon from "@/ui/icons/edit";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import useTabDirection from "@/ui/settings/hooks/use-tab-direction";

type Props = {
  titleEditable?: boolean;
  dataID: Search.Filter.DataID;
  store: Filter.Store.Type;
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
      case Search.Edit.Status.NOT_EDITING:
        request(Search.Settings.PREVIEW.ID, dataID);
        begin(titleEditable);
        break;
      case Search.Edit.Status.EDITING:
        request(Search.Settings.PREVIEW.ID, dataID);
        break;
      default:
        break;
    }
  }, [begin, status, dataID, request, titleEditable]);

  return status !== Search.Edit.Status.UNSPECIFIED ? (
    <Button
      ui_color="secondary"
      className="flex items-center justify-between gap-2 text-nowrap"
      onClick={onClick}
    >
      <EditIcon />
      {status === Search.Edit.Status.NOT_EDITING
        ? "Edit Filter"
        : "Continue Editing"}
    </Button>
  ) : null;
}
