import { useCallback, useState } from "react";
import { produce } from "immer";

import { Paper } from "../types";

export default function usePaperSimilarities() {
  const [data, setData] = useState<Paper.Similarity.Store>({});

  const get = useCallback(
    (p1: Paper.Scheme.Id, p2: Paper.Scheme.Id) => data[p1]?.[p2] || undefined,
    [data],
  );

  const set = useCallback(
    (p1: Paper.Scheme.Id, p2: Paper.Scheme.Id, similarity: number) => {
      setData((prevData) =>
        produce(prevData, (draft) => {
          if (!draft[p1]) draft[p1] = {};
          if (!draft[p2]) draft[p2] = {};

          draft[p1][p2] = similarity;
          draft[p2][p1] = similarity;
        }),
      );
    },
    [],
  );

  return { get, set };
}
