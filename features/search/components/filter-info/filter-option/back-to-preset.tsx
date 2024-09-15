"use client";

import { useCallback } from "react";
import { FilterDataID } from "@/features/filter/types/filter";
import { FilterStore } from "@/features/filter/types/store";
import { toPreset } from "@/features/filter/utils/converter/preset";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import { Search } from "@/features/search/types";
import { EditStatus } from "@/features/search/types/edit";
import Button from "@/ui/button";
import ArrowBackIcon from "@/ui/icons/arrow-back";

type Props = {
  dataID: FilterDataID<Search.Type>;
};

export default function BackToPresetOption({ dataID }: Props) {
  const { filter, status } = useSearchFilterEditor({
    store: FilterStore.PERSIST,
    dataID,
  });

  const dispatch = useSearchFilterDispatcher({ store: FilterStore.PERSIST });

  const onClick = useCallback(() => {
    if (filter) dispatch(toPreset<Search.Type>({ data: filter }));
  }, [dispatch, filter]);

  return (
    status === EditStatus.NOT_EDITING && (
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
