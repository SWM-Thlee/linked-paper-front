import { Flower } from "../types";

const { BaseNodeType, DefaultNode } = Flower.Graph;

export const defaultNodeConfig: Flower.Config.Node = (() => {
  /* Default Config */
  const config: Flower.Config.Node = {
    collision: {
      [BaseNodeType.ROOT]: {
        default: 225,
      },
      [BaseNodeType.GROUP]: {
        default: 0,
      },
      [BaseNodeType.CHILD]: {
        default: 100,
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
        default: -200,
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
        default: 200,
      },
    },
    link: {
      width: {
        default: 0,
      },
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
          default: 215,
        },
      },
    },
    alphaDecay: 0.1,
  };

  /* Default Link Config */
  config.link.width[DefaultNode.ROOT] = {};
  config.link.distance[DefaultNode.ROOT] = {};
  config.link.width[DefaultNode.ROOT][DefaultNode.ROOT] = 16;
  config.link.distance[DefaultNode.ROOT][DefaultNode.ROOT] = 500;

  return config;
})();

export const defaultViewConfig: Flower.Config.View = {
  zoom: {
    min: 0.1,
    max: 5,
    delta: 0.05,
    focus: {
      zoom: 0.75,
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
