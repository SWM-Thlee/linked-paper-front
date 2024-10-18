import { Graph } from "../types";
import { DefaultNode } from "../types/element";

const { BaseNodeType } = Graph.Element;

export const defaultNodeConfig: Graph.Config.Node = (() => {
  /* Default Config */
  const config: Graph.Config.Node = {
    collision: {
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
    charge: {
      [BaseNodeType.ROOT]: {
        default: -500,
      },
      [BaseNodeType.GROUP]: {
        default: 0,
      },
      [BaseNodeType.CHILD]: {
        default: 0,
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
          default: 160,
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
    velocityDecay: 0.1,
  };

  /* Default Link Config */
  config.link.distance[DefaultNode.ROOT] = {};
  config.link.distance[DefaultNode.ROOT][DefaultNode.ROOT] = 5500;
  config.link.distance[DefaultNode.ROOT][DefaultNode.CHILD] = 400;

  return config;
})();

export const defaultViewConfig: Graph.Config.View = {
  zoom: {
    min: 0.1,
    max: 5,
    delta: 0.05,
    focus: {
      duration: 750,
      adjustDurationByZoom: false,
    },
  },
  scroll: {
    deltaX: 30,
    deltaY: 30,
  },
  graph: {
    viewSimilarity: false,
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
};
