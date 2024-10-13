"use client";

import { useCallback } from "react";
import { produce } from "immer";

import { Filter } from "@/features/filter/types";
import { toPreset } from "@/features/filter/utils/converter/preset";
import useSearchFilterDispatcher from "@/features/search/hooks/filter/use-search-filter-dispatcher";
import { Search } from "@/features/search/types";
import IconButton from "@/ui/icon-button";
import { Tooltip } from "@/ui/tooltip";
import AddIcon from "@/ui/icons/add";
import useSearchFilters from "@/features/search/hooks/filter/use-search-filters";
import useSearchQueryFilter from "@/features/search/hooks/query/use-search-query-filter";
import { revertQuery } from "@/features/filter/utils/converter/query";
import { toDefault } from "@/features/filter/utils/converter/default";

// Search Query를 기반으로 Default Filter를 생성합니다.
export default function ConvertDefaultFilterOption() {
  /* Default Filter */
  const { filter: defaultFilter } = useSearchFilters({
    store: Filter.Store.PERSIST,
    track: { tag: [Filter.Identify.Tag.DEFAULT] },
  });

  // Preset은 Persistent Store에 저장되어야 합니다.
  const dispatch = useSearchFilterDispatcher({ store: Filter.Store.PERSIST });

  // Search Query Filter는 "/search" Page 내에서만 존재합니다.
  const query = useSearchQueryFilter();

  const onClick = useCallback(() => {
    if (!query)
      throw new Error(
        "Error from Converting Search Query To Default Filter: Target filter is not found",
      );

    // Convert Query to Default Filter
    const filter = toDefault<Search.Filter.Type>({
      data: toPreset<Search.Filter.Type>({
        data: revertQuery<Search.Filter.Type>({ data: query }),
      }),
    });

    dispatch(
      produce(filter, (draft) => {
        // Default Name
        draft.name = "Preset From Search Query";
      }),
    );
  }, [dispatch, query]);

  return (
    !defaultFilter && (
      <Tooltip title="Convert to Default Filter">
        <IconButton
          ui_size="large"
          ui_color="primary"
          ui_variant="bordered"
          onClick={onClick}
        >
          <AddIcon ui_size="small" />
        </IconButton>
      </Tooltip>
    )
  );
}
