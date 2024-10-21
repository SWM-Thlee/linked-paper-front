import { useCallback, useRef } from "react";
import { ForceGraphMethods } from "react-force-graph-2d";
import * as d3 from "d3-force";

import { Graph } from "../../types";

type InternalGraphViewConfiguration = ForceGraphMethods<
  Graph.Element.Node,
  Graph.Element.Link
>;

type LinkConfigInstance = d3.ForceLink<Graph.Element.Node, Graph.Element.Link>;
type CollideConfigInstance = d3.ForceCollide<Graph.Element.Node>;
type ChargeConfigInstance = d3.ForceManyBody<Graph.Element.Node>;
type CenterConfigInstance = d3.ForceCenter<Graph.Element.Node>;

type ApplyConfigFn = <T>(
  applyConfigFn: (config: InternalGraphViewConfiguration) => T,
) => T | null;

type ConfigFn<T> = (applyFn: (config: T) => T, name?: string) => void;

export default function useInternalGraphConfig() {
  const internalRef = useRef<InternalGraphViewConfiguration>();

  const applyConfig: ApplyConfigFn = useCallback((applyConfigFn) => {
    return internalRef.current ? applyConfigFn(internalRef.current) : null;
  }, []);

  const linkConfig: ConfigFn<LinkConfigInstance> = useCallback(
    (applyFn, name = "link") =>
      applyConfig((config) =>
        config.d3Force(name, applyFn(d3.forceLink()).iterations(20)),
      ),
    [applyConfig],
  );

  const collideConfig: ConfigFn<CollideConfigInstance> = useCallback(
    (applyFn, name = "collide") =>
      applyConfig((config) =>
        config.d3Force(name, applyFn(d3.forceCollide()).iterations(20)),
      ),
    [applyConfig],
  );

  const chargeConfig: ConfigFn<ChargeConfigInstance> = useCallback(
    (applyFn, name = "charge") =>
      applyConfig((config) =>
        config.d3Force(name, applyFn(d3.forceManyBody())),
      ),
    [applyConfig],
  );

  const centerConfig: ConfigFn<CenterConfigInstance> = useCallback(
    (applyFn, name = "center") => {
      applyConfig((config) => config.d3Force(name, applyFn(d3.forceCenter())));
    },
    [applyConfig],
  );

  return {
    internalRef,
    applyConfig,
    linkConfig,
    collideConfig,
    chargeConfig,
    centerConfig,
  };
}
