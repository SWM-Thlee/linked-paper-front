import { useCallback, useEffect, useRef, useState } from "react";
import { Paper } from "@/features/paper/types";

export default function usePapers() {
  /* Paper Cache를 저장합니다. */
  const [cache, setCache] = useState<
    Map<Paper.Scheme.Id, Paper.Scheme.Metadata>
  >(new Map());

  /* 각 Paper의 추가 식별자를 Cache하여 별도의 중복 구별에 사용됩니다. */
  const [extraCache, setExtraCache] = useState<
    Map<Paper.Scheme.Source, Set<string>>
  >(new Map());

  /* Upsert 이후에 적용해야 할 작업이 있을 때 사용합니다. */
  const upsertListeners = useRef<
    Map<Paper.Scheme.Id, Set<(paper: Paper.Scheme.Metadata) => void>>
  >(new Map());

  const hasPaper = useCallback(
    (paperID: Paper.Scheme.Id) => cache.has(paperID),
    [cache],
  );

  const hasPaperFromSource = useCallback(
    (source: Paper.Scheme.Source, id?: string) => {
      if (!id) return false;

      const ids = extraCache.get(source);

      if (!ids) return false;

      return ids.has(id);
    },
    [extraCache],
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

      setExtraCache((extra) => {
        const newExtra = new Map(extra);
        Object.values(Paper.Scheme.Source).forEach((source) => {
          const id = paper.extraID[source];
          if (id)
            newExtra.set(source, (newExtra.get(source) ?? new Set()).add(id));
        });

        return newExtra;
      });
    },
    [],
  );

  const removePaper = useCallback(
    (paperID: Paper.Scheme.Id) => {
      const paper = getPaper(paperID);

      if (!paper) return false;

      setCache((papers) => {
        const newPapers = new Map(papers);
        newPapers.delete(paperID);

        return newPapers;
      });

      setExtraCache((extra) => {
        const newExtra = new Map(extra);
        Object.values(Paper.Scheme.Source).forEach((source) => {
          const id = paper.extraID[source];
          const ids = newExtra.get(source);

          if (id && ids) {
            ids.delete(id);
            newExtra.set(source, ids);
          }
        });

        return newExtra;
      });

      return true;
    },
    [getPaper],
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

  return { hasPaper, hasPaperFromSource, getPaper, upsertPaper, removePaper };
}
