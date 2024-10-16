import { Graph } from "../types";

function resolveScale(scale: number, option?: Graph.Render.ScaleOption) {
  if (!option) return 1;

  let resolvedScale = scale;

  if (option === true) return resolvedScale;

  if (option.min !== undefined)
    resolvedScale = Math.max(option.min, resolvedScale);

  if (option.max !== undefined)
    resolvedScale = Math.min(option.max, resolvedScale);

  return resolvedScale;
}

function resolveDetermination(
  color: string,
  option?: Graph.Render.DetermineOption,
) {
  return option?.color ?? color;
}

function resolveLocation(
  pos: {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    resolvedScale: number;
  },
  option?: Graph.Render.LinkTextLocateOption,
) {
  /* option이 존재하지 않을 경우 중앙에 위치시킵니다. */
  if (!option) {
    return {
      midX: (pos.sourceX + pos.targetX) / 2,
      midY: (pos.sourceY + pos.targetY) / 2,
    };
  }

  const linkLength = Math.hypot(
    pos.targetX - pos.sourceX,
    pos.targetY - pos.sourceY,
  );

  let distance = Math.max(
    0,
    option.from === "source"
      ? option.distance / pos.resolvedScale
      : linkLength - option.distance / pos.resolvedScale,
  );
  distance = Math.min(distance, linkLength);

  const midX =
    pos.sourceX + ((pos.targetX - pos.sourceX) / linkLength) * distance;
  const midY =
    pos.sourceY + ((pos.targetY - pos.sourceY) / linkLength) * distance;

  return { midX, midY };
}

export const internalDrawNodeCircle: Graph.Render.DrawNodeCircleResolver = ({
  ctx,
  node,
  radius,
  rawScale,
  style,
  scale,
  determine,
}) => {
  const x = node.x!;
  const y = node.y!;
  const resolvedScale = resolveScale(rawScale, scale);

  ctx.save();

  ctx.fillStyle = resolveDetermination(style.bgColor, determine);

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fill();

  if (!determine) {
    ctx.strokeStyle = style.borderColor;
    ctx.lineWidth = (style.borderWidth ?? 0) / resolvedScale;
    if (style.borderWidth > 0) ctx.stroke();
  }

  ctx.restore();
};

export const internalDrawLinkText: Graph.Render.DrawLinkTextResolver = ({
  ctx,
  height,
  link: { source, target },
  radius,
  style,
  text,
  rawScale,
  scale,
  locate,
  determine,
}) => {
  const sourceRadius =
    radius[source.baseType]?.[source.type] ?? radius[source.baseType].default;

  const targetRadius =
    radius[target.baseType]?.[source.type] ?? radius[target.baseType].default;

  const x1 = source.x!;
  const y1 = source.y!;
  const x2 = target.x!;
  const y2 = target.y!;

  let angle = Math.atan2(y2 - y1, x2 - x1);
  const resolvedScale = resolveScale(rawScale, scale);

  const sourceX = x1 + Math.cos(angle) * sourceRadius;
  const sourceY = y1 + Math.sin(angle) * sourceRadius;
  const targetX = x2 - Math.cos(angle) * targetRadius;
  const targetY = y2 - Math.sin(angle) * targetRadius;

  const { midX, midY } = resolveLocation(
    {
      sourceX,
      sourceY,
      targetX,
      targetY,
      resolvedScale,
    },
    locate,
  );

  /* 사용자가 보았을 때 뒤집어져 보이는 경우 180도 회전합니다. */
  if (angle > Math.PI / 2 || angle < -Math.PI / 2) {
    angle += Math.PI;
  }

  const padding = 7 / resolvedScale;

  ctx.save();

  ctx.strokeStyle = resolveDetermination(style.bgColor, determine);
  ctx.lineWidth = style.borderWidth;

  ctx.translate(midX, midY);
  ctx.rotate(angle);

  ctx.font = style.fontWith({
    scale: resolvedScale,
  });

  const { width } = ctx.measureText(text);

  ctx.fillStyle = resolveDetermination(style.bgColor, determine);

  ctx.fillRect(
    -(width / 2) - padding,
    -(height / 2) - padding,
    width + padding * 2,
    height + padding * 2,
  );

  ctx.beginPath();
  ctx.arc(-width / 2 - padding, 0, height / 2 + padding, 0, 2 * Math.PI, false);
  ctx.arc(width / 2 + padding, 0, height / 2 + padding, 0, 2 * Math.PI, false);
  ctx.fill();

  /* Text는 영역을 결정할 때 방해 요소가 됩니다. */
  if (!determine) {
    ctx.fillStyle = style.textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(text, 0, 0);
  }

  ctx.restore();
};

