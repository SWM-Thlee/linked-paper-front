import { useCallback, useEffect, useRef, useState } from "react";
import { produce } from "immer";

import { Optional } from "@/utils/type-helper";
import { Graph } from "../../types";
import { makeExtensible } from "../../utils/graph";

type Node = Graph.Element.Node;
type NodeID = Graph.Element.NodeID;
type Link = Graph.Element.Link;
type LinkID = Graph.Element.LinkID;
type Data = Graph.Element.Data;

const initialData: Data = {
  links: [],
  nodes: [],
};

function isNodeID(elementID: NodeID | LinkID): elementID is NodeID {
  return !elementID.startsWith("link-from");
}

/**
 * **그래프 데이터를 저장하는 방법**
 *
 * - ForceGraph에서는 Graph Data에 직접 개입합니다. (좌표 수정 등)
 * - 따라서, Immutability를 중시하는 React Lifecycle과 매치되지 않습니다.
 * - Graph Data를 useRef만 이용하여 관리할 수도 있지만, Data에 대한 상태 관리가 불가능해집니다.
 * - 따라서, 고정적인 부분(노드의 기본 정보)을 React에서 관리하고, 변동되는 정보를 포함한 모든 데이터를 useRef로 관리합니다.
 * - 좌표 부분은 항상 동적인 데이터로 취급하므로, **upsert 시에만 적용되며 이후에는 고정되지 않습니다.**
 */
