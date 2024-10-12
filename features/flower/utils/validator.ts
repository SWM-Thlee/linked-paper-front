import { Flower } from "../types";

export function isRootNode(
  node: Flower.Graph.Node,
): node is Flower.Graph.RootNode {
  return node.baseType === Flower.Graph.BaseNodeType.ROOT;
}

export function isChildNode(
  node: Flower.Graph.Node,
): node is Flower.Graph.ChildNode {
  return node.baseType === Flower.Graph.BaseNodeType.CHILD;
}

export function isGroupNode(
  node: Flower.Graph.Node,
): node is Flower.Graph.GroupNode {
  return node.baseType === Flower.Graph.BaseNodeType.GROUP;
}