export const internalDrawLink: Graph.Render.DrawLinkResolver = ({
  ctx,
  style,
  link: { source, target },
  radius,
  rawScale,
  scale,
  determine,
}) => {
  const sourceRadius =
    radius[source.baseType]?.[source.type] ?? radius[source.baseType].default;

  const targetRadius =
    radius[target.baseType]?.[source.type] ?? radius[target.baseType].default;

  const x1 = source.x!;
  const y1 = source.y!;
  const x2 = target.x!;
  const y2 = target.y!;

  const angle = Math.atan2(y2 - y1, x2 - x1);
  const sourceX = x1 + Math.cos(angle) * sourceRadius;
  const sourceY = y1 + Math.sin(angle) * sourceRadius;
  const targetX = x2 - Math.cos(angle) * targetRadius;
  const targetY = y2 - Math.sin(angle) * targetRadius;

  const resolvedScale = resolveScale(rawScale, scale);

  ctx.save();

  ctx.strokeStyle = resolveDetermination(style.bgColor, determine);
  ctx.lineWidth = style.borderWidth / resolvedScale;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(sourceX, sourceY);
  ctx.lineTo(targetX, targetY);
  ctx.stroke();

  ctx.restore();
};

/**
 * 특정 길이에 맞추어 문장을 분리합니다.
 */
export function wrapText({
  ctx,
  text,
  maxWidth,
  maxLines,
}: {
  ctx: CanvasRenderingContext2D;
  text: string;
  maxWidth: number;
  maxLines?: number;
}) {
  // 1. 빈 칸을 기준으로 단어로 나눕니다.
  const words = text.split(" ");

  // 2. Max Width를 넘어가면 문장을 분리합니다.
  const result = words.reduce<string[]>((total, word) => {
    const sentence = `${total[total.length - 1] ?? ""} ${word}`.trim();
    const { width } = ctx.measureText(sentence);

    return width > maxWidth
      ? [...total, word]
      : [...total.slice(0, -1), sentence];
  }, []);

  // 3. 라인의 개수가 정해져 있는 경우 해당 라인까지만 반환합니다.
  if (maxLines && result.length >= maxLines) {
    const [lastLine, ...lines] = result.slice(0, maxLines).reverse();
    return [...lines.reverse(), `${lastLine} (...)`];
  }

  return result;
}

export const internalDrawNodeText: Graph.Render.DrawNodeTextResolver = ({
  ctx,
  height,
  node,
  rawScale,
  style,
  text,
  offsetY,
  maxLines,
  maxWidth,
  scale,
  determine,
}) => {
  const x = node.x!;
  const y = node.y!;
  const resolvedScale = resolveScale(rawScale, scale);

  ctx.save();

  if (!determine) {
    ctx.fillStyle = style.textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = style.fontWith({
      scale: resolvedScale,
    });

    if (!maxWidth) {
      ctx.fillText(text, x, y + (offsetY ?? 0));
      ctx.restore();
      return;
    }

    const sentences = wrapText({
      ctx,
      text,
      maxWidth,
      maxLines,
    });

    const resolvedOffsetY =
      (offsetY ?? 0) - (height / 2) * (sentences.length - 1);

    sentences.forEach((sentence, i) =>
      ctx.fillText(sentence, x, y + height * i + resolvedOffsetY),
    );
  }

  ctx.restore();
};
