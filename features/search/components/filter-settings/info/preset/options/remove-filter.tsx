"use client";

import { useCallback } from "react";

import { Search } from "@/features/search/types";
import { FilterDataID } from "@/features/filter/types/filter";
import DeleteIcon from "@/ui/icons/delete";
import { FilterStore } from "@/features/filter/types/store";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import IconButton from "@/ui/icon-button";
import { EditStatus } from "@/features/search/types/edit";

type Props = {
  dataID: FilterDataID<Search.Type>;
  store: FilterStore;
};

export default function RemoveFilterOption({ dataID, store }: Props) {
  const { status, remove } = useSearchFilterEditor({
    store,
    dataID,
  });

  const onClick = useCallback(() => {
    if (status !== EditStatus.NOT_EDITING) {
      throw new Error(
        "Error from RemoveFilterOption: Cannot remove on editing.",
      );
    }

    remove(true);
  }, [status, remove]);

  return status === EditStatus.NOT_EDITING ? (
    <IconButton ui_color="tertiary" ui_variant="bordered" onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  ) : null;
}
