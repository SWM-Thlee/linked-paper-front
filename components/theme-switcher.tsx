"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import useIsClient from "@/hooks/use-is-client";

import DarkModeIcon from "@/ui/icons/dark-mode";
import LightModeIcon from "@/ui/icons/light-mode";
import LabelButton from "@/ui/label-button";

// 테마와 해당 테마를 표현하는 아이콘 매핑입니다.
const themes = {
  light: <LightModeIcon />,
  dark: <DarkModeIcon />,
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
    return (
      <LabelButton aria-label="Switch Theme" ui_color="secondary">
        {themes.light} Loading
      </LabelButton>
    );

  return (
    <LabelButton
      aria-label="Switch Theme"
      onClick={toggle}
      ui_color="secondary"
    >
      {resolvedTheme === "light" ? themes.light : themes.dark}
      {resolvedTheme}
    </LabelButton>
  );
}
