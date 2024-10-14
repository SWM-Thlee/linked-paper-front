import { Paper } from "@/features/paper/types";
import { Flower } from "../types";

/**
 * Graph Data 내에 포함되는 Node는 **Mutable**하므로, Object의 기존 설정을 수정해야 합니다.
 */
export function makeExtensible<T>(data: T) {
  return JSON.parse(JSON.stringify(data)) as T;
}

export function createRootNode(
  paperID: Paper.Scheme.Id,
  visible = true,
): Flower.Graph.RootNode {
  return makeExtensible({
    baseType: Flower.Graph.BaseNodeType.ROOT,
    type: Flower.Graph.DefaultNode.ROOT,
    id: `root:${Flower.Graph.DefaultNode.ROOT}:${paperID}`,
    paperID,
    visible,
  } satisfies Flower.Graph.RootNode);
}

export function createChildNode(
  paperID: Paper.Scheme.Id,
  parentID: Flower.Graph.RootNode["id"],
  visible = true,
): Flower.Graph.ChildNode {
  return makeExtensible({
    baseType: Flower.Graph.BaseNodeType.CHILD,
    type: Flower.Graph.DefaultNode.CHILD,
    id: `child:${Flower.Graph.DefaultNode.CHILD}:${paperID}-from-${parentID}`,
    paperID,
    parentID,
    visible,
  } satisfies Flower.Graph.ChildNode);
}

export function createLink(
  source: Flower.Graph.Node,
  target: Flower.Graph.Node,
): Flower.Graph.Link {
  return makeExtensible({
    id: `link-from-${source.id}-to-${target.id}`,
    sourceID: source.id,
    targetID: target.id,
    source,
    target,
  } satisfies Flower.Graph.Link);
}

export function isLinkBetweenRoots(link: Flower.Graph.Link) {
  return (
    link.source.type === Flower.Graph.DefaultNode.ROOT &&
    link.target.type === Flower.Graph.DefaultNode.ROOT
  );
}
