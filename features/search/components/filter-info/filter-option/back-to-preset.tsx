"use client";

import { useCallback } from "react";

import { Filter } from "@/features/filter/types";
import { toPreset } from "@/features/filter/utils/converter/preset";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import { Search } from "@/features/search/types";
import ArrowBackIcon from "@/ui/icons/arrow-back";
import IconButton from "@/ui/icon-button";
import { Tooltip } from "@/ui/tooltip";

type Props = {
  dataID: Search.Filter.DataID;
};

export default function BackToPresetOption({ dataID }: Props) {
  const { filter, status } = useSearchFilterEditor({
    store: Filter.Store.PERSIST,
    dataID,
  });

  const dispatch = useSearchFilterDispatcher({ store: Filter.Store.PERSIST });

  const onClick = useCallback(() => {
    if (filter) dispatch(toPreset<Search.Filter.Type>({ data: filter }));
  }, [dispatch, filter]);

  const available = status === Search.Edit.Status.NOT_EDITING;

  return (
    available && (
      <Tooltip title="Back to Preset">
        <IconButton ui_size="large" ui_variant="bordered" onClick={onClick}>
          <ArrowBackIcon ui_size="small" />
        </IconButton>
      </Tooltip>
    )
  );
}
