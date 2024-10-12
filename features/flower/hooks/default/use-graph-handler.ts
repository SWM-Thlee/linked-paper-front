import { useCallback, useRef } from "react";

import useInternalGraphConfig from "../internal/use-internal-graph-config";
import useInternalGraphEventHandler from "../internal/use-internal-graph-event-handler";

export type GraphHandler = {
  config: Pick<
    ReturnType<typeof useInternalGraphConfig>,
    "applyConfig" | "chargeConfig" | "collideConfig" | "linkConfig"
  >;
  event: Pick<
    ReturnType<typeof useInternalGraphEventHandler>,
    "registerHandler"
  >;
};

export default function useGraphHandler() {
  const ref = useRef<GraphHandler | null>(null);
  const refHandler = useCallback((handler: GraphHandler | null) => {
    ref.current = handler;
  }, []);
  return { handler: ref.current, refHandler };
}
