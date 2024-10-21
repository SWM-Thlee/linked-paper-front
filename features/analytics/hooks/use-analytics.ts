import { useCallback, useContext } from "react";
import { logEvent } from "firebase/analytics";

import { Analytics } from "../types";
import { canAnalyze } from "../config/firebase";
import { AnalyticsProviderContext } from "../components/analytics-provider/context";

export default function useAnalytics() {
  const analytics = useContext(AnalyticsProviderContext);

  const log = useCallback(
    <T extends Analytics.Event.Type>(
      event: T,
      payload: Analytics.Event.Payload<T>,
    ) => {
      if (canAnalyze(analytics)) {
        logEvent(analytics, event, payload);
      }
    },
    [analytics],
  );

  return { log };
}
