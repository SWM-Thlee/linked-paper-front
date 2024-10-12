import { useCallback, useState } from "react";

import { PaperMetadata } from "@/types/paper";
import { Flower } from "../../types";

export default function useNodePapers() {
  const [paperIndexing, setPaperIndexing] = useState<
    Map<Flower.Graph.PaperID, PaperMetadata>
  >(new Map());

  const hasPaper = useCallback(
    (paperID: PaperMetadata["id"]) => paperIndexing.has(paperID),
    [paperIndexing],
  );

  const getPaper = useCallback(
    (paperID?: PaperMetadata["id"]) =>
      paperID ? paperIndexing.get(paperID) : undefined,
    [paperIndexing],
  );

  const upsertPaper = useCallback((paper: PaperMetadata) => {
    setPaperIndexing((papers) => {
      const newPapers = new Map(papers);
      newPapers.set(paper.id, paper);

      return newPapers;
    });
  }, []);

  const removePaper = useCallback(
    (paperID: PaperMetadata["id"]) => {
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
