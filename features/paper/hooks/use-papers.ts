import { useCallback, useEffect, useRef, useState } from "react";
import { Paper } from "@/features/paper/types";

export default function usePapers(initialPapers?: Paper.Scheme.Metadata[]) {
  const [cache, setCache] = useState<
    Map<Paper.Scheme.Id, Paper.Scheme.Metadata>
  >(new Map(initialPapers?.map((value) => [value.id, value])));

  /* Upsert 이후에 적용해야 할 작업이 있을 때 사용합니다. */
  const upsertListeners = useRef<
    Map<Paper.Scheme.Id, Set<(paper: Paper.Scheme.Metadata) => void>>
  >(new Map());

  const hasPaper = useCallback(
    (paperID: Paper.Scheme.Id) => cache.has(paperID),
    [cache],
  );

  const getPaper = useCallback(
    (paperID?: Paper.Scheme.Id) => (paperID ? cache.get(paperID) : undefined),
    [cache],
  );

  const upsertPaper = useCallback(
    (
      paper: Paper.Scheme.Metadata,
      onUpsert?: (paper: Paper.Scheme.Metadata) => void,
    ) => {
      if (onUpsert) {
        upsertListeners.current.set(
          paper.id,
          (upsertListeners.current.get(paper.id) ?? new Set()).add(onUpsert),
        );
      }

      setCache((papers) => {
        const newPapers = new Map(papers);
        newPapers.set(paper.id, paper);

        return newPapers;
      });
    },
    [],
  );

  const removePaper = useCallback(
    (paperID: Paper.Scheme.Id) => {
      if (!hasPaper(paperID)) return false;

      setCache((papers) => {
        const newPapers = new Map(papers);
        newPapers.delete(paperID);

        return newPapers;
      });

      return true;
    },
    [hasPaper],
  );

  useEffect(() => {
    const resolved: Paper.Scheme.Id[] = [];

    upsertListeners.current.forEach((listeners, paperID) => {
      const paper = cache.get(paperID);
      if (!paper) return;

      resolved.push(paper.id);
      listeners.forEach((listener) => listener(paper));
    });

    resolved.forEach((paperID) => upsertListeners.current.delete(paperID));
  }, [cache]);

  return { hasPaper, getPaper, upsertPaper, removePaper };
}
