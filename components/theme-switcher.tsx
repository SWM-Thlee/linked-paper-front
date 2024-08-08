"use client";

import useIsClient from "@/hooks/use-is-client";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import {
  MdDarkMode as DarkModeIcon,
  MdLightMode as LightModeIcon,
} from "react-icons/md";

// 테마와 해당 테마를 표현하는 아이콘 매핑입니다.
const themes = {
  default: LightModeIcon,
  light: LightModeIcon,
  dark: DarkModeIcon,
} as const;

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();

  // Theme는 Light와 Dark만 존재한다고 가정합니다.
  const toggle = useCallback(() => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }, [resolvedTheme, setTheme]);

  // 1. Server에서 Pre-render될 때는 클라이언트의 theme 설정을 알 수 없기 때문에 기본 아이콘으로 지정됩니다.
  // 2. Theme가 light 또는 dark가 아니면 기본 아이콘으로 지정됩니다.
  if (!isClient || !(resolvedTheme === "light" || resolvedTheme === "dark"))
    return <themes.default size={36} />;

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label={`Convert to ${resolvedTheme.toUpperCase()} Mode`}
    >
      {resolvedTheme === "light" ? (
        <themes.light size={36} />
      ) : (
        <themes.dark size={36} />
      )}
    </button>
  );
}
