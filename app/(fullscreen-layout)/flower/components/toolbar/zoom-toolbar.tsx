"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { GraphHandler } from "@/features/graph/hooks/default/use-graph-handler";
import { Graph } from "@/features/graph/types";
import LabelButton from "@/ui/label-button";
import SearchIcon from "@/ui/icons/search";
import Slider from "@/ui/slider";
import IconButton from "@/ui/icon-button";
import AddIcon from "@/ui/icons/add";
import RemoveIcon from "@/ui/icons/remove";
import ToolContainer from "../../../../../features/graph/components/toolbar/toolbar-container";

type Props = {
  handler: GraphHandler | null;
  viewConfig: Graph.Config.View;
};

export type AdjustZoomOption = { duration?: number } & (
  | { scale: number }
  | { multiplier: number }
);

export default function ZoomToolbar({ handler, viewConfig }: Props) {
  const { min, max } = useMemo(() => viewConfig.zoom, [viewConfig.zoom]);

  const [zoom, setZoom] = useState<number>(min);
  const [value, setValue] = useState<number[]>([0]);
  const [openDetails, setOpenDetails] = useState(false);

  const onValueChange = useCallback(
    ([percentage]: number[]) => {
      handler?.config.applyConfig((config) =>
        config.zoom(min + (max - min) * (percentage / 100)),
      );
    },
    [handler?.config, min, max],
  );

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
    <ToolContainer>
      <LabelButton
        ui_variant="ghost"
        ui_color="secondary"
        className="flex w-[6rem] justify-between"
        onClick={() => setOpenDetails((open) => !open)}
      >
        <SearchIcon ui_size="small" /> {zoom.toFixed(2)}x
      </LabelButton>
      {openDetails && (
        <Slider
          min={0}
          max={100}
          value={value}
          onValueChange={onValueChange}
          className="w-[10rem]"
          ui_color="tertiary"
        />
      )}
      <IconButton
        ui_shape="circle"
        onClick={() => zoomInOut(10)}
        aria-label="Zoom In"
      >
        <AddIcon ui_size="small" />
      </IconButton>
      <IconButton
        ui_shape="circle"
        onClick={() => zoomInOut(-10)}
        aria-label="Zoom Out"
      >
        <RemoveIcon ui_size="small" />
      </IconButton>
    </ToolContainer>
  );
}
