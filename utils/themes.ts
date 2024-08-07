// 모든 테마
export const themeType = ["light", "dark"] as const;
export type ThemeType = (typeof themeType)[number];

// 한 테마의 Semantic Style 정의에 대해 다양한 테마에 대응되도록 Style을 추가합니다.
export default function themes(
  classNames: string[],
  defaultTheme: ThemeType = "light",
) {
  return classNames.reduce<string[]>(
    (result, className) => [
      ...result,
      ...themeType.map((theme) =>
        theme.includes(defaultTheme)
          ? className
          : `${theme}:${className.replace(defaultTheme, theme)}`,
      ),
    ],
    [],
  );
}
