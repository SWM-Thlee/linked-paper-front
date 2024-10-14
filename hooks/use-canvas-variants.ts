import { useDeepCompareMemo } from "use-deep-compare";

import cv, { CSSVariants } from "@/utils/style/canvas-variants";
import useTheme from "@/features/theme/hooks/use-theme";
import { useMemo } from "react";

export default function useCanvasVariants<T extends CSSVariants>(variants: T) {
  const { theme } = useTheme();
  const memo = useDeepCompareMemo(() => variants, [variants]);

  return useMemo(() => cv(theme, memo), [memo, theme]);
}
