import { useCallback, useState } from "react";

import { Flower } from "../../types";

type EventHandler = {
  [key in Flower.Event.Type]?: {
    [key: string]: (...args: Parameters<Flower.Event.Handler<key>>) => void;
  };
};

type RegisterFn = <T extends Flower.Event.Type>(
  type: T,
  handler: Flower.Event.Handler<T>,
  name?: string,
) => void;

type OnHandleEventFn = <T extends Flower.Event.Type>(
  type: T,
) => (...args: Parameters<Flower.Event.Handler<T>>) => void;

export default function useInternalGraphEventHandler() {
  const [handlers, setHandlers] = useState<EventHandler>({});

  const registerHandler: RegisterFn = useCallback(
    (type, handler, name = "default") => {
      setHandlers((prev) => ({
        ...prev,
        [type]: { ...(prev[type] ?? {}), [name]: handler },
      }));
    },
    [],
  );

  const onHandleEvent: OnHandleEventFn = useCallback(
    (type) =>
      (...args) =>
        Object.values(handlers[type] ?? []).forEach((handler) =>
          handler(...args),
        ),
    [handlers],
  );

  return { registerHandler, onHandleEvent };
}