export default function useGraphData() {
  const [staticData, setStaticData] = useState<Data>(initialData);
  const graphDataRef = useRef(staticData);

  /* 데이터를 인덱싱합니다. */
  const [nodes, setNodes] = useState<Map<NodeID, Node>>(new Map());
  const [links, setLinks] = useState<Map<LinkID, Link>>(new Map());
  const [rels, setRels] = useState<Map<NodeID, Set<NodeID>>>(new Map());
  const [srcLinks, setSrcLinks] = useState<Map<NodeID, Set<Link>>>(new Map());
  const [tarLinks, setTarLinks] = useState<Map<NodeID, Set<Link>>>(new Map());

  /* Node의 동적 데이터를 일회성으로 적용하기 위해 담아놓는 공간입니다. */
  const dynamicPatchers = useRef<Map<NodeID, Optional<Node>>>(new Map());

  /* Upsert 이후에 적용해야 할 작업이 있을 때 사용합니다. */
  const upsertListeners = useRef<Map<NodeID, Set<(dynamic: Node) => void>>>(
    new Map(),
  );

  const has = useCallback(
    (elementID: NodeID | LinkID) => {
      if (isNodeID(elementID)) return nodes.has(elementID);
      return links.has(elementID);
    },
    [nodes, links],
  );

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const get = useCallback(
    <T extends NodeID | LinkID>(
      elementID: T,
    ): T extends NodeID ? Node | undefined : Link | undefined => {
      if (isNodeID(elementID)) return nodes.get(elementID) as any;
      return links.get(elementID) as any;
    },
    [nodes, links],
  );

  /**
   * 특정 Node의 Dynamic Data를 불러옵니다.
   *
   * **주의**: Index되어 있지 않기 때문에 필요할 때만 호출해야 합니다.
   */
  const getNodeDynamicData = useCallback((nodeID: NodeID) => {
    return graphDataRef.current.nodes.find((node) => node.id === nodeID);
  }, []);

  const getNodes = useCallback(
    (filterFn: (node: Node) => boolean) => {
      return [...nodes.values()].filter(filterFn);
    },
    [nodes],
  );

  const hasLinkFromSource = useCallback(
    (sourceNodeID: NodeID) => srcLinks.has(sourceNodeID),
    [srcLinks],
  );

  const hasLinkFromTarget = useCallback(
    (targetNodeID: NodeID) => tarLinks.has(targetNodeID),
    [tarLinks],
  );

  const getLinksFromSource = useCallback(
    (sourceNodeID: NodeID) => srcLinks.get(sourceNodeID),
    [srcLinks],
  );

  const getLinksFromTarget = useCallback(
    (targetNodeID: NodeID) => tarLinks.get(targetNodeID),
    [tarLinks],
  );

  const getConnectedNodes = useCallback(
    (nodeID: NodeID) => rels.get(nodeID),
    [rels],
  );

  const upsertNode = useCallback(
    (node: Node, onUpsert?: (dynamic: Node) => void) => {
      setStaticData((previousData) =>
        produce(previousData, (draft) => {
          draft.nodes = draft.nodes.filter(
            (prevNode) => node.id !== prevNode.id,
          );

          const { fx, fy, x, y, vx, vy, ...staticNodeData } = node;

          /* 동적인 데이터는 별도로 저장 후 Update Phase에서 적용합니다. */
          dynamicPatchers.current.set(node.id, {
            fx,
            fy,
            x,
            y,
            vx,
            vy,
          });

          /* Upsert된 이후 Listener를 호출합니다. */
          if (onUpsert) {
            upsertListeners.current.set(
              node.id,
              (upsertListeners.current.get(node.id) ?? new Set()).add(onUpsert),
            );
          }

          draft.nodes.push(staticNodeData);
        }),
      );
    },
    [],
  );

  const upsertLink = useCallback((link: Link) => {
    setStaticData((previousData) =>
      produce(previousData, (draft) => {
        draft.links = draft.links.filter((prevLink) => link.id !== prevLink.id);
        draft.links.push(link);
      }),
    );
  }, []);

  const removeNode = useCallback((nodeID: NodeID) => {
    setStaticData((previousData) =>
      produce(previousData, (draft) => {
        draft.nodes = draft.nodes.filter((prevNode) => prevNode.id !== nodeID);
        draft.links = draft.links.filter(
          ({ sourceID, targetID }) =>
            sourceID !== nodeID && targetID !== nodeID,
        );
      }),
    );
  }, []);

  const removeLink = useCallback((linkID: LinkID) => {
    setStaticData((previousData) =>
      produce(previousData, (draft) => {
        draft.links = draft.links.filter((prevLink) => prevLink.id !== linkID);
      }),
    );
  }, []);

  /* Graph Data가 변경될 때마다 Indexing을 업데이트합니다. */
  useEffect(() => {
    setNodes(
      staticData.nodes.reduce(
        (result, node) => result.set(node.id, node),
        new Map<NodeID, Node>(),
      ),
    );
  }, [staticData]);

  useEffect(() => {
    const nodeIndexes = new Map(
      graphDataRef.current.nodes.map((node) => [node.id, node]),
    );

    const staticNodes = nodes;
    const resultNodes = [...staticNodes.values()].map((prevNode) => {
      const dynamicData = dynamicPatchers.current.get(prevNode.id);

      return makeExtensible({
        ...(nodeIndexes.get(prevNode.id) ?? {}),
        ...(dynamicData ?? {}),
        ...prevNode,
      });
    });

    graphDataRef.current = makeExtensible({
      ...graphDataRef.current,
      nodes: resultNodes,
    });

    resultNodes.forEach((result) => {
      const dynamicData = dynamicPatchers.current.get(result.id);

      /* 적용 후 바로 삭제합니다. */
      if (dynamicData) dynamicPatchers.current.delete(result.id);

      if (upsertListeners.current.has(result.id)) {
        upsertListeners.current
          .get(result.id)
          ?.forEach((listener) => listener(result));

        upsertListeners.current.delete(result.id);
      }
    });
  }, [nodes]);

  useEffect(() => {
    setLinks(
      staticData.links.reduce(
        (result, link) => result.set(link.id, link),
        new Map<LinkID, Link>(),
      ),
    );

    setSrcLinks(
      staticData.links.reduce(
        (result, link) =>
          result.set(
            link.source.id,
            (result.get(link.source.id) ?? new Set()).add(link),
          ),
        new Map<NodeID, Set<Link>>(),
      ),
    );

    setTarLinks(
      staticData.links.reduce(
        (result, link) =>
          result.set(
            link.target.id,
            (result.get(link.target.id) ?? new Set()).add(link),
          ),
        new Map<NodeID, Set<Link>>(),
      ),
    );

    setRels(
      staticData.links.reduce((result, { source, target }) => {
        result.set(
          source.id,
          (result.get(source.id) ?? new Set()).add(target.id),
        );
        result.set(
          target.id,
          (result.get(target.id) ?? new Set()).add(source.id),
        );
        return result;
      }, new Map<NodeID, Set<NodeID>>()),
    );

    const patch = makeExtensible<Data>(staticData);

    const linkIndexes = new Map(
      graphDataRef.current.links.map((link) => [link.id, link]),
    );

    graphDataRef.current = makeExtensible({
      ...graphDataRef.current,
      links: patch.links.map((prevLink) => ({
        ...(linkIndexes.get(prevLink.id) ?? {}),
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
    getConnectedNodes,
    getNodeDynamicData,
    has,
    get,
    upsertNode,
    upsertLink,
    removeNode,
    removeLink,
  };
}
