import { useCallback } from "react";
import { Flower } from "../../types";
import { GraphHandler } from "../default/use-graph-handler";

type FocusOptions = {
  nodeID: Flower.Graph.NodeID;
};

export default function useNodeFocus(
  handler: GraphHandler | null,
  viewConfig: Flower.Config.View,
) {
  const focus = useCallback(
    ({ nodeID }: FocusOptions) => {
      const { adjustDurationByZoom, duration, zoom } = viewConfig.zoom.focus;

      setTimeout(
        () =>
          handler?.config.applyConfig((config) => {
            const scale = config.zoom();
            const resolvedDuration =
              duration / (adjustDurationByZoom ? scale : zoom);

            const box = config.getGraphBbox((node) => node.id === nodeID);

            if (!box) {
              throw new Error("Error from Focusing Node: Node is not found.");
            }

            const {
              x: [minX, maxX],
              y: [minY, maxY],
            } = box;

            config.centerAt(
              (minX + maxX) / 2,
              (minY + maxY) / 2,
              resolvedDuration,
            );
            config.zoom(zoom, resolvedDuration);
          }),
        200,
      );
    },
    [handler?.config, viewConfig.zoom.focus],
  );

  return { focus };
}
