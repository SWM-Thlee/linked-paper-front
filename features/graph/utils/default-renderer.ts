import { Graph } from "../types";

export const defaultRenderer: Graph.Render.Renderer = {
  node: {
    default: () => {},
  },
  link: {
    default: () => {},
  },
};
