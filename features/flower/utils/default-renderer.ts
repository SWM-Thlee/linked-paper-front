import { Flower } from "../types";
import { drawCircle } from "./draw";

export const defaultAreaHandler: (
  radius: number,
) => Flower.Render.DetermineArea = (radius: number) => (node, color, ctx) => {
  ctx.fillStyle = color;

  drawCircle({
    ctx,
    x: node.x!,
    y: node.y!,
    radius,
  });
};

export const defaultRenderer: Flower.Render.Renderer = {
  node: {
    default: () => {},
  },
  area: {
    default: defaultAreaHandler(0),
  },
  link: {
    default: () => {},
  },
};
