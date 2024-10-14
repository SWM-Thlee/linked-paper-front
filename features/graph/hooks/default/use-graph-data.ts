import { useCallback, useEffect, useRef, useState } from "react";
import { produce } from "immer";

import { Graph } from "../../types";
import { makeExtensible } from "../../utils/graph";

const initialData: Graph.Element.Data = {
  links: [],
  nodes: [],
};

function isNodeArray(
  elements: Graph.Element.Node[] | Graph.Element.Link[],
): elements is Graph.Element.Node[] {
  return !!elements[0].baseType;
}

function isNodeIDArray(
  elementIDs: Graph.Element.NodeID[] | Graph.Element.LinkID[],
): elementIDs is Graph.Element.NodeID[] {
  return !elementIDs[0].startsWith("link-from");
}

function isNodeID(
  elementID: Graph.Element.NodeID | Graph.Element.LinkID,
): elementID is Graph.Element.NodeID {
  return !elementID.startsWith("link-from");
}

/**
 * **그래프 데이터를 저장하는 방법**
 *
 * - ForceGraph에서는 Graph Data에 직접 개입합니다. (좌표 수정 등)
 * - 따라서, Immutability를 중시하는 React Lifecycle과 매치되지 않습니다.
 * - Graph Data를 useRef만 이용하여 관리할 수도 있지만, Data에 대한 상태 관리가 불가능해집니다.
 * - 따라서, 고정적인 부분(노드의 기본 정보)을 React에서 관리하고, 변동되는 정보를 포함한 모든 데이터를 useRef로 관리합니다.
 */
