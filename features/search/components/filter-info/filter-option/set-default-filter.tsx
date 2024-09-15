"use client";

import { useCallback } from "react";

import { FilterDataID } from "@/features/filter/types/filter";
import { FilterStore } from "@/features/filter/types/store";
import { Tag } from "@/features/filter/types/tag";
import { toDefault } from "@/features/filter/utils/converter/default";
import { toPreset } from "@/features/filter/utils/converter/preset";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import useSearchFilters from "@/features/search/hooks/filter/use-search-filters";
import { Search } from "@/features/search/types";
import { EditStatus } from "@/features/search/types/edit";
import Button from "@/ui/button";
import CheckIcon from "@/ui/icons/check";

type Props = {
  dataID: FilterDataID<Search.Type>;
};

export default function SetDefaultFilterOption({ dataID }: Props) {
  // 기존에 Default Filter가 존재하는지 확인합니다.
  const { filter: defaultFilter } = useSearchFilters({
    store: FilterStore.PERSIST,
    track: { tag: [Tag.DEFAULT] },
  });

  // Default Filter가 편집 중인지 확인합니다.
  // TODO: 위의 Hook과 합칠 수 있도록 최적화하기
  const { filter: editingDefaultFilter } = useSearchFilters({
    store: FilterStore.TEMPORARY,
    track: { tag: [Tag.DEFAULT, Tag.EDIT] },
  });

  // Target Filter는 Persistent Store에 존재해야 합니다.
  const { filter, status } = useSearchFilterEditor({
    store: FilterStore.PERSIST,
    dataID,
  });

  // Default Filter는 Persistent Store에 존재해야 합니다.
  const dispatch = useSearchFilterDispatcher({ store: FilterStore.PERSIST });

  const onClick = useCallback(() => {
    // 기존에 Default Filter가 존재하는 경우 Preset으로 바꿉니다.
    if (defaultFilter) {
      dispatch(toPreset<Search.Type>({ data: defaultFilter }));
    }

    // Preset Filter를 Default Filter로 바꿉니다.
    if (filter) {
      dispatch(toDefault<Search.Type>({ data: filter }));
    }
  }, [filter, defaultFilter, dispatch]);

  const available = !!(
    status === EditStatus.NOT_EDITING &&
    !editingDefaultFilter &&
    filter
  );

  return (
    available && (
      <Button
        ui_color="primary"
        className="flex items-center justify-between gap-2 text-nowrap"
        onClick={onClick}
      >
        <CheckIcon />
        Set Default Filter
      </Button>
    )
  );
}
