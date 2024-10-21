"use client";

import { useCallback } from "react";

import { Search } from "@/features/search/types";
import { Filter } from "@/features/filter/types";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import DeleteIcon from "@/ui/icons/delete";
import IconButton from "@/ui/icon-button";
import { Tooltip } from "@/ui/tooltip";

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

  const available = status === Search.Edit.Status.NOT_EDITING;

  return (
    available && (
      <Tooltip title="Remove Filter">
        <IconButton
          ui_size="large"
          ui_variant="bordered"
          ui_color="tertiary"
          onClick={onClick}
        >
          <DeleteIcon ui_size="small" />
        </IconButton>
      </Tooltip>
    )
  );
}