export default function useGraphData() {
  const [staticData, setStaticData] = useState<Graph.Element.Data>(initialData);
  const graphDataRef = useRef(staticData);

  /* 데이터를 인덱싱합니다. */
  const [nodeIndexing, setNodeIndexing] = useState<
    Map<Graph.Element.NodeID, Graph.Element.Node>
  >(new Map());

  const [linkIndexing, setLinkIndexing] = useState<
    Map<Graph.Element.LinkID, Graph.Element.Link>
  >(new Map());

  const [sourceLinkIndexing, setSourceLinkIndexing] = useState<
    Map<Graph.Element.NodeID, Set<Graph.Element.Link>>
  >(new Map());

  const [targetLinkIndexing, setTargetLinkIndexing] = useState<
    Map<Graph.Element.NodeID, Set<Graph.Element.Link>>
  >(new Map());

  const has = useCallback(
    (elementID: Graph.Element.NodeID | Graph.Element.LinkID) => {
      if (isNodeID(elementID)) return nodeIndexing.has(elementID);
      return linkIndexing.has(elementID);
    },
    [nodeIndexing, linkIndexing],
  );

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const get = useCallback(
    <T extends Graph.Element.NodeID | Graph.Element.LinkID>(
      elementID: T,
    ): T extends Graph.Element.NodeID
      ? Graph.Element.Node | undefined
      : Graph.Element.Link | undefined => {
      if (isNodeID(elementID)) return nodeIndexing.get(elementID) as any;
      return linkIndexing.get(elementID) as any;
    },
    [nodeIndexing, linkIndexing],
  );

  const getNodes = useCallback(
    (filterFn: (node: Graph.Element.Node) => boolean) => {
      return [...nodeIndexing.values()].filter(filterFn);
    },
    [nodeIndexing],
  );

  const hasLinkFromSource = useCallback(
    (sourceNodeID: Graph.Element.NodeID) =>
      sourceLinkIndexing.has(sourceNodeID),
    [sourceLinkIndexing],
  );

  const hasLinkFromTarget = useCallback(
    (targetNodeID: Graph.Element.NodeID) =>
      targetLinkIndexing.has(targetNodeID),
    [targetLinkIndexing],
  );

  const getLinksFromSource = useCallback(
    (sourceNodeID: Graph.Element.NodeID) =>
      sourceLinkIndexing.get(sourceNodeID),
    [sourceLinkIndexing],
  );

  const getLinksFromTarget = useCallback(
    (targetNodeID: Graph.Element.NodeID) =>
      targetLinkIndexing.get(targetNodeID),
    [targetLinkIndexing],
  );

  const upsert = useCallback(
    (...elements: Graph.Element.Node[] | Graph.Element.Link[]) => {
      if (elements.length === 0) return;

      setStaticData((previousData) =>
        produce(previousData, (draft) => {
          if (isNodeArray(elements)) {
            /* element is Node */
            draft.nodes = draft.nodes.filter(
              (prevNode) =>
                !elements.find((currentNode) => currentNode.id === prevNode.id),
            );
            draft.nodes.push(...elements);
          } else {
            /* element is Link */
            draft.links = draft.links.filter(
              (prevLink) =>
                !elements.find((currentLink) => currentLink.id === prevLink.id),
            );
            draft.links.push(...elements);
          }
        }),
      );
    },
    [],
  );

  const remove = useCallback(
    (...elementIDs: Graph.Element.LinkID[] | Graph.Element.NodeID[]) => {
      if (elementIDs.length === 0) return;

      const index = new Set(elementIDs);

      if (isNodeIDArray(elementIDs)) {
        setStaticData((previousData) =>
          produce(previousData, (draft) => {
            if (isNodeIDArray(elementIDs)) {
              /* elementID is NodeID */
              draft.nodes = draft.nodes.filter((node) => !index.has(node.id));
              draft.links = draft.links.filter(
                ({ sourceID, targetID }) =>
                  !index.has(sourceID) && !index.has(targetID),
              );
            } else {
              /* elementID is LinkID */
              draft.links = draft.links.filter((link) => !index.has(link.id));
            }
          }),
        );
      }
    },
    [],
  );

  /* Graph Data가 변경될 때마다 Indexing을 업데이트합니다. */
  useEffect(() => {
    setNodeIndexing(
      staticData.nodes.reduce(
        (result, node) => result.set(node.id, node),
        new Map<Graph.Element.NodeID, Graph.Element.Node>(),
      ),
    );

    setLinkIndexing(
      staticData.links.reduce(
        (result, link) => result.set(link.id, link),
        new Map<Graph.Element.LinkID, Graph.Element.Link>(),
      ),
    );

    setSourceLinkIndexing(
      staticData.links.reduce(
        (result, link) =>
          result.set(
            link.source.id,
            (result.get(link.source.id) ?? new Set()).add(link),
          ),
        new Map<Graph.Element.NodeID, Set<Graph.Element.Link>>(),
      ),
    );

    setTargetLinkIndexing(
      staticData.links.reduce<
        Map<Graph.Element.NodeID, Set<Graph.Element.Link>>
      >(
        (result, link) =>
          result.set(
            link.target.id,
            (result.get(link.target.id) ?? new Set()).add(link),
          ),
        new Map(),
      ),
    );
  }, [staticData]);

  /* Static Data를 현재 운용 중인 Graph Data에 적용합니다. */
  useEffect(() => {
    const patch = makeExtensible<Graph.Element.Data>(staticData);
    const nodes = new Map(
      graphDataRef.current.nodes.map((node) => [node.id, node]),
    );
    const links = new Map(
      graphDataRef.current.links.map((link) => [link.id, link]),
    );

    graphDataRef.current = makeExtensible({
      nodes: patch.nodes.map((prevNode) => ({
        ...(nodes.get(prevNode.id) ?? {}),
        ...prevNode,
      })),
      links: patch.links.map((prevLink) => ({
        ...(links.get(prevLink.id) ?? {}),
        ...prevLink,
      })),
    });
  }, [staticData]);

  return {
    data: graphDataRef.current,
    getNodes,
    hasLinkFromSource,
    hasLinkFromTarget,
    getLinksFromSource,
    getLinksFromTarget,
    has,
    get,
    upsert,
    remove,
  };
}
