import { Paper } from "@/features/paper/types";
import { Graph } from "../types";

/**
 * Graph Data 내에 포함되는 Node는 **Mutable**하므로, Object의 기존 설정을 수정해야 합니다.
 */
export function makeExtensible<T>(data: T) {
  return JSON.parse(JSON.stringify(data)) as T;
}

export function createRootNode(
  paperID: Paper.Scheme.Id,
  visible = true,
): Graph.Element.RootNode {
  return makeExtensible({
    baseType: Graph.Element.BaseNodeType.ROOT,
    type: Graph.Element.DefaultNode.ROOT,
    id: `root:${Graph.Element.DefaultNode.ROOT}:${paperID}`,
    paperID,
    visible,
  } satisfies Graph.Element.RootNode);
}

export function createChildNode(
  paperID: Paper.Scheme.Id,
  parentID: Graph.Element.RootNode["id"],
  visible = true,
): Graph.Element.ChildNode {
  return makeExtensible({
    baseType: Graph.Element.BaseNodeType.CHILD,
    type: Graph.Element.DefaultNode.CHILD,
    id: `child:${Graph.Element.DefaultNode.CHILD}:${paperID}-from-${parentID}`,
    paperID,
    parentID,
    visible,
  } satisfies Graph.Element.ChildNode);
}

export function createLink(
  source: Graph.Element.Node,
  target: Graph.Element.Node,
): Graph.Element.Link {
  return makeExtensible({
    id: `link-from-${source.id}-to-${target.id}`,
    sourceID: source.id,
    targetID: target.id,
    source,
    target,
  } satisfies Graph.Element.Link);
}

export function isLinkBetweenRoots(link: Graph.Element.Link) {
  return (
    link.source.type === Graph.Element.DefaultNode.ROOT &&
    link.target.type === Graph.Element.DefaultNode.ROOT
  );
}
