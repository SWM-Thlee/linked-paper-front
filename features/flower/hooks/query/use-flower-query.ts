import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ErrorResponse } from "@/utils/fetch-universally";
import { queryOptions } from "../../server/queries";
import { Flower } from "../../types";

type FlowerLoadedListener = (result: Flower.Api.Result) => void;
type FlowerErrorListener = (response: ErrorResponse) => void;

export default function useFlowerQuery(initial: string) {
  const [target, setTarget] = useState(initial);
  const loadedListener = useRef<FlowerLoadedListener>(() => {});
  const errorListener = useRef<FlowerErrorListener>(() => {});

  const { data, isFetching } = useQuery(
    queryOptions.correlation({ paperID: target }),
  );

  const onFlowerError = useCallback((listener: FlowerErrorListener) => {
    errorListener.current = listener;
  }, []);

  const onFlowerLoaded = useCallback((listener: FlowerLoadedListener) => {
    loadedListener.current = listener;
  }, []);

  const loadFlower = useCallback((paperID: string) => setTarget(paperID), []);

  useEffect(() => {
    if (isFetching || !data) return;

    if (data.status === "ERROR") {
      errorListener.current(data);
      return;
    }

    loadedListener.current(data);
  }, [data, isFetching]);

  return {
    flowerPaperID: target,
    isFlowerLoading: isFetching,
    onFlowerError,
    onFlowerLoaded,
    loadFlower,
  };
}
