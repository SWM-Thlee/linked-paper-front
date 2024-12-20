"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_TICK } from "./const";
import { CompletionContext } from "./context";

type CompletionProps = {
  children?: React.ReactNode;
};

export default function Completion({ children }: CompletionProps) {
  const [streamingQuery, setStreamingQuery] = useState({ query: "", index: 0 });
  const [isStreaming, setIsStreaming] = useState(false);
  const [listeners, setListeners] = useState<
    Map<string, (query: string) => void>
  >(new Map());
  const [tick, setTick] = useState(DEFAULT_TICK);
  const [query, setQuery] = useState("");

  /* 쿼리를 요청합니다. */
  const requestQuery = useCallback(
    (req: string) => {
      if (req === query) return;

      setQuery(req);
      setIsStreaming(true);
      listeners.forEach((trigger) => trigger(req));
    },
    [query, listeners],
  );

  useEffect(() => {
    if (!isStreaming) return;

    /* 스트리밍 쿼리가 설정된 쿼리와 매치되지 않는다면 스트리밍 쿼리를 초기화합니다. */
    if (!query.startsWith(streamingQuery.query)) {
      setStreamingQuery({ query: "", index: 0 });
    }

    /* 스트리밍 쿼리가 설정된 쿼리와 같다면 스트리밍을 중단합니다. */
    if (query === streamingQuery.query) {
      setIsStreaming(false);
      return;
    }

    setTimeout(
      () =>
        requestAnimationFrame(() =>
          setStreamingQuery((prev) => {
            const nextChar = query[prev.index];

            if (!nextChar) return prev;
            return {
              index: prev.index + 1,
              query: prev.query + nextChar,
            };
          }),
        ),
      tick,
    );
  }, [query, tick, streamingQuery, isStreaming]);

  const onTrigger = useCallback(
    (
      trigger: (query: string) => void,
      name: string = "DefaultCompletionTriggerEvent",
    ) => {
      setListeners((prev) => {
        const newListeners = new Map(prev);
        newListeners.set(name, trigger);
        return newListeners;
      });
    },
    [],
  );

  const value = useMemo(
    () => ({
      onTrigger,
      currentQuery: streamingQuery.query,
      tick,
      requestQuery,
      setTick,
    }),
    [streamingQuery, tick, requestQuery, onTrigger],
  );

  return (
    <CompletionContext.Provider value={value}>
      {children}
    </CompletionContext.Provider>
  );
}
