import { nextui } from "@nextui-org/theme";
import { text, color } from "./material.theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // Theme Properties를 Tailwind에 적용합니다.
  theme: {
    extend: {
      // Tailwind에서 "text-{semantic}-{size}"로 Text Style을 적용할 수 있습니다.
      fontSize: ({ theme }) =>
        Object.entries(text).reduce(
          (props, [semantic, sizes]) => ({
            ...props,
            ...Object.entries(sizes).reduce(
              (semanticProps, [size, textProps]) => ({
                ...semanticProps,
                [`${semantic}-${size}`]: [
                  `${textProps.fontSize / 16}rem`,
                  {
                    fontWeight: theme(`fontWeight.${textProps.fontWeight}`),
                    lineHeight: `${textProps.lineHeight / 16}rem`,
                    letterSpacing: `${textProps.letterSpacing}px`,
                  },
                ],
              }),
              {},
            ),
          }),
          {},
        ),
      // Tailwind에서 "{any}-{theme}-{semantic}"로 Color Style을 적용할 수 있습니다.
      colors: Object.entries(color).reduce(
        (props, [theme, colors]) => ({
          ...props,
          ...Object.entries(colors).reduce(
            (themeProps, [semantic, colorHex]) => ({
              ...themeProps,
              [`${theme}-${semantic}`]: colorHex,
            }),
            {},
          ),
        }),
        {},
      ),
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
