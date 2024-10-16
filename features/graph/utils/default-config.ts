import { Graph } from "../types";

const { BaseNodeType, DefaultNode } = Graph.Element;

export const defaultNodeConfig: Graph.Config.Node = (() => {
  /* Default Config */
  const config: Graph.Config.Node = {
    collision: {
      [BaseNodeType.ROOT]: {
        default: 300,
      },
      [BaseNodeType.GROUP]: {
        default: 0,
      },
      [BaseNodeType.CHILD]: {
        default: 115,
      },
    },
    charge: {
      [BaseNodeType.ROOT]: {
        default: 200,
      },
      [BaseNodeType.GROUP]: {
        default: 0,
      },
      [BaseNodeType.CHILD]: {
        default: -100,
      },
    },
    radius: {
      [BaseNodeType.ROOT]: {
        default: 115,
      },
      [BaseNodeType.GROUP]: {
        default: 0,
      },
      [BaseNodeType.CHILD]: {
        default: 115,
      },
    },
    link: {
      distance: {
        default: 0,
      },
      distanceFromCenter: {
        [BaseNodeType.ROOT]: {
          default: 130,
        },
        [BaseNodeType.GROUP]: {
          default: 0,
        },
        [BaseNodeType.CHILD]: {
          default: 130,
        },
      },
    },
    alphaDecay: 0.1,
  };

  /* Default Link Config */
  config.link.distance[DefaultNode.ROOT] = {};
  config.link.distance[DefaultNode.ROOT][DefaultNode.ROOT] = 100;
  config.link.distance[DefaultNode.ROOT][DefaultNode.CHILD] = 200;

  return config;
})();

export const defaultViewConfig: Graph.Config.View = {
  zoom: {
    min: 0.1,
    max: 5,
    delta: 0.05,
    focus: {
      zoom: 0.8,
      duration: 750,
      adjustDurationByZoom: false,
    },
  },
  scroll: {
    deltaX: 30,
    deltaY: 30,
  },
  interaction: {
    drag: {
      node: true,
      view: true,
    },
    zoom: true,
    pointer: true,
    scroll: true,
  },
  panel: {
    // TODO
    centerPoint: false,
    linkOfAdjacentRootNodeOnly: true,
  },
};
