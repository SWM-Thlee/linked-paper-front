import { Graph } from "../types";

export function isRootNode(
  node: Graph.Element.Node,
): node is Graph.Element.RootNode {
  return node.baseType === Graph.Element.BaseNodeType.ROOT;
}

export function isChildNode(
  node: Graph.Element.Node,
): node is Graph.Element.ChildNode {
  return node.baseType === Graph.Element.BaseNodeType.CHILD;
}

export function isGroupNode(
  node: Graph.Element.Node,
): node is Graph.Element.GroupNode {
  return node.baseType === Graph.Element.BaseNodeType.GROUP;
}
