import { useCallback } from "react";

import useSearchFilters from "@/features/search/hooks/filter/use-search-filters";
import Button from "@/ui/button";
import DeleteIcon from "@/ui/icons/delete";
import { Filter } from "../types";

export default function RemoveAll() {
  const { reset: resetPersist } = useSearchFilters({
    store: Filter.Store.PERSIST,
    track: { tag: [Filter.Identify.Tag.PRESET] },
  });

  const { reset: resetTemp } = useSearchFilters({
    store: Filter.Store.TEMPORARY,
    track: { tag: [Filter.Identify.Tag.PRESET] },
  });

  const removeAll = useCallback(() => {
    resetPersist();
    resetTemp();
  }, [resetPersist, resetTemp]);

  return (
    <Button
      onClick={removeAll}
      ui_color="tertiary"
      ui_size="small"
      ui_variant="light"
      className="flex items-center gap-4 text-nowrap"
    >
      <DeleteIcon /> Remove All
    </Button>
  );
}
