import { useCallback, useEffect, useMemo, useState } from "react";

import usePrevious from "@/hooks/use-previous";
import { Flower } from "../../types";

type Listener = (nodeID: Flower.Graph.NodeID) => void;
type Listeners = Map<string, Listener>;

export default function useNodeSelectionHandler() {
  const [nodeIDs, setNodeIDs] = useState<Set<Flower.Graph.NodeID>>(new Set());
  const { setPrevious, value: prevNodeIDs } =
    usePrevious<Set<Flower.Graph.NodeID>>();

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
    (nodeID: Flower.Graph.NodeID) => nodeIDs.has(nodeID),
    [nodeIDs],
  );

  const selectedOne = useMemo(() => {
    if (nodeIDs.size !== 1) return null;
    return [...nodeIDs][0];
  }, [nodeIDs]);

  const selected = useMemo(() => nodeIDs, [nodeIDs]);

  const select = useCallback(
    (nodeID: Flower.Graph.NodeID, only?: boolean) => {
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
    (nodeID?: Flower.Graph.NodeID) => {
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
    if (prevNodeIDs?.isSubsetOf(nodeIDs) && prevNodeIDs.isSupersetOf(nodeIDs))
      return;

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
