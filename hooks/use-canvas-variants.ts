import { useMemo } from "react";

import useTheme from "@/features/theme/hooks/use-theme";
import {
  canvasVariants,
  CanvasVariantsWithTheme,
  CSSBasedVariants,
  Slot,
  Variant,
  VariantCombination,
} from "@/utils/style/canvas-variants";
import { useDeepCompareMemo } from "use-deep-compare";

export default function useCanvasVariants<
  SlotType extends Slot,
  VariantType extends Variant<SlotType>,
>(variants: CSSBasedVariants<SlotType, VariantType>) {
  const { theme } = useTheme();
  const memo = useDeepCompareMemo(() => canvasVariants(variants), [variants]);

  const cv = useMemo(
    () =>
      Object.entries(memo).reduce(
        (result, [slot, fn]) => ({
          ...result,
          [slot]: (combination: VariantCombination<SlotType, VariantType>) =>
            fn(theme, combination),
        }),
        {} as CanvasVariantsWithTheme<SlotType, VariantType>,
      ),
    [theme, memo],
  );

  return cv;
}
