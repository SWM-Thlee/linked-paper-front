import { Graph } from "../types";
import { DefaultNode } from "../types/element";

const { BaseNodeType } = Graph.Element;

export const defaultMobileNodeConfig: Graph.Config.Node = (() => {
  /* Default Config */
  const config: Graph.Config.Node = {
    collision: {
      [BaseNodeType.ROOT]: {
        default: 125,
      },
      [BaseNodeType.GROUP]: {
        default: 0,
      },
      [BaseNodeType.CHILD]: {
        default: 175,
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
        default: 180,
      },
      [BaseNodeType.GROUP]: {
        default: 0,
      },
      [BaseNodeType.CHILD]: {
        default: 230,
      },
    },
    link: {
      distance: {
        default: 0,
      },
      distanceFromCenter: {
        [BaseNodeType.ROOT]: {
          default: 180,
        },
        [BaseNodeType.GROUP]: {
          default: 0,
        },
        [BaseNodeType.CHILD]: {
          default: 215,
        },
      },
    },
    alphaDecay: 0.1,
    velocityDecay: 0.1,
  };

  /* Default Link Config */
  config.link.distance[DefaultNode.ROOT] = {};
  config.link.distance[DefaultNode.ROOT][DefaultNode.ROOT] = 5500;
  config.link.distance[DefaultNode.ROOT][DefaultNode.CHILD] = 450;

  return config;
})();

export const defaultMobileViewConfig: Graph.Config.View = {
  zoom: {
    min: 0.1,
    max: 1,
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