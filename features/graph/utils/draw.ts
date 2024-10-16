import { CanvasVariant } from "@/utils/style/canvas-variants";

export type DrawCircleOption = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  stroke?: number;
};

export function drawCircle({ ctx, x, y, radius, stroke }: DrawCircleOption) {
  ctx.lineWidth = stroke ?? 0;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fill();

  if (stroke) ctx.stroke();
}

export function drawLinkText({
  ctx,
  style,
  scale,
  text,
  height,
  sourceX,
  targetX,
  sourceY,
  targetY,
}: {
  ctx: CanvasRenderingContext2D;
  style: CanvasVariant;
  scale: number;
  text: string;
  height: number;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}) {
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  let angle = Math.atan2(targetY - sourceY, targetX - sourceX);

  /* 사용자가 보았을 때 뒤집어져 보이는 경우 180도 회전합니다. */
  if (angle > Math.PI / 2 || angle < -Math.PI / 2) {
    angle += Math.PI;
  }

  const padding = 5;

  ctx.save();

  ctx.translate(midX, midY);
  ctx.rotate(angle);

  ctx.font = style.fontStyleWith({
    scale,
  });

  const { width } = ctx.measureText(text);

  ctx.fillStyle = style.bgColorStyle;

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

  ctx.strokeStyle = style.bgColorStyle;
  ctx.fillStyle = style.textColorStyle;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(text, 0, 0);
  ctx.restore();
}

export function drawLink({
  ctx,
  sourceX,
  targetX,
  sourceY,
  targetY,
}: {
  ctx: CanvasRenderingContext2D;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(sourceX, sourceY);
  ctx.lineTo(targetX, targetY);
  ctx.stroke();
  ctx.restore();
}

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

export function drawWrappedText({
  ctx,
  text,
  maxWidth,
  maxLines,
  x,
  y,
  lineHeight,
  defaultOffsetY,
}: {
  ctx: CanvasRenderingContext2D;
  text: string;
  maxWidth: number;
  maxLines?: number;
  x: number;
  y: number;
  lineHeight: number;
  defaultOffsetY?: number;
}) {
  const sentences = wrapText({
    ctx,
    text,
    maxWidth,
    maxLines,
  });

  const offsetY = defaultOffsetY ?? -(lineHeight / 2) * (sentences.length - 1);

  sentences.forEach((sentence, i) =>
    ctx.fillText(sentence, x, y + lineHeight * i + offsetY),
  );
}

export function limitRange(x: number, min: number, max: number) {
  return Math.min(max, Math.max(x, min));
}
