import { useCallback } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import useFilters from "@/features/filter-v2/hooks/use-filters";
import { converter, producer } from "../../utils/filter-v2/flow";

export default function useEditSearchFilter(id?: string) {
  const { filters, dispatch, remove } = useFilters();

  const filter = useDeepCompareMemo(() => {
    const target = filters.filter((candidate) => candidate.id === id);

    if (target.length > 1) {
      throw new Error(
        "Error from Edit Search Filter: There should be only one target filter.",
      );
    }

    if (target.length === 1) {
      return target[0];
    }

    return undefined;
  }, [filters]);

  const editor = useDeepCompareMemo(() => {
    if (!filter) {
      return undefined;
    }

    const target = filters
      .filter((candidate) => candidate.feature === "search-edit")
      .filter((candidate) => candidate.link === filter.id);

    if (target.length > 1) {
      throw new Error(
        "Error from Edit Search Filter: There should be only one edit filter.",
      );
    }

    if (target.length === 1) {
      return target[0];
    }

    return undefined;
  }, [filters, filter]);

  const begin = useCallback(() => {
    if (!filter) return;

    let newEditor;

    if (filter.feature === "search-preset") {
      newEditor = producer["search-preset"]["search-edit"](filter);
    } else if (filter.feature === "search-default") {
      newEditor = producer["search-default"]["search-edit"](filter);
    } else if (filter.feature === "search-query") {
      newEditor = producer["search-query"]["search-edit"](filter);
    }

    if (newEditor) {
      dispatch(newEditor);
    }
  }, [dispatch, filter]);

  const apply = useCallback(() => {
    if (!editor || !filter) return;

    let newFilter;

    if (filter.feature === "search-preset") {
      newFilter = converter["search-edit"]["search-preset"](editor);
    } else if (filter.feature === "search-default") {
      newFilter = converter["search-edit"]["search-default"](editor);
    } else if (filter.feature === "search-query") {
      newFilter = converter["search-edit"]["search-query"](editor);
    }

    if (newFilter) {
      dispatch(newFilter);
    }

    // Editor 삭제
    remove(editor.id);
  }, [dispatch, filter, editor, remove]);

  return { filter, editor, begin, apply };
}
