import { useCallback, useEffect, useRef, useState } from "react";
import { useQueries } from "@tanstack/react-query";

import { ErrorResponse } from "@/utils/api";
import { queryOptions } from "../server/queries";
import { Flower } from "../types";

type FlowerLoadedListener = (result: Flower.Api.Result) => void;
type FlowerErrorListener = (response: ErrorResponse<Flower.Api.Error>) => void;

// TODO: Error 시 Refetching 구현
export default function useFlowerQueries(intialTarget?: string[]) {
  const [target, setTarget] = useState(intialTarget ?? []);
  const loaded = useRef(new Map<string, boolean>());

  const loadedListener = useRef<FlowerLoadedListener>(() => {});
  const errorListener = useRef<FlowerErrorListener>(() => {});

  const flowers = useQueries({
    queries: target.map((paperID) => queryOptions.correlation({ paperID })),
    combine(result) {
      return result.map(({ data }) => data);
    },
  });

  const onFlowerError = useCallback((listener: FlowerErrorListener) => {
    errorListener.current = listener;
  }, []);

  const onFlowerLoaded = useCallback((listener: FlowerLoadedListener) => {
    loadedListener.current = listener;
  }, []);

  const loadFlower = useCallback((paperID: string) => {
    setTarget((prevQueue) => {
      if (prevQueue.includes(paperID)) return prevQueue;

      return [...prevQueue, paperID];
    });
  }, []);

  const isFlowerLoading = useCallback(
    (paperID: string) => {
      return target.includes(paperID) && !loaded.current.has(paperID);
    },
    [target],
  );

  const isFlowerLoaded = useCallback(
    (paperID: string) =>
      target.includes(paperID) && loaded.current.get(paperID),
    [target],
  );

  useEffect(() => {
    flowers
      .filter((flower) => !!flower)
      .forEach((flower) => {
        if (flower.status === "ERROR") {
          /* Error Response */
          if (!flower.extra?.paperID) return;

          const isLoaded = loaded.current.get(flower.extra?.paperID);

          if (isLoaded) return;

          loaded.current.set(flower.extra?.paperID, true);
          errorListener.current(flower);
        } else {
          /* Success Response */
          const isLoaded = loaded.current.get(flower.paperID);

          if (isLoaded) return;

          loaded.current.set(flower.paperID, true);
          loadedListener.current(flower);
        }
      });
  }, [flowers]);

  return {
    isFlowerLoading,
    isFlowerLoaded,
    onFlowerError,
    onFlowerLoaded,
    loadFlower,
  };
}
