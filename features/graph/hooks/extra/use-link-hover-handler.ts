import { useCallback, useEffect, useRef, useState } from "react";

import useSignature from "@/hooks/use-signature";
import { Graph } from "../../types";
import { GraphHandler } from "../default/use-graph-handler";

type Listener = (node: Graph.Element.Link) => void;
type Listeners = Map<string, Listener>;

export default function useLinkHoverHandler(handler: GraphHandler | null) {
  // Handler IDs
  const idHover = useSignature("LinkHoverHandler");
  const idHoverIn = useSignature("LinkHoverHandler-HoverIn");
  const idHoverOut = useSignature("LinkHoverHandler-HoverOut");

  const [linkID, setLinkID] = useState<Graph.Element.LinkID | null>(null);
  const hoverIn = useRef<Listeners>(new Map());
  const hoverOut = useRef<Listeners>(new Map());

  const onHoverIn = useCallback((name: string, listener: Listener) => {
    hoverIn.current.set(name, listener);
  }, []);

  const onHoverOut = useCallback((name: string, listener: Listener) => {
    hoverOut.current.set(name, listener);
  }, []);

  const isHovered = useCallback(
    (id: Graph.Element.LinkID) => linkID === id,
    [linkID],
  );

  useEffect(() => {
    handler?.event.registerHandler(
      Graph.Event.Type.LINK_HOVER,
      (link) => setLinkID(link?.id ?? null),
      idHover,
    );
  }, [handler?.event, idHover]);

  useEffect(() => {
    handler?.event.registerHandler(
      Graph.Event.Type.LINK_HOVER,
      (link, prevLink) => {
        /* Hover In */
        if (link !== null && prevLink === null) {
          hoverIn.current.forEach((listener) => listener(link));
        }
      },
      idHoverIn,
    );
  }, [handler?.event, idHoverIn, hoverIn]);

  useEffect(() => {
    handler?.event.registerHandler(
      Graph.Event.Type.LINK_HOVER,
      (link, prevLink) => {
        /* Hover Out */
        if (link === null && prevLink !== null) {
          hoverOut.current.forEach((listener) => listener(prevLink));
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
