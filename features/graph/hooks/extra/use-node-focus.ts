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
  const { width, height } = useFullscreen();

  const focus = useCallback(
    ({ nodeID, padding }: FocusOptions) => {
      const { adjustDurationByZoom, duration } = viewConfig.zoom.focus;
      handler?.config.applyConfig((config) => {
        const currentZoom = config.zoom();
        const box = config.getGraphBbox((node) => node.id === nodeID);

        if (!box) {
          throw new Error("Error from Focusing Root Node: Node is not found.");
        }

        const {
          x: [minX, maxX],
          y: [minY, maxY],
        } = box;

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
    },
    [
      handler?.config,
      viewConfig.zoom.focus,
      focusOffsetX,
      focusOffsetY,
      width,
      height,
    ],
  );

  return {
    focus,
    focusOffsetX,
    focusOffsetY,
    setFocusOffsetX,
    setFocusOffsetY,
  };
}
