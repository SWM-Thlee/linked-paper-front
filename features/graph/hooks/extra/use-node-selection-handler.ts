import { useCallback, useEffect, useMemo, useState } from "react";
import isEqual from "react-fast-compare";

import usePrevious from "@/hooks/use-previous";
import { Graph } from "../../types";

type Listener = (nodeID: Graph.Element.NodeID) => void;
type Listeners = Map<string, Listener>;

export default function useNodeSelectionHandler() {
  const [nodeIDs, setNodeIDs] = useState<Set<Graph.Element.NodeID>>(new Set());
  const { setPrevious, value: prevNodeIDs } =
    usePrevious<Set<Graph.Element.NodeID>>();

  const [selectListeners, setSelectListeners] = useState<Listeners>(new Map());
  const [unselectListeners, setUnselectListeners] = useState<Listeners>(
    new Map(),
  );

  const onUnselect = useCallback((name: string, listener: Listener) => {
    setUnselectListeners((listeners) => {
      const newListeners = new Map(listeners);
      newListeners.set(name, listener);

      return newListeners;
    });
  }, []);

  const onSelect = useCallback((name: string, listener: Listener) => {
    setSelectListeners((listeners) => {
      const newListeners = new Map(listeners);
      newListeners.set(name, listener);

      return newListeners;
    });
  }, []);

  const isSelected = useCallback(
    (nodeID: Graph.Element.NodeID) => nodeIDs.has(nodeID),
    [nodeIDs],
  );

  const selectedOne = useMemo(() => {
    if (nodeIDs.size !== 1) return null;
    return [...nodeIDs][0];
  }, [nodeIDs]);

  const selected = useMemo(() => nodeIDs, [nodeIDs]);

  const select = useCallback(
    (nodeID: Graph.Element.NodeID, only?: boolean) => {
      if (isSelected(nodeID)) return false;

      setPrevious(nodeIDs);
      setNodeIDs((oldNodes) => {
        const newNodeIDs = new Set(only ? [] : oldNodes);
        newNodeIDs.add(nodeID);

        return newNodeIDs;
      });

      return true;
    },
    [isSelected, nodeIDs, setPrevious],
  );

  const unselect = useCallback(
    (nodeID?: Graph.Element.NodeID) => {
      // Node를 명시하지 않은 경우 모두 해제합니다.
      if (!nodeID) {
        setPrevious(nodeIDs);
        setNodeIDs(new Set());
        return true;
      }

      if (!isSelected(nodeID)) return false;

      setPrevious(nodeIDs);
      setNodeIDs((oldNodes) => {
        const newNodeIDs = new Set(oldNodes);
        newNodeIDs.delete(nodeID);

        return newNodeIDs;
      });

      return true;
    },
    [isSelected, nodeIDs, setPrevious],
  );

  /* Selection 구성의 변화를 체크합니다. */
  useEffect(() => {
    if (isEqual(prevNodeIDs, nodeIDs)) return;

    // Selected Node에 대해 onSelect Listener 호출
    nodeIDs.forEach((nodeID) => {
      if (prevNodeIDs?.has(nodeID)) return;
      selectListeners.forEach((listener) => listener(nodeID));
    });

    // Unselected Node에 대해 onSelect Listener 호출
    prevNodeIDs?.forEach((nodeID) => {
      if (nodeIDs.has(nodeID)) return;
      unselectListeners.forEach((listener) => listener(nodeID));
    });

    setPrevious(nodeIDs);
  }, [nodeIDs, setPrevious, selectListeners, unselectListeners, prevNodeIDs]);

  return {
    onSelect,
    onUnselect,
    select,
    unselect,
    selected,
    selectedOne,
    isSelected,
  };
}
