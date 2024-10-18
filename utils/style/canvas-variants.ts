import { Theme } from "@/features/theme/types";

export type Slot = { [component: string]: string[] };
export type Variant<T extends Slot> = {
  [variantName: string]: {
    [variantType: string]: { [component in keyof T]?: string[] };
  };
};
export type VariantCombination<
  SlotType extends Slot,
  VariantType extends Variant<SlotType>,
> = { [variantName in keyof VariantType]: keyof VariantType[variantName] };

export type CSSBasedVariants<
  SlotType extends Slot,
  VariantType extends Variant<SlotType>,
> = {
  slots: SlotType;
  variants: VariantType;
};

export type CanvasVariant = {
  bgColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: number;
  font: string;
  fontWith: ({ scale }: { scale?: number }) => string;
};

export type CanvasVariants<
  SlotType extends Slot,
  VariantType extends Variant<SlotType>,
> = {
  [slot in keyof SlotType]: (
    theme: Theme.Preset.Type,
    combination: VariantCombination<SlotType, VariantType>,
  ) => CanvasVariant;
};

export type CanvasVariantsWithTheme<
  SlotType extends Slot,
  VariantType extends Variant<SlotType>,
> = {
  [slot in keyof SlotType]: (
    combination: VariantCombination<SlotType, VariantType>,
  ) => CanvasVariant;
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
function convert(theme: Theme.Preset.Type, classes: string[]): CanvasVariant {
  const [bgColor, textColor, borderColor, font, borderWidth] =
    extractStyleFromCSS({
      classNames: resolveCSSByTheme(theme, classes),
      properties: [
        "background-color",
        "color",
        "border-color",
        "font",
        "border-width",
      ],
    });

  return {
    bgColor,
    textColor,
    borderColor,
    font,
    borderWidth: parseInt(borderWidth, 10),
    fontWith: ({ scale }: { scale?: number }) => {
      if (scale === undefined) return font;

      return font.replace(/\d+px/g, (a) => `${parseInt(a, 10) / scale}px`);
    },
  } satisfies CanvasVariant;
}

export function baseVariants<
  SlotType extends Slot,
  VariantType extends Variant<SlotType>,
>(variants: CSSBasedVariants<SlotType, VariantType>) {
  return variants;
}

export function canvasVariants<
  SlotType extends Slot,
  VariantType extends Variant<SlotType>,
>(cssVariants: CSSBasedVariants<SlotType, VariantType>) {
  return Object.entries(cssVariants.slots).reduce(
    (result, [slot, base]) => {
      result[slot as keyof SlotType] = (function internalCreateFn() {
        const memo = new Map<string, CanvasVariant>();

        const resolve = (
          theme: Theme.Preset.Type,
          combination: VariantCombination<SlotType, VariantType>,
        ) => {
          const classes = [
            ...base,
            ...Object.entries(combination)
              .map(
                ([variantName, variantType]) =>
                  (cssVariants.variants[variantName]?.[variantType]?.[slot] ??
                    []) as string[],
              )
              .flat(),
          ].sort();

          const id = [theme, ...classes].join(".");
          if (memo.has(id)) {
            return memo.get(id)!;
          }

          const canvasVariant = convert(theme, classes);
          memo.set(id, canvasVariant);

          return canvasVariant;
        };

        return resolve;
      })();

      return result;
    },
    {} as CanvasVariants<SlotType, VariantType>,
  );
}
