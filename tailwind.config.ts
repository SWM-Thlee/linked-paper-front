import { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { text, color } from "./material.theme";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  // Theme Properties를 Tailwind에 적용합니다.
  theme: {
    extend: {
      borderRadius: {
        "ex-large": "2rem",
        large: "1.5rem",
        medium: "1rem",
        small: "0.5rem",
      },
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
      keyframes: {
        enterFromRight: {
          from: { opacity: "0", transform: "translateX(200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        enterFromLeft: {
          from: { opacity: "0", transform: "translateX(-200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        exitToRight: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(200px)" },
        },
        exitToLeft: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(-200px)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "rotateX(-10deg) scale(0.9)" },
          to: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
        },
        scaleOut: {
          from: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
          to: { opacity: "0", transform: "rotateX(-10deg) scale(0.95)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
    },
    animation: {
      scaleIn: "scaleIn 200ms ease",
      scaleOut: "scaleOut 200ms ease",
      fadeIn: "fadeIn 200ms ease",
      fadeOut: "fadeOut 200ms ease",
      enterFromLeft: "enterFromLeft 250ms ease",
      enterFromRight: "enterFromRight 250ms ease",
      exitToLeft: "exitToLeft 250ms ease",
      exitToRight: "exitToRight 250ms ease",
    },
  },
  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value,
        }),
      });
    }),
  ],
} satisfies Config;

export default config;
