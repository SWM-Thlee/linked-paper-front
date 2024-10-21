import { Default } from "@/utils/type-helper";
import { CanvasVariant } from "@/utils/style/canvas-variants";

import { Link, Node, NodeType } from "./element";
import { Node as NodeConfig } from "./config";

/* Render Timing */
export type RenderBefore = (
  ctx: CanvasRenderingContext2D,
  scale: number,
) => void;
export type RenderAfter = (
  ctx: CanvasRenderingContext2D,
  scale: number,
) => void;

/* Render Node */
export type RenderNode = (option: {
  node: Node;
  drawCircle: DrawNodeCircle;
  drawText: DrawNodeText;
}) => void;

export type DetermineNodeResolver = (
  node: Node,
  color: string,
  ctx: CanvasRenderingContext2D,
  scale: number,
) => void;

export type RenderNodeResolver = (
  node: Node,
  ctx: CanvasRenderingContext2D,
  scale: number,
) => void;

/* Render Link */
export type RenderLink = (option: {
  link: Link;
  drawLink: DrawLink;
  drawLinkText: DrawLinkText;
}) => void;

export type DetermineLinkResolver = (
  link: Link,
  color: string,
  ctx: CanvasRenderingContext2D,
  scale: number,
) => void;

export type RenderLinkResolver = (
  link: Link,
  ctx: CanvasRenderingContext2D,
  scale: number,
) => void;

/* Draw Circle */
export type DrawNodeCircle = (option: {
  style: CanvasVariant;
  radius: number;
  scale?: ScaleOption;
}) => void;

export type DrawNodeCircleResolver = (option: {
  node: Node;
  ctx: CanvasRenderingContext2D;
  rawScale: number;
  scale?: ScaleOption;
  style: CanvasVariant;
  radius: number;
  determine?: DetermineOption;
}) => void;

/* Draw Text */
export type DrawNodeText = (option: {
  style: CanvasVariant;
  maxWidth?: number;
  maxLines?: number;
  height: number;
  offsetY?: number;
  text: string;
  scale?: ScaleOption;
}) => void;

export type DrawNodeTextResolver = (option: {
  node: Node;
  ctx: CanvasRenderingContext2D;
  rawScale: number;
  style: CanvasVariant;
  maxWidth?: number;
  maxLines?: number;
  height: number;
  offsetY?: number;
  text: string;
  scale?: ScaleOption;
  determine?: DetermineOption;
}) => void;

/* Draw Link */
export type DrawLink = (option: {
  style: CanvasVariant;
  scale?: ScaleOption;
  radius: NodeConfig["link"]["distanceFromCenter"];
}) => void;

export type DrawLinkResolver = (option: {
  link: Link;
  ctx: CanvasRenderingContext2D;
  rawScale: number;
  scale?: ScaleOption;
  style: CanvasVariant;
  radius: NodeConfig["link"]["distanceFromCenter"];
  determine?: DetermineOption;
}) => void;

/* Draw Link Text */
export type DrawLinkText = (option: {
  style: CanvasVariant;
  height: number;
  text: string;
  scale?: ScaleOption;
  locate?: LinkTextLocateOption;
  radius: NodeConfig["link"]["distanceFromCenter"];
}) => void;

export type DrawLinkTextResolver = (option: {
  link: Link;
  ctx: CanvasRenderingContext2D;
  style: CanvasVariant;
  height: number;
  text: string;
  rawScale: number;
  scale?: ScaleOption;
  locate?: LinkTextLocateOption;
  radius: NodeConfig["link"]["distanceFromCenter"];
  determine?: DetermineOption;
}) => void;

/* Config */
export type Renderer = {
  node: Default<RenderNode> & {
    [type: NodeType]: RenderNode;
  };
  link: Default<RenderLink> & {
    [type: NodeType]: {
      [type: NodeType]: RenderLink;
    };
  };
  renderBefore?: RenderBefore;
  renderAfter?: RenderAfter;
};

/* Others */
export type ScaleOption = true | { min?: number; max?: number };
export type LinkTextLocateOption = {
  from: "source" | "target";
  distance: number;
};
export type DetermineOption = { color: string };
