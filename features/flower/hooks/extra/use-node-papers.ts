import { useCallback, useState } from "react";

import { Paper } from "@/features/paper/types";

export default function useNodePapers() {
  const [paperIndexing, setPaperIndexing] = useState<
    Map<Paper.Scheme.Id, Paper.Scheme.Metadata>
  >(new Map());

  const hasPaper = useCallback(
    (paperID: Paper.Scheme.Id) => paperIndexing.has(paperID),
    [paperIndexing],
  );

  const getPaper = useCallback(
    (paperID?: Paper.Scheme.Id) =>
      paperID ? paperIndexing.get(paperID) : undefined,
    [paperIndexing],
  );

  const upsertPaper = useCallback((paper: Paper.Scheme.Metadata) => {
    setPaperIndexing((papers) => {
      const newPapers = new Map(papers);
      newPapers.set(paper.id, paper);

      return newPapers;
    });
  }, []);

  const removePaper = useCallback(
    (paperID: Paper.Scheme.Id) => {
      if (!hasPaper(paperID)) return false;

      setPaperIndexing((papers) => {
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
