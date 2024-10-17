import { ForceGraphProps } from "react-force-graph-2d";

import { Link, Node } from "./element";

type Props = {
  [K in keyof ForceGraphProps<Node, Link>]-?: ForceGraphProps<Node, Link>[K];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
type ForceGraphFunctions = Pick<
  Props,
  {
    [K in keyof Props]: Props[K] extends (...args: any[]) => any
      ? K extends `on${string}`
        ? K
        : never
      : never;
  }[keyof Props]
>;

export const Type = {
  /* Node Event */
  NODE_CLICK: "nodeClick",
  NODE_RCLICK: "nodeRightClick",
  NODE_HOVER: "nodeHover",
  NODE_DRAG: "nodeDrag",
  NODE_DRAG_END: "nodeDragEnd",

  /* Background Event */
  BG_CLICK: "backgroundClick",
  BG_RCLICK: "backgroundRightClick",

  /* Link Event */
  LINK_CLICK: "linkClick",
  LINK_RCLICK: "linkRightClick",
  LINK_HOVER: "linkHover",

  /* Zoom Event */
  ZOOM_UPDATE: "zoomUpdate",
  ZOOM_END: "zoomEnd",

  /* Engine Event */
  ENGINE_TICK: "engineTick",
  ENGINE_STOP: "engineStop",
} as const;

export type Type = (typeof Type)[keyof typeof Type];

const Mapper = {
  /* Node Event */
  [Type.NODE_CLICK]: "onNodeClick",
  [Type.NODE_RCLICK]: "onNodeRightClick",
  [Type.NODE_HOVER]: "onNodeHover",
  [Type.NODE_DRAG]: "onNodeDrag",
  [Type.NODE_DRAG_END]: "onNodeDragEnd",

  /* Background Event */
  [Type.BG_CLICK]: "onBackgroundClick",
  [Type.BG_RCLICK]: "onBackgroundRightClick",

  /* Link Event */
  [Type.LINK_CLICK]: "onLinkClick",
  [Type.LINK_RCLICK]: "onLinkRightClick",
  [Type.LINK_HOVER]: "onLinkHover",

  /* Zoom Event */
  [Type.ZOOM_UPDATE]: "onZoom",
  [Type.ZOOM_END]: "onZoomEnd",

  /* Engine Event */
  [Type.ENGINE_TICK]: "onEngineTick",
  [Type.ENGINE_STOP]: "onEngineStop",
} as const;

export type Handler<T extends Type> = ForceGraphFunctions[(typeof Mapper)[T]];
