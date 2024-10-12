"use client";

import { useCallback } from "react";

import { Search } from "@/features/search/types";
import { Filter } from "@/features/filter/types";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import DeleteIcon from "@/ui/icons/delete";
import Button from "@/ui/button";

type Props = {
  dataID: Search.Filter.DataID;
  store: Filter.Store.Type;
};

export default function RemoveFilterOption({ dataID, store }: Props) {
  // Target Filter Editor
  const { status, remove } = useSearchFilterEditor({
    store,
    dataID,
  });

  const onClick = useCallback(() => {
    if (status !== Search.Edit.Status.NOT_EDITING) {
      throw new Error("Error from Removing Filter: Cannot remove on editing.");
    }

    // Remove Filter + Editor
    remove(true);
  }, [status, remove]);

  return status === Search.Edit.Status.NOT_EDITING ? (
    <Button
      ui_color="tertiary"
      className="flex items-center justify-between gap-2 text-nowrap"
      onClick={onClick}
    >
      <DeleteIcon /> Remove This Filter
    </Button>
  ) : null;
}
