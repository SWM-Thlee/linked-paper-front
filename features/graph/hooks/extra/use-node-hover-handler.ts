import { useCallback, useEffect, useRef, useState } from "react";

import useSignature from "@/hooks/use-signature";

import { Graph } from "../../types";
import { GraphHandler } from "../default/use-graph-handler";

type Listener = (node: Graph.Element.Node) => void;
type Listeners = Map<string, Listener>;

export default function useNodeHoverHandler(handler: GraphHandler | null) {
  // Handler IDs
  const idHover = useSignature("NodeHoverHandler");
  const idHoverIn = useSignature("NodeHoverHandler-HoverIn");
  const idHoverOut = useSignature("NodeHoverHandler-HoverOut");

  const [nodeID, setNodeID] = useState<Graph.Element.NodeID | null>(null);
  const hoverIn = useRef<Listeners>(new Map());
  const hoverOut = useRef<Listeners>(new Map());

  const onHoverIn = useCallback((name: string, listener: Listener) => {
    hoverIn.current.set(name, listener);
  }, []);

  const onHoverOut = useCallback((name: string, listener: Listener) => {
    hoverOut.current.set(name, listener);
  }, []);

  const isHovered = useCallback(
    (id: Graph.Element.NodeID) => nodeID === id,
    [nodeID],
  );

  useEffect(() => {
    handler?.event.registerHandler(
      Graph.Event.Type.NODE_HOVER,
      (node) => setNodeID(node?.id ?? null),
      idHover,
    );
  }, [handler?.event, idHover]);

  useEffect(() => {
    handler?.event.registerHandler(
      Graph.Event.Type.NODE_HOVER,
      (node, prevNode) => {
        /* Hover In */
        if (node !== null && prevNode === null) {
          hoverIn.current.forEach((listener) => listener(node));
        }
      },
      idHoverIn,
    );
  }, [handler?.event, idHoverIn, hoverIn]);

  useEffect(() => {
    handler?.event.registerHandler(
      Graph.Event.Type.NODE_HOVER,
      (node, prevNode) => {
        /* Hover Out */
        if (node === null && prevNode !== null) {
          hoverOut.current.forEach((listener) => listener(prevNode));
        }
      },
      idHoverOut,
    );
  }, [handler?.event, idHoverOut, hoverOut]);

  return {
    isHovered,
    onHoverIn,
    onHoverOut,
  };
}
