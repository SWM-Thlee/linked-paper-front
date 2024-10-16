import { Theme } from "@/features/theme/types";

export type CSSVariants = {
  [component: string]: { [variant: string]: string[] };
};

export type CanvasVariant = {
  bgColorStyle: string;
  textColorStyle: string;
  borderColorStyle: string;
  fontStyle: string;
  fontStyleWith: ({ scale }: { scale?: number }) => string;
};

export type CanvasVariants<T extends CSSVariants> = {
  [component in keyof T]: {
    [variant in keyof T[component]]: CanvasVariant;
  };
};

/**
 * CSS 기반 Style로부터 순수 Style 값을 추출합니다.
 *
 * **주의**: 해당 함수를 호출할 때마다 실제 DOM이 수정되므로,
 * 성능 이슈를 방지하기 위해서는 결과값에 대해 적절히 메모이제이션을 수행해야 합니다.
 */
export function extractStyleFromCSS({
  classNames,
  properties,

  // 특정 Container 내의 Style을 고려하기 위해 사용됩니다. (기본 값은 <body>입니다.)
  targetContainer = document.body,
}: {
  classNames: string[];
  properties: string[];
  targetContainer?: HTMLElement;
}): string[] {
  // 1. 실제 DOM의 Style을 구하기 위해 임시로 추가합니다.
  const element = document.createElement("div");

  element.className = classNames.join(" ");
  targetContainer.appendChild(element);

  // 2. Style을 추출 후 다시 제거합니다.
  const style = properties.map((prop) =>
    getComputedStyle(element).getPropertyValue(prop),
  );

  targetContainer.removeChild(element);
  return style;
}

function resolveCSSByTheme(theme: Theme.Preset.Type, rawStyle: string[]) {
  if (theme === Theme.Preset.LIGHT)
    return rawStyle.filter(
      (clsx) => clsx.includes("light") || !clsx.includes("dark"),
    );

  if (theme === Theme.Preset.DARK)
    return rawStyle.filter(
      (clsx) => clsx.includes("dark") || !clsx.includes("light"),
    );

  return rawStyle;
}

/**
 * Graph에 필요한 컴포넌트의 Style을 정의합니다.
 *
 * **주의**: Class는 반드시 한 문자열에 하나씩 작성되어야 합니다.
 */
export default function cv<T extends CSSVariants>(
  theme: Theme.Preset.Type,
  variants: T,
): CanvasVariants<T> {
  return Object.entries(variants).reduce<CanvasVariants<T>>(
    (resultOfVariants, [variant, components]) => ({
      ...resultOfVariants,
      [variant]: Object.entries(components).reduce(
        (resultOfComponents, [component, rawStyle]) => {
          const [bgColorStyle, textColorStyle, borderColorStyle, fontStyle] =
            extractStyleFromCSS({
              classNames: resolveCSSByTheme(theme, rawStyle),
              properties: ["background-color", "color", "border-color", "font"],
            });

          return {
            ...resultOfComponents,
            [component]: {
              bgColorStyle,
              textColorStyle,
              borderColorStyle,
              fontStyle,
              fontStyleWith: ({ scale }: { scale?: number }) => {
                if (scale === undefined) return fontStyle;

                return fontStyle.replace(
                  /\d+px/g,
                  (a) => `${parseInt(a, 10) / scale}px`,
                );
              },
            },
          };
        },
        {},
      ),
    }),
    {} as CanvasVariants<T>,
  );
}
