import { Flower } from "../types";

const { BaseNodeType } = Flower.Graph;

export function focusArea(
  node: Flower.Graph.Node,
): (candidate: Flower.Graph.Node) => boolean {
  return (candidate) => {
    if (!candidate.visible) return false;

    // Root Node
    if (node.baseType === BaseNodeType.ROOT) {
      return (
        node.id ===
        (candidate.baseType === BaseNodeType.ROOT
          ? candidate.id
          : candidate.parentID)
      );
    }

    // Child Node
    return (
      node.parentID ===
      (candidate.baseType === BaseNodeType.ROOT
        ? candidate.id
        : candidate.parentID)
    );
  };
}
