import { useEffect, useMemo } from "react";

import useSettings from "./use-settings-container";
import { TabID } from "../types";

export default function useTabDirectionObserver(
  name: string,
  id: TabID,
  matcher?: string,
) {
  const { directionObserver, setDirectionObserver } = useSettings();
  const settings = useSettings();
  const matchers = useMemo(
    () => directionObserver[name] ?? null,
    [name, directionObserver],
  );

  useEffect(() => {
    if (matcher && matchers?.includes(matcher)) {
      settings.setTabID(id);
      setDirectionObserver((observer) => ({
        ...observer,
        [name]: (observer[name] ?? []).filter((m) => m !== matcher),
      }));
    }
  }, [matchers, matcher, setDirectionObserver, settings, id, name]);
}
