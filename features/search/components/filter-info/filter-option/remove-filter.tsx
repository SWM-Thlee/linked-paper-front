"use client";

import { useCallback } from "react";

import DeleteIcon from "@/ui/icons/delete";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import { Search } from "@/features/search/types";
import { EditStatus } from "@/features/search/types/edit";
import { FilterDataID } from "@/features/filter/types/filter";
import { FilterStore } from "@/features/filter/types/store";
import Button from "@/ui/button";

type Props = {
  dataID: FilterDataID<Search.Type>;
  store: FilterStore;
};

export default function RemoveFilterOption({ dataID, store }: Props) {
  // Target Filter Editor
  const { status, remove } = useSearchFilterEditor({
    store,
    dataID,
  });

  const onClick = useCallback(() => {
    if (status !== EditStatus.NOT_EDITING) {
      throw new Error("Error from Removing Filter: Cannot remove on editing.");
    }

    // Remove Filter + Editor
    remove(true);
  }, [status, remove]);

  return status === EditStatus.NOT_EDITING ? (
    <Button
      ui_color="tertiary"
      className="flex items-center justify-between gap-2 text-nowrap"
      onClick={onClick}
    >
      <DeleteIcon /> Remove This Filter
    </Button>
  ) : null;
}
