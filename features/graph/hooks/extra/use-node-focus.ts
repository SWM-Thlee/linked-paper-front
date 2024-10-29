import { useCallback, useState } from "react";

import useFullscreen from "@/hooks/use-fullscreen";
import { GraphHandler } from "../default/use-graph-handler";
import { Graph } from "../../types";

type FocusOptions = {
  nodeID: Graph.Element.NodeID;
  padding?: number;
};

export default function useNodeFocus(
  handler: GraphHandler | null,
  viewConfig: Graph.Config.View,
) {
  const [focusOffsetX, setFocusOffsetX] = useState(0);
  const [focusOffsetY, setFocusOffsetY] = useState(0);
  const [requests, setRequests] = useState<FocusOptions[]>([]);
  const { width, height } = useFullscreen();

  const focusResolver: Graph.Render.RenderAfter = useCallback(() => {
    if (requests.length === 0) return;

    const unresolved = new Set<string>();

    requests.forEach(({ nodeID, padding }) => {
      const { adjustDurationByZoom, duration } = viewConfig.zoom.focus;

      handler?.config.applyConfig((config) => {
        const currentZoom = config.zoom();
        const {
          x: [minX, maxX],
          y: [minY, maxY],
        } = config.getGraphBbox((node) => node.id === nodeID);

        if (!minX || !maxX || !minY || !maxY) {
          unresolved.add(nodeID);
          return;
        }

        const zoom = Math.min(
          width / (maxX - minX + (padding ?? 0)),
          height / (maxY - minY + (padding ?? 0)),
        );

        const resolvedDuration =
          duration *
          (adjustDurationByZoom ? 1 / Math.abs(currentZoom - zoom) : 1);

        config.centerAt(
          (minX + maxX) / 2 + focusOffsetX,
          (minY + maxY) / 2 + focusOffsetY,
          resolvedDuration,
        );
        config.zoom(zoom, resolvedDuration);
      });
    });

    setRequests((previous) =>
      previous.filter(({ nodeID }) => unresolved.has(nodeID)),
    );
  }, [
    handler?.config,
    requests,
    viewConfig.zoom.focus,
    focusOffsetX,
    focusOffsetY,
    width,
    height,
  ]);

  /* 해당 노드가 존재할 때 포커스합니다. */
  const requestFocus = useCallback((options: FocusOptions) => {
    setRequests((previous) => [...previous, options]);
  }, []);

  return {
    requestFocus,
    focusResolver,
    focusOffsetX,
    focusOffsetY,
    setFocusOffsetX,
    setFocusOffsetY,
  };
}
