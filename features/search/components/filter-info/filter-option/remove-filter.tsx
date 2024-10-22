"use client";

import { useCallback } from "react";

import { Search } from "@/features/search/types";
import { Filter } from "@/features/filter/types";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import DeleteIcon from "@/ui/icons/delete";
import IconButton from "@/ui/icon-button";
import { Tooltip } from "@/ui/tooltip";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import { Analytics } from "@/features/analytics/types";
import { searchFilterForAnalytics } from "@/features/analytics/utils/filter";

type Props = {
  dataID: Search.Filter.DataID;
  store: Filter.Store.Type;
};

export default function RemoveFilterOption({ dataID, store }: Props) {
  const { log } = useAnalytics();

  // Target Filter Editor
  const { filter, status, remove } = useSearchFilterEditor({
    store,
    dataID,
  });

  /* User Event: Filter를 삭제합니다. */
  const onClick = useCallback(() => {
    if (status !== Search.Edit.Status.NOT_EDITING || !filter) {
      throw new Error("Error from Removing Filter: Cannot remove on editing.");
    }

    log(Analytics.Event.DELETE_FILTER, searchFilterForAnalytics(filter));
    // Remove Filter + Editor
    remove(true);
  }, [status, remove, log, filter]);

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
