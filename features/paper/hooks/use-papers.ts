import { useCallback, useState } from "react";
import { Paper } from "@/features/paper/types";

export default function usePapers(initialPapers?: Paper.Scheme.Metadata[]) {
  const [cache, setCache] = useState<
    Map<Paper.Scheme.Id, Paper.Scheme.Metadata>
  >(new Map(initialPapers?.map((value) => [value.id, value])));

  const hasPaper = useCallback(
    (paperID: Paper.Scheme.Id) => cache.has(paperID),
    [cache],
  );

  const getPaper = useCallback(
    (paperID?: Paper.Scheme.Id) => (paperID ? cache.get(paperID) : undefined),
    [cache],
  );

  const upsertPaper = useCallback((paper: Paper.Scheme.Metadata) => {
    setCache((papers) => {
      const newPapers = new Map(papers);
      newPapers.set(paper.id, paper);

      return newPapers;
    });
  }, []);

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

  return { hasPaper, getPaper, upsertPaper, removePaper };
}
