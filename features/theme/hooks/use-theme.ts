import { useCallback } from "react";
import { useTheme as usePrimitiveTheme } from "next-themes";

import { Theme } from "../types";

export default function useTheme() {
  const { resolvedTheme, setTheme: setPrimitiveTheme } = usePrimitiveTheme();
  const currentTheme = resolvedTheme as Theme.Preset.Type;

  const toggle = useCallback(() => {
    setPrimitiveTheme(
      currentTheme === Theme.Preset.LIGHT
        ? Theme.Preset.DARK
        : Theme.Preset.LIGHT,
    );
  }, [currentTheme, setPrimitiveTheme]);

  const setTheme = useCallback(
    (theme: Theme.Preset.Type) => setPrimitiveTheme(theme),
    [setPrimitiveTheme],
  );

  return { theme: currentTheme, toggle, setTheme };
}
