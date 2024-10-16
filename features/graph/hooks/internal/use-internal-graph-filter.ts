import { useCallback, useState } from "react";
import { Graph } from "../../types";

type NodeFilter = (node: Graph.Element.Node) => boolean;
type LinkFilter = (link: Graph.Element.Link) => boolean;
type NodeFilters = Map<string, NodeFilter>;
type LinkFilters = Map<string, LinkFilter>;

export default function useInternalGraphFilter() {
  const [nodeFilters, setNodeFilters] = useState<NodeFilters>(new Map());
  const [linkFilters, setLinkFilters] = useState<LinkFilters>(new Map());

  const onNodeFilter = useCallback(
    (filter: NodeFilter, name: string = "default") => {
      setNodeFilters((prevFilters) => {
        const newFilters = new Map(prevFilters);
        newFilters.set(name, filter);

        return newFilters;
      });
    },
    [],
  );

  const onLinkFilter = useCallback(
    (filter: LinkFilter, name: string = "default") => {
      setLinkFilters((prevFilters) => {
        const newFilters = new Map(prevFilters);
        newFilters.set(name, filter);

        return newFilters;
      });
    },
    [],
  );

  const handleNodeFilter = useCallback(
    (node: Graph.Element.Node) => {
      return nodeFilters.values().every((filter) => filter(node));
    },
    [nodeFilters],
  );

  const handleLinkFilter = useCallback(
    (link: Graph.Element.Link) => {
      return linkFilters.values().every((filter) => filter(link));
    },
    [linkFilters],
  );

  return { onNodeFilter, onLinkFilter, handleNodeFilter, handleLinkFilter };
}
