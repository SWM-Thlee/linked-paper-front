import { useCallback, useEffect, useState } from "react";

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

  const [nodeOnHover, setNodeOnHover] = useState<Graph.Element.Node | null>(
    null,
  );
  const [hoverIn, setHoverIn] = useState<Listeners>(new Map());
  const [hoverOut, setHoverOut] = useState<Listeners>(new Map());

  const registerHoverInListener = useCallback(
    (name: string, listener: Listener) => {
      setHoverIn((listeners) => {
        const newListeners = new Map(listeners);
        newListeners.set(name, listener);

        return newListeners;
      });
    },
    [],
  );

  const registerHoverOutListener = useCallback(
    (name: string, listener: Listener) => {
      setHoverOut((listeners) => {
        const newListeners = new Map(listeners);
        newListeners.set(name, listener);

        return newListeners;
      });
    },
    [],
  );

  useEffect(() => {
    handler?.event.registerHandler(
      Graph.Event.Type.NODE_HOVER,
      (node) => setNodeOnHover(node),
      idHover,
    );
  }, [handler?.event, idHover]);

  useEffect(() => {
    handler?.event.registerHandler(
      Graph.Event.Type.NODE_HOVER,
      (node, prevNode) => {
        /* Hover In */
        if (node !== null && prevNode === null) {
          hoverIn.forEach((listener) => listener(node));
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
          hoverOut.forEach((listener) => listener(prevNode));
        }
      },
      idHoverOut,
    );
  }, [handler?.event, idHoverOut, hoverOut]);

  return {
    nodeOnHover,
    registerHoverInListener,
    registerHoverOutListener,
  };
}
