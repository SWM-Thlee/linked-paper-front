"use client";

import { useCallback } from "react";

import { Filter } from "@/features/filter/types";
import { toPreset } from "@/features/filter/utils/converter/preset";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import { Search } from "@/features/search/types";
import Button from "@/ui/button";
import ArrowBackIcon from "@/ui/icons/arrow-back";

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

  return (
    status === Search.Edit.Status.NOT_EDITING && (
      <Button
        ui_color="secondary"
        className="flex items-center justify-between gap-2 text-nowrap"
        onClick={onClick}
      >
        <ArrowBackIcon />
        Back To Preset
      </Button>
    )
  );
}
