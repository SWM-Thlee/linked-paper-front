import { useCallback, useRef } from "react";
import { ForceGraphMethods } from "react-force-graph-2d";
import * as d3 from "d3-force";

import { Flower } from "../../types";

type InternalGraphViewConfiguration = ForceGraphMethods<
  Flower.Graph.Node,
  Flower.Graph.Link
>;

type LinkConfigInstance = d3.ForceLink<Flower.Graph.Node, Flower.Graph.Link>;
type CollideConfigInstance = d3.ForceCollide<Flower.Graph.Node>;
type ChargeConfigInstance = d3.ForceManyBody<Flower.Graph.Node>;

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
      applyConfig((config) => config.d3Force(name, applyFn(d3.forceLink()))),
    [applyConfig],
  );

  const collideConfig: ConfigFn<CollideConfigInstance> = useCallback(
    (applyFn, name = "collide") =>
      applyConfig((config) => config.d3Force(name, applyFn(d3.forceCollide()))),
    [applyConfig],
  );

  const chargeConfig: ConfigFn<ChargeConfigInstance> = useCallback(
    (applyFn, name = "charge") =>
      applyConfig((config) =>
        config.d3Force(name, applyFn(d3.forceManyBody())),
      ),
    [applyConfig],
  );

  return {
    internalRef,
    applyConfig,
    linkConfig,
    collideConfig,
    chargeConfig,
  };
}
