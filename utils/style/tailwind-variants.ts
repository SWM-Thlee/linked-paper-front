import * as material from "@/material.theme";
import { cn as _cn, createTV, VariantProps } from "tailwind-variants";

/**
 * TwMerge는 충돌되는 Style에 대해 가장 마지막에 정의된 것을 적용합니다.
 * 그러나, 임의로 정한 Style을 사용하는 경우 제대로 충돌을 인식하지 못하고 하나로 무작정 Merge되는 문제가 생깁니다.
 * 이 문제를 해결하기 위해서는 Custom Style에 대한 Group 정보를 TwMerge에 전달해야 합니다.
 */
const twMergeConfig = {
  extend: {
    classGroups: {
      "material-text": [
        {
          text: Object.entries(material.text).reduce<string[]>(
            (result, [component, sizes]) => [
              ...result,
              ...Object.keys(sizes).map((size) => `${component}-${size}`),
            ],
            [],
          ),
        },
      ],
      "material-color": [
        {
          text: Object.entries(material.color).reduce<string[]>(
            (result, [theme, colors]) => [
              ...result,
              ...Object.keys(colors).map((color) => `${theme}-${color}`),
            ],
            [],
          ),
        },
      ],
    },
  },
};

const cn = (...params: Parameters<typeof _cn>) =>
  _cn(...params)({ twMergeConfig });
const tv = createTV({ twMergeConfig });

export { type VariantProps, tv, cn };
