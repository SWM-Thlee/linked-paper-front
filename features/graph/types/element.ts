import { GraphData, LinkObject, NodeObject } from "react-force-graph-2d";
import { Paper } from "@/features/paper/types";

/* Node의 뼈대를 이루는 타입을 나타냅니다. */
export const BaseNodeType = {
  GROUP: "group",
  ROOT: "root",
  CHILD: "child",
} as const;

export type BaseNodeType = (typeof BaseNodeType)[keyof typeof BaseNodeType];

/* 실질적으로 Node를 구분하는 Type을 나타냅니다. */
export type NodeType<T extends string = string> = T & {
  readonly __type: unique symbol;
};

export function createNodeType<T extends string>(name: T) {
  return name as NodeType<T>;
}

/** (각 BaseNode에 대응되는) 기본 Node Type입니다. */
export const DefaultNode = {
  GROUP: createNodeType("DefaultGroupNode"),
  ROOT: createNodeType("DefaultRootNode"),
  CHILD: createNodeType("DefaultChildNode"),
} as const satisfies {
  [K in keyof typeof BaseNodeType]: NodeType<`Default${Capitalize<(typeof BaseNodeType)[K]>}Node`>;
};

export type GroupID = string;

/* Nodes */
export type BaseNode<
  Base extends BaseNodeType,
  Node extends NodeType,
> = NodeObject<{
  baseType: Base;
  type: Node;
  id: `${Base}:${Node}:${string}`;
}>;

export interface RootNode<Node extends NodeType = typeof DefaultNode.ROOT>
  extends BaseNode<typeof BaseNodeType.ROOT, Node> {
  id: `${typeof BaseNodeType.ROOT}:${Node}:${Paper.Scheme.Id}`;
  paperID: Paper.Scheme.Id;
}

export interface ChildNode<Node extends NodeType = typeof DefaultNode.CHILD>
  extends BaseNode<typeof BaseNodeType.CHILD, Node> {
  id: `${typeof BaseNodeType.CHILD}:${Node}:${Paper.Scheme.Id}-from-${RootNode["id"]}`;
  paperID: Paper.Scheme.Id;
  parentID: RootNode["id"];
}

export interface GroupNode<Node extends NodeType = typeof DefaultNode.GROUP>
  extends BaseNode<typeof BaseNodeType.GROUP, Node> {
  id: `${typeof BaseNodeType.GROUP}:${Node}:${GroupID}-from-${RootNode["id"]}`;
  parentID: RootNode["id"];
  groupID: GroupID;
}

export type Node = GroupNode | RootNode | ChildNode;
export type NodeID = Node["id"];

/* Links */
export interface Link<
  SourceNode extends Node = Node,
  TargetNode extends Node = Node,
> extends LinkObject {
  id: `link-from-${SourceNode["id"]}-to-${TargetNode["id"]}`;
  sourceID: SourceNode["id"];
  targetID: TargetNode["id"];
  source: SourceNode;
  target: TargetNode;
}
export type LinkID = Link["id"];

export interface Data extends GraphData {
  nodes: Node[];
  links: Link[];
}
