import { Default } from "@/utils/type-helper";
import { Link, Node, NodeType } from "./graph";

export type RenderBefore = (
  ctx: CanvasRenderingContext2D,
  scale: number,
) => void;
export type RenderAfter = (
  ctx: CanvasRenderingContext2D,
  scale: number,
) => void;
export type DetermineRadius = (node: Node) => number;
export type DetermineArea = (
  node: Node,
  color: string,
  ctx: CanvasRenderingContext2D,
  scale: number,
) => void;
export type RenderNode = (
  node: Node,
  ctx: CanvasRenderingContext2D,
  scale: number,
) => void;
export type RenderLink = (
  link: Link,
  ctx: CanvasRenderingContext2D,
  scale: number,
) => void;

export type Renderer = {
  area: Default<DetermineArea> & {
    [type: NodeType]: DetermineArea;
  };
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
