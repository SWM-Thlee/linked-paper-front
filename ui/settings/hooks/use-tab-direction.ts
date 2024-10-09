import { useCallback } from "react";
import useSettings from "./use-settings-container";

export default function useTabDirection() {
  const { directionObserver, setDirectionObserver } = useSettings();

  const request = useCallback(
    (tab: string, matcher: string) => {
      if (directionObserver[tab]?.includes(matcher)) return;
      setDirectionObserver((observer) => ({
        ...observer,
        [tab]: [...(observer[tab] ?? []), matcher],
      }));
    },
    [directionObserver, setDirectionObserver],
  );

  return { request };
}
