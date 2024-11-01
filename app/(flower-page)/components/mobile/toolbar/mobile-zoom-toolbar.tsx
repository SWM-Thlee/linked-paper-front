"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { GraphHandler } from "@/features/graph/hooks/default/use-graph-handler";
import { Graph } from "@/features/graph/types";
import ToolbarContainer from "@/components/toolbar/toolbar-container";
import LabelButton from "@/ui/label-button";
import ZoomInIcon from "@/ui/icons/zoom-in";
import ZoomOutIcon from "@/ui/icons/zoom-out";

type Props = {
  handler: GraphHandler | null;
  viewConfig: Graph.Config.View;
};

export type AdjustZoomOption = { duration?: number } & (
  | { scale: number }
  | { multiplier: number }
);

export default function MobileZoomToolbar({ handler, viewConfig }: Props) {
  const { min, max } = useMemo(() => viewConfig.zoom, [viewConfig.zoom]);

  const [zoom, setZoom] = useState<number>(min);
  const [value, setValue] = useState<number[]>([0]);

  const zoomInOut = useCallback(
    (percentagePoint: number) => {
      const [percentage] = value;

      handler?.config.applyConfig((config) =>
        config.zoom(
          min +
            (max - min) *
              (Math.max(0, Math.min(percentage + percentagePoint, 100)) / 100),
          500,
        ),
      );
    },
    [handler?.config, min, max, value],
  );

  useEffect(() => {
    setValue([((zoom - min) / (max - min)) * 100]);
  }, [zoom, min, max]);

  useEffect(() => {
    handler?.event.onEvent(Graph.Event.Type.ZOOM_UPDATE, ({ k: scale }) => {
      requestAnimationFrame(() => setZoom(scale));
    });
  }, [handler?.event]);

  return (
    <ToolbarContainer className="gap-0 p-0.5">
      <LabelButton
        ui_variant="ghost"
        ui_color="secondary"
        onClick={() => zoomInOut(10)}
        aria-label="Zoom In"
        className="rounded-r-0 pr-3"
      >
        <ZoomInIcon /> <span>In</span>
      </LabelButton>
      <LabelButton
        ui_variant="ghost"
        ui_color="secondary"
        onClick={() => zoomInOut(-10)}
        aria-label="Zoom Out"
        className="rounded-l-0 pl-3"
      >
        <ZoomOutIcon /> <span>Out</span>
      </LabelButton>
    </ToolbarContainer>
  );
}
