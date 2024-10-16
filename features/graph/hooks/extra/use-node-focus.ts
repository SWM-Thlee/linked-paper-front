import { useCallback } from "react";
import { Graph } from "../../types";
import { GraphHandler } from "../default/use-graph-handler";

type FocusOptions = {
  nodeID: Graph.Element.NodeID;
};

export default function useNodeFocus(
  handler: GraphHandler | null,
  viewConfig: Graph.Config.View,
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
        50,
      );
    },
    [handler?.config, viewConfig.zoom.focus],
  );

  return { focus };
}
