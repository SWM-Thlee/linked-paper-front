import { useContext, useEffect } from "react";
import { CompletionContext } from "../context";

export default function useCompletion(attachFn?: (query: string) => void) {
  const { currentQuery, tick, requestQuery, setTick, onTrigger } =
    useContext(CompletionContext);

  useEffect(() => {
    if (attachFn) attachFn(currentQuery);
  }, [currentQuery, attachFn]);

  return { currentQuery, tick, requestQuery, setTick, onTrigger };
}
