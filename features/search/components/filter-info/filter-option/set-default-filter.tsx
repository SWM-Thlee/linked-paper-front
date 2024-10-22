"use client";

import { useCallback } from "react";

import { Filter } from "@/features/filter/types";
import { Search } from "@/features/search/types";
import { toDefault } from "@/features/filter/utils/converter/default";
import { toPreset } from "@/features/filter/utils/converter/preset";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import useSearchFilterEditor from "@/features/search/hooks/filter/use-search-filter-editor";
import useSearchFilters from "@/features/search/hooks/filter/use-search-filters";
import CheckIcon from "@/ui/icons/check";
import IconButton from "@/ui/icon-button";
import { Tooltip } from "@/ui/tooltip";
import useAnalytics from "@/features/analytics/hooks/use-analytics";
import { searchFilterForAnalytics } from "@/features/analytics/utils/filter";
import { Analytics } from "@/features/analytics/types";

type Props = {
  dataID: Search.Filter.DataID;
};

export default function SetDefaultFilterOption({ dataID }: Props) {
  const { log } = useAnalytics();

  // 기존에 Default Filter가 존재하는지 확인합니다.
  const { filter: defaultFilter } = useSearchFilters({
    store: Filter.Store.PERSIST,
    track: { tag: [Filter.Identify.Tag.DEFAULT] },
  });

  // Default Filter가 편집 중인지 확인합니다.
  // TODO: 위의 Hook과 합칠 수 있도록 최적화하기
  const { filter: editingDefaultFilter } = useSearchFilters({
    store: Filter.Store.TEMPORARY,
    track: { tag: [Filter.Identify.Tag.DEFAULT, Filter.Identify.Tag.EDIT] },
  });

  // Target Filter는 Persistent Store에 존재해야 합니다.
  const { filter, status } = useSearchFilterEditor({
    store: Filter.Store.PERSIST,
    dataID,
  });

  // Default Filter는 Persistent Store에 존재해야 합니다.
  const dispatch = useSearchFilterDispatcher({ store: Filter.Store.PERSIST });

  /* User Event: Preset Filter를 Default Filter로 설정합니다. */
  const onClick = useCallback(() => {
    // 기존에 Default Filter가 존재하는 경우 Preset으로 바꿉니다.
    if (defaultFilter) {
      dispatch(toPreset<Search.Filter.Type>({ data: defaultFilter }));
    }

    // Preset Filter를 Default Filter로 바꿉니다.
    if (filter) {
      const newDefaultFilter = toDefault<Search.Filter.Type>({ data: filter });
      dispatch(newDefaultFilter);

      log(
        Analytics.Event.FILTER_APPLY,
        searchFilterForAnalytics(newDefaultFilter),
      );
    }
  }, [filter, defaultFilter, dispatch, log]);

  const available = !!(
    status === Search.Edit.Status.NOT_EDITING &&
    !editingDefaultFilter &&
    filter
  );

  return (
    available && (
      <Tooltip title="Set Default Filter">
        <IconButton
          ui_size="large"
          ui_variant="bordered"
          ui_color="primary"
          onClick={onClick}
        >
          <CheckIcon ui_size="small" />
        </IconButton>
      </Tooltip>
    )
  );
}
