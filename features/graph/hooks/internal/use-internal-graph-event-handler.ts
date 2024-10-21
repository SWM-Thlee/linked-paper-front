import { useCallback, useRef } from "react";

import { Graph } from "../../types";

type EventHandler = {
  [key in Graph.Event.Type]?: {
    [key: string]: (...args: Parameters<Graph.Event.Handler<key>>) => void;
  };
};

type OnEvent = <T extends Graph.Event.Type>(
  type: T,
  handler: Graph.Event.Handler<T>,
  name?: string,
) => void;

type HandleEvent = <T extends Graph.Event.Type>(
  type: T,
) => (...args: Parameters<Graph.Event.Handler<T>>) => void;

export default function useInternalGraphEventHandler() {
  const handlers = useRef<EventHandler>({});

  const onEvent: OnEvent = useCallback((type, handler, name = "default") => {
    handlers.current[type] = {
      ...(handlers.current[type] ?? {}),
      [name]: handler,
    };
  }, []);

  const handleEvent: HandleEvent = useCallback(
    (type) =>
      (...args) =>
        Object.values(handlers.current[type] ?? []).forEach((handler) =>
          handler(...args),
        ),
    [],
  );

  return { onEvent, handleEvent };
}
